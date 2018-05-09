/* temporary */
Aws.update(~region="us-east-2", ~endpoint="http://localhost:8080");

[@bs.scope "JSON"] [@bs.val] external stringify : 'a => string = "";

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

let okResult = body =>
  AwsLambda.APIGatewayProxy.result(
    ~statusCode=200,
    ~body=`Plain(stringify(body)),
    (),
  );

let errorResult = (~statusCode=500, message: string) =>
  AwsLambda.APIGatewayProxy.result(
    ~statusCode,
    ~body=`Plain(stringify({"message": message})),
    (),
  );

let queryStringParam = (event, paramName) =>
  Js.Null.toOption(event##queryStringParameters)
  |> Js.Option.andThen((. queryString) =>
       Js.Dict.get(queryString, paramName)
     );

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
    /* let client = Aws.DynamoDb.documentClient(); */
    let limit =
      queryStringParam(event, "limit")
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
             | Some(items) => okResult(items)
             | None => errorResult("No users exist in the DB")
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
            errorResult(~statusCode=404, "No id was provided"),
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
               | Some(item) => okResult(item)
               | None => errorResult(~statusCode=404, "No matching id found.")
               };
             resolve(callback(Js.null, result));
           })
        |> catch(e => {
             Js.log2("Error", e);
             let errToResult = (exn: Js.Promise.error) => {
               let e = Obj.magic(exn);
               errorResult(e##message);
             };
             resolve(callback(Js.null, errToResult(e)));
           });
      }
    );
  };
