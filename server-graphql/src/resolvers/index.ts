import { v4 as uuid } from "uuid";

import { Resolvers } from "../graphQLTypes";
import { Context } from "../types";
import { Meal } from "./Meal";
import { Query } from "./Query";

export const resolvers: Resolvers<Context> = {
  Query,

  Mutation: {
    addMeal: (_obj, args, ctx) => {
      console.log(args);
      const tableName = process.env.DYNAMODB_TABLE;
      if (!tableName) {
        throw new Error("No table name provided in environment.");
      }

      const mealId = uuid();
      const recipeId = args.input.recipe.id ?? uuid();

      return new Promise((res, rej) => {
        ctx.dynamoDb.transactWrite(
          {
            TransactItems: [
              {
                Put: {
                  TableName: tableName,
                  Item: {
                    pk: `MEAL-${mealId}`,
                    sk: "MEAL",
                    data: `RECIPE-${args.input.recipe.id}`,
                    date: args.input.date,
                    name: args.input.recipe.name,
                  },
                },
              },
              {
                Put: {
                  TableName: tableName,
                  Item: {
                    pk: `RECIPE-${recipeId}`,
                    sk: "RECIPE",
                    data: args.input.recipe.name ?? "Unnamed Recipe",
                    notes: args.input.recipe.notes,
                    url: args.input.recipe.url,
                  },
                },
              },
            ],
          },
          (err, data) => {
            if (err) {
              console.log("E", err);
              return rej(err);
            }
            console.log("D", data);
            return res({
              id: `MEAL-${mealId}`,
              date: args.input.date,
              recipe: {
                id: `RECIPE-${recipeId}`,
                name: args.input.recipe.name ?? "Unnamed",
                notes: args.input.recipe.notes,
                url: args.input.recipe.url,
              },
            });
          }
        );
      });
    },
  },

  Meal,

  Recipe: {
    id: (obj: any) => {
      console.log("RECIPE ID", obj);
      return obj.id ?? obj.pk ?? obj.data;
    },
    name: (obj: any) => {
      console.log("NAME", obj, obj.data);
      return obj.name ?? obj.data ?? "Unnamed";
    },
  },
};
