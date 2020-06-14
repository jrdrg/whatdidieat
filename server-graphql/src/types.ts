import AWS from "aws-sdk";

export type Context = {
  dynamoDb: AWS.DynamoDB.DocumentClient;
};
