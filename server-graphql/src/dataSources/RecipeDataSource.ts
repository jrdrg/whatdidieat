import { DataSource, DataSourceConfig } from "apollo-datasource";
import AWS from "aws-sdk";
import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { v4 as uuid } from "uuid";

import { Context } from "../types";
import { promisify } from "../utils";

type Recipe = {
  id: string;
  date: string;
};

type QueryCallback = Exclude<
  Parameters<AWS.DynamoDB.DocumentClient["query"]>[1],
  undefined
>;

const TABLE_NAME = process.env.DYNAMODB_TABLE;

export class RecipeDataSource extends DataSource<Context> {}
