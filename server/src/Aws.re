/*AWS.config.update({
      region: "us-west-2",
      endpoint: "http://localhost:8000"
  });
  */
type configT = {
  .
  "region": string,
  "endpoint": string,
};

[@bs.module "aws-sdk"] [@bs.scope "config"]
external update : configT => unit = "";

let update = (~region: string, ~endpoint: string) =>
  update({"region": region, "endpoint": endpoint});

module DynamoDb = {
  type clientT;
  type callbackT('data) = (Js.Null.t(exn), 'data) => unit;
  type getParamsT('a) = {
    .
    "_TableName": string,
    "_Key": 'a,
  };
  type putParamsT('a) = {
    .
    "_TableName": string,
    "_Item": 'a,
  };
  type scanParamsT('a) = {
    .
    "_TableName": string,
    "_Limit": int,
  };
  type itemT('a) = {. "_Item": Js.Nullable.t('a)};
  type scanResultT('a) = {. "_Items": Js.Nullable.t(list('a))};
  [@bs.new] [@bs.module "aws-sdk"] [@bs.scope "DynamoDB"]
  external documentClient : unit => clientT = "DocumentClient";
  [@bs.send.pipe: clientT]
  external get : (getParamsT('a), callbackT('data)) => unit = "";
  [@bs.send.pipe: clientT]
  external scan : (scanParamsT('a), callbackT('data)) => unit = "";
  let get =
      (table: string, key: 'a, client: clientT)
      : Js.Promise.t(itemT('b)) =>
    Js.Promise.make((~resolve, ~reject) =>
      client
      |> get({"_TableName": table, "_Key": key}, (error, data) =>
           switch (Js.Null.toOption(error)) {
           | Some(err) => reject(. err)
           | None =>
             Js.log("completed dynamodb get");
             Js.log2("Data", data);
             resolve(. data);
           }
         )
    );
  let scan =
      (~limit: int=100, table: string, client: clientT)
      : Js.Promise.t(scanResultT('b)) =>
    Js.Promise.make((~resolve, ~reject) =>
      client
      |> scan({"_TableName": table, "_Limit": limit}, (error, data) =>
           switch (Js.Null.toOption(error)) {
           | Some(err) => reject(. err)
           | None =>
             Js.log("completed dynamodb scan");
             resolve(. data);
           }
         )
    );
};

let okResult = body =>
  AwsLambda.APIGatewayProxy.result(
    ~statusCode=200,
    ~body=`Plain(Util.stringify(body)),
    (),
  );

let errorResult = (~statusCode=500, message: string) =>
  AwsLambda.APIGatewayProxy.result(
    ~statusCode,
    ~body=`Plain(Util.stringify({"message": message})),
    (),
  );

let queryStringParam = (event, paramName) =>
  Js.Null.toOption(event##queryStringParameters)
  |> Js.Option.andThen((. queryString) =>
       Js.Dict.get(queryString, paramName)
     );
