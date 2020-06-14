import AWS from "aws-sdk";
import { DataSources } from "./dataSources";

export type Context = {
  dynamoDb: AWS.DynamoDB.DocumentClient;
};

export type ResolverContext = Context & {
  dataSources: DataSources;
};
