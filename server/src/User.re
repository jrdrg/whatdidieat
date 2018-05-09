/* temporary */
/* Aws.update(~region="us-east-2", ~endpoint="http://localhost:8080"); */
type userT = {
  id: string,
  createdDate: string,
  name: string,
  email: string,
  password: string,
};

let userIdFromUrl = (parameters: Js.Null.t(Js.Dict.t(string))) =>
  Js.Null.toOption(parameters)
  |> Js.Option.andThen((. p) => Js.Dict.get(p, "id"));

let decodeBody = body =>
  switch (Js.Null.toOption(body)) {
  | Some(b) => b
  | None => ""
  };

/*
   URL handler functions
 */
let createUser: AwsLambda.APIGatewayProxy.handler =
  (event, _context, _callback) => {
    let body = decodeBody(event##body);
    Js.log(body);
    Js.Promise.resolve();
  };

let listUsers: AwsLambda.APIGatewayProxy.handler =
  (event, context, callback) => {
    open Aws.DynamoDb;
    let limit =
      Aws.queryStringParam(event, "limit")
      |> Js.Option.getWithDefault("100")
      |> int_of_string;
    Js.log2("event", event);
    Js.log2("context", context);
    Js.Promise.(
      documentClient()
      |> scan(~limit, "WhatDidIEat")
      |> then_(users => {
           let result =
             switch (Js.Nullable.toOption(users##_Items)) {
             | Some(items) => Aws.okResult({"items": items})
             | None => Aws.errorResult("No users exist in the DB")
             };
           resolve(callback(Js.null, result));
         })
    );
  };

let getUser: AwsLambda.APIGatewayProxy.handler =
  (event, _context, callback) => {
    open Aws.DynamoDb;
    Js.log2("Event", event);
    /*
     get the user record from dynamodb and return it
     */
    Js.Promise.(
      switch (userIdFromUrl(event##pathParameters)) {
      | None =>
        resolve(
          callback(
            Js.null,
            Aws.errorResult(~statusCode=404, "No id was provided"),
          ),
        )
      | Some(id) =>
        let userId = "User_" ++ id;
        documentClient()
        |> get(
             "WhatDidIEat",
             {"entity_id": userId, "related_entity_id": userId},
           )
        |> then_(user => {
             let result =
               switch (Js.Nullable.toOption(user##_Item)) {
               | Some(item) => Aws.okResult(item)
               | None =>
                 Aws.errorResult(~statusCode=404, "No matching id found.")
               };
             resolve(callback(Js.null, result));
           })
        |> catch(e => {
             Js.log2("Error", e);
             let errToResult = (exn: Js.Promise.error) => {
               let e = Obj.magic(exn);
               Aws.errorResult(e##message);
             };
             resolve(callback(Js.null, errToResult(e)));
           });
      }
    );
  };
