import AWS from "aws-sdk";
import { DataSources } from "./dataSources";

export type Context = {
  dynamoDb: AWS.DynamoDB.DocumentClient;
  userId: string;
};

export type ResolverContext = Context & {
  dataSources: DataSources;
};
