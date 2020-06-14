import { DataSource, DataSourceConfig } from "apollo-datasource";
import AWS from "aws-sdk";

import { Context } from "../types";
import { promisify } from "../utils";

type Meal = {
  id: string;
  date: string;
};

type QueryCallback = Exclude<
  Parameters<AWS.DynamoDB.DocumentClient["query"]>[1],
  undefined
>;

const TABLE_NAME = process.env.DYNAMODB_TABLE;

if (!TABLE_NAME) {
  throw new Error("Unable to load table name from environment variables.");
}

export class MealDataSource extends DataSource<Context> {
  private context: Context | undefined;
  private dynamoDb: AWS.DynamoDB.DocumentClient;

  constructor(dynamoDb: AWS.DynamoDB.DocumentClient) {
    super();
    this.dynamoDb = dynamoDb;
  }

  initialize(config: DataSourceConfig<Context>) {
    this.context = config.context;
  }

  async getMeals(): Promise<Meal[]> {
    try {
      const result = await promisify((cb: QueryCallback) => {
        this.dynamoDb.query(
          {
            TableName: TABLE_NAME || "",
            IndexName: "GSI1",
            KeyConditionExpression: "sk = :type",
            ExpressionAttributeValues: {
              ":type": "MEAL",
            },
          },
          cb
        );
      });
      return (
        result.Items?.map((item) => {
          return {
            id: item.pk,
            date: item.date,
            recipe: {
              id: item.data,
              name: "???",
              notes: null,
              url: null,
            },
          };
        }) || []
      );
    } catch (e) {
      throw e;
    }
  }
}
