import { QueryResolvers } from "../graphQLTypes";
import { Context } from "../types";

export const Query: QueryResolvers<Context> = {
  ingredients: (_obj, _args) => {
    return [];
  },
  meals: (_obj, _args, ctx) => {
    return new Promise((res, rej) => {
      ctx.dynamoDb.query(
        {
          TableName: "what-did-i-eat",
          IndexName: "GSI1",
          KeyConditionExpression: "sk = :type",
          ExpressionAttributeValues: {
            ":type": "MEAL",
          },
        },
        (err, data) => {
          if (err) {
            console.log("E", err);
            return rej(err);
          }
          console.log("meals", data);
          return res(
            data.Items?.map((item) => ({
              id: item.pk,
              date: item.date,
              recipe: {
                id: item.data,
                name: "???",
                notes: null,
                url: null,
              },
            }))
          );
        }
      );
    });
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
              id: item.pk,
              name: item.data,
            }))
          );
        }
      );
    });
  },
};
