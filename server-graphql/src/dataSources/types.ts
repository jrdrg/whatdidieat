import AWS from "aws-sdk";
import { MealDataSource } from "./MealDataSource";

export type QueryCallback = Exclude<
  Parameters<AWS.DynamoDB.DocumentClient["query"]>[1],
  undefined
>;

export type DataSources = {
  meals: MealDataSource;
};
