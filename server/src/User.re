type t = {
  id: string,
  createdDate: string,
  name: string,
  email: string,
};

module Decode = {
  let user = json =>
    Json.Decode.{
      id: json |> field("id", string),
      createdDate: json |> field("createdDate", string),
      name: json |> field("name", string),
      email: json |> field("email", string),
    };
  let user = (json: string) : Js.Result.t(t, string) =>
    try (json |> Json.parseOrRaise |> user |> (u => Js.Result.Ok(u))) {
    | Json.Decode.DecodeError(decodeError) => Js.Result.Error(decodeError)
    | e => Js.Result.Error(e |> Js.String.make)
    };
};

module Encode = {
  let user = user =>
    Json.Encode.(
      object_([
        ("id", string(user.id)),
        ("createdDate", string(user.createdDate)),
        ("name", string(user.name)),
        ("email", string(user.email)),
      ])
    );
};

let userIdFromUrl = (parameters: Js.Null.t(Js.Dict.t(string))) =>
  parameters
  |> Js.Null.toOption
  |> Js.Option.andThen((. p) => Js.Dict.get(p, "id"));

let decodeBody = body =>
  switch (body |> Js.Null.toOption) {
  | Some(b) => b
  | None => ""
  };

let errToResult = (exn: Js.Promise.error) => {
  let e = Obj.magic(exn);
  Aws.errorResult(e##message);
};

/*
   URL handler functions
 */
let createUser: AwsLambda.APIGatewayProxy.handler =
  (event, _context, callback) => {
    open Aws.DynamoDb;
    let result =
      Js.Null.toOption(event##body)
      |> Js.Option.andThen((. body) => {
           Js.log(body);
           let decoded = Decode.user(body);
           switch (decoded) {
           | Js.Result.Ok(user) =>
             Some(Aws.okResult({"user": Encode.user(user)}))
           | Js.Result.Error(e) => Some(Aws.errorResult(~statusCode=400, e))
           };
         })
      |> (
        result =>
          switch (result) {
          | None =>
            Aws.errorResult(
              ~statusCode=400,
              "Invalid input, could not create user",
            )
          | Some(r) => r
          }
      );
    Js.Promise.resolve(callback(Js.null, result));
  };

let listUsers: AwsLambda.APIGatewayProxy.handler =
  (event, context, callback) => {
    Js.log2("event", event);
    Js.log2("context", context);
    open Aws.DynamoDb;
    let limit =
      Aws.queryStringParam(event, "limit")
      |> Js.Option.getWithDefault("50")
      |> int_of_string;
    Js.Promise.(
      documentClient()
      |> scan(~limit, "WhatDidIEat")
      |> then_(users => {
           let result =
             switch (users##_Items |> Js.Nullable.toOption) {
             | Some(items) => Aws.okResult({"users": items})
             | None => Aws.errorResult("No users exist in the DB")
             };
           resolve(callback(Js.null, result));
         })
      |> catch(e => {
           Js.log2("Error", e);
           resolve(callback(Js.null, errToResult(e)));
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
               switch (user##_Item |> Js.Nullable.toOption) {
               | Some(item) => Aws.okResult(item)
               | None =>
                 Aws.errorResult(~statusCode=404, "No matching id found.")
               };
             resolve(callback(Js.null, result));
           })
        |> catch(e => {
             Js.log2("Error", e);
             resolve(callback(Js.null, errToResult(e)));
           });
      }
    );
  };
