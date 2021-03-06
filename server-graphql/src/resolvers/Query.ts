import { QueryResolvers } from "../graphQLTypes";
import { ResolverContext } from "../types";

export const Query: QueryResolvers<ResolverContext> = {
  ingredients: (_obj, _args) => {
    return [];
  },

  meal: (_obj, args, ctx) => {
    return ctx.dataSources.meals.getMealById(args.id);
  },

  meals: (_obj, _args, ctx) => {
    return ctx.dataSources.meals.getMeals({ sortDescending: true });
  },

  recipes: (_obj, _args, ctx) => {
    return new Promise((res, rej) => {
      ctx.dynamoDb.query(
        {
          TableName: "what-did-i-eat",
          IndexName: "GSI1",
          KeyConditionExpression: "sk = :type",
          ExpressionAttributeValues: {
            ":type": "RECIPE",
          },
        },
        (err, data) => {
          if (err) {
            console.log("E", err);
            return rej(err);
          }
          console.log("recipes", data);
          return res(
            data.Items?.map((item) => ({
              id: item.pk.replace("RECIPE#", ""),
              name: item.data,
            }))
          );
        }
      );
    });
  },
};
