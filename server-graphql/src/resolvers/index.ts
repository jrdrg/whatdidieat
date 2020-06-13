import AWS from "aws-sdk";
import dotenv from "dotenv";
import { v4 as uuid } from "uuid";

import { MutationAddMealArgs } from "../types";
import { mealResolvers } from "./Meal";

dotenv.config();

AWS.config.update({ region: process.env.REGION });
const dynamoDb = new AWS.DynamoDB.DocumentClient({ apiVersion: "2012-08-10" });

export const resolvers = {
  Query: {
    ingredients: (_obj: any, _args: any) => {
      return [];
    },
    meals: (_obj: any, args: any) => {
      return new Promise((res, rej) => {
        dynamoDb.scan(
          {
            TableName: "what-did-i-eat",
          },
          (err, data) => {
            if (err) {
              console.log("E", err);
              return rej(err);
            }
            console.log("D", data);
            return res(data.Items);
          }
        );
      });
    },
    recipes: (_obj: any, _args: any) => {
      return [];
    },
  },

  Mutation: {
    addMeal: (_obj: any, args: MutationAddMealArgs) => {
      console.log(args);
      const id = uuid();
      const tableName = process.env.DYNAMODB_TABLE;
      if (!tableName) {
        throw new Error("No table name provided in environment.");
      }

      return new Promise((res, rej) => {
        dynamoDb.put(
          {
            TableName: tableName,
            Item: {
              entityId: `MEAL-${id}`,
              entity_id: `MEAL-${id}`,
              relatedEntityId: `MEAL-${id}`,
              related_entity_id: `MEAL-${id}`,
              date: args.input.date,
              // recipe: args.input.recipe,
            },
            ReturnValues: "ALL_OLD",
          },
          (err, data) => {
            if (err) {
              console.log("E", err.message);
              return rej(err);
            }
            console.log("D", data);
            return res({
              entityId: `MEAL-${id}`,
            });
          }
        );
      });
    },
  },

  Meal: mealResolvers(dynamoDb),

  Recipe: {
    name: () => {
      return "test";
    },
  },
};
