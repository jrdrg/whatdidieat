import AWS from "aws-sdk";

export const mealResolvers = (_client: AWS.DynamoDB.DocumentClient) => ({
  id: (obj: any) => {
    return obj.entityId;
  },
  date: (obj: any) => {
    console.log("DATE", obj);
    return obj.date;
  },

  recipe: () => {
    return { id: "1" };
  },
});
