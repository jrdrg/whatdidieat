import { DataSource, DataSourceConfig } from "apollo-datasource";
import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { v4 as uuid } from "uuid";

import { Context } from "../types";
import { promisify } from "../utils";
import { QueryCallback } from "./types";

type Meal = {
  id: string;
  date: string;
};

const TABLE_NAME = process.env.DYNAMODB_TABLE;

export class MealDataSource extends DataSource<Context> {
  private context: Context | undefined;
  private dynamoDb: DocumentClient;

  constructor(dynamoDb: DocumentClient) {
    super();
    this.dynamoDb = dynamoDb;
  }

  initialize(config: DataSourceConfig<Context>) {
    this.context = config.context;
  }

  async addNewMeal(input: {
    date: string;
    recipes: {
      id?: string | null;
      name?: string | null;
      notes?: string | null;
      url?: string | null;
    }[];
  }): Promise<Meal> {
    const tableName = process.env.DYNAMODB_TABLE;
    if (!tableName) {
      throw new Error("No table name provided in environment.");
    }
    const userId = this.context?.userId;
    if (!userId) {
      throw new Error("Cannot add item without a user id.");
    }

    const mealId = uuid();

    const writeItems: DocumentClient.TransactWriteItem[] = [
      {
        Put: {
          TableName: tableName,
          Item: {
            pk: `MEAL#${mealId}`,
            sk: `USER#${userId}#MEAL`,
            data: input.date,
            recipes: input.recipes.map((r) => r.name).join("|"),
          },
        },
      },
      ...input.recipes.flatMap((recipe) => {
        const recipeId = recipe.id || uuid();
        return [
          {
            Put: {
              TableName: tableName,
              Item: {
                pk: `MEAL#${mealId}`,
                sk: `RECIPE#${recipeId}`,
                data: recipe.name,
              },
            },
          },
          {
            Update: {
              TableName: tableName,
              Key: {
                pk: `RECIPE#${recipeId}`,
                sk: "RECIPE",
              },
              UpdateExpression: "set #data=:data, notes=:notes, #url=:url",
              ExpressionAttributeNames: {
                "#data": "data",
                "#url": "url",
              },
              ExpressionAttributeValues: {
                ":data": recipe.name ?? "Unnamed recipe",
                ":notes": recipe.notes ?? "",
                ":url": recipe.url ?? "",
              },
            },
          },
        ];
      }),
    ];

    return promisify((cb) => {
      this.dynamoDb.transactWrite(
        {
          TransactItems: writeItems,
        },
        cb
      );
    }).then((data) => {
      console.log("DATA", data);
      return {
        id: `MEAL-${mealId}`,
        date: input.date,
        recipes: [
          {
            // id: `RECIPE-${recipeId}`,
            // name: input.recipe.name ?? "Unnamed",
            // notes: input.recipe.notes,
            // url: input.recipe.url,
          },
        ],
      };
    });
  }

  async getMeals(
    options: {
      sortDescending?: boolean;
    } = {}
  ): Promise<Meal[]> {
    const userId = this.context?.userId;
    if (!userId) {
      throw new Error("Cannot retrieve items without a user id.");
    }
    try {
      const result = await promisify((cb: QueryCallback) => {
        this.dynamoDb.query(
          {
            TableName: TABLE_NAME || "",
            IndexName: "GSI1",
            KeyConditionExpression: "sk = :type",
            ExpressionAttributeValues: {
              ":type": `USER#${userId}#MEAL`,
            },
            ScanIndexForward: !options?.sortDescending,
          },
          cb
        );
      });

      console.log("RESULT", result);
      return (
        result.Items?.map((item) => {
          const recipes =
            (item.recipes as string | undefined)?.split("|") || [];

          return {
            id: item.pk?.replace("MEAL#", "") ?? "?",
            date: item.data,
            recipes: recipes.map((name) => ({
              id: null,
              name,
              notes: null,
              url: null,
            })),
          };
        }) || []
      );
    } catch (e) {
      console.error("Error retrieving meals: ", e);
      throw e;
    }
  }
}
