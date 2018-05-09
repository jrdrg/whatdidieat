[@bs.scope "JSON"] [@bs.val] external stringify : 'a => string = "";

module UuidV1 = BsUuid.Uuid.V1;

type userT = {
  id: string,
  createdDate: string,
  name: string,
  email: string,
  password: string,
};

type ingredientT = {
  id: int,
  name: string,
};

type mealT = {
  id: int,
  name: string,
  ingredients: list(ingredientT),
};

let createUser = (~name) => {
  let uuid = UuidV1.createWithOptions(~options=UuidV1.options(~msecs=1, ()));
  /* let uuid = UuidV1.create(); */
  let user: userT = {
    id: UuidV1.toString(uuid),
    createdDate: "",
    name,
    email: "",
    password: "",
  };
  user;
};

let hello: AwsLambda.APIGatewayProxy.handler =
  (event, _context, callback) => {
    let body =
      switch (Js.Null.toOption(event##body)) {
      | Some(b) => b
      | None => ""
      };
    let error: Js.Null.t(AwsLambda.error) = Js.null;
    let response: AwsLambda.APIGatewayProxy.result = {
      "statusCode": 200,
      "body": stringify(body),
      "headers": Js.Nullable.null,
      "isBase64Encoded": Js.Nullable.return(event##isBase64Encoded),
    };
    callback(error, response);
    Js.Promise.resolve();
  };
