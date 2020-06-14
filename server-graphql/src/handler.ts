import { ApolloServer } from "apollo-server-lambda";
import AWS from "aws-sdk";
import dotenv from "dotenv";
import * as dataSources from "./dataSources";
import { schema } from "./schema";
import { resolvers } from "./resolvers";

dotenv.config();

function createDynamoDb() {
  if (process.env.IS_LOCAL === "true") {
    return new AWS.DynamoDB.DocumentClient({
      region: "localhost",
      endpoint: "http://localhost:8000",
      // accessKeyId: "DEFAULT_ACCESS_KEY", // needed if you don't have aws credentials at all in env
      // secretAccessKey: "DEFAULT_SECRET", // needed if you don't have aws credentials at all in env
    });
  }
  AWS.config.update({ region: process.env.REGION });
  return new AWS.DynamoDB.DocumentClient({ apiVersion: "2012-08-10" });
}

const dynamoDb = createDynamoDb();

const server = new ApolloServer({
  typeDefs: schema,
  resolvers: resolvers as any,
  dataSources: () => ({
    meals: new dataSources.MealDataSource(dynamoDb),
  }),
  context: (ctx) => {
    console.log("CTX", ctx);
    return {
      dynamoDb,
    };
  },
  playground: {
    endpoint: "/dev/graphql",
  },
});

export const query = server.createHandler();
