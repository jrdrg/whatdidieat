module Cognito = {
  type authDetailsT;
  type loginT = {
    .
    "_Username": string,
    "_Password": string,
  };
  let authData = (~username: string, ~password: string) : loginT => {
    "_Username": username,
    "_Password": password,
  };
  [@bs.module "aws-sdk"] [@bs.new] [@bs.scope "AmazonCognitoIdentity"]
  external details : loginT => authDetailsT = "AuthenticationDetails";
};

module Amplify = {
  type loginT = {
    .
    "_Username": string,
    "_Password": string,
  };
  type userT;
  type resultT;
  type loginResultT = {. "challengeName": Js.Nullable.t(string)};
  type loginErrorT =
    | Message(string)
    | Response(
        {
          .
          "code": Js.Nullable.t(string),
          "message": Js.Nullable.t(string),
          "name": Js.Nullable.t(string),
        },
      );
  type loginResult =
    | LoginSuccessful(loginResultT)
    | LoginFailure(loginErrorT)
    | LoginChallenge(string);
  /*
   Configure AWS identity/user pools
   */
  [@bs.module "aws-amplify/lib/Auth"] [@bs.scope "default"]
  external configure : 'a => unit = "";
  let configure =
      (
        ~identityPoolId: string,
        ~region: string,
        ~userPoolId: string,
        ~userPoolWebClientId: string,
      ) =>
    configure({
      "Auth": {
        "identityPoolId": identityPoolId,
        "region": region,
        "userPoolId": userPoolId,
        "userPoolWebClientId": userPoolWebClientId,
      },
    });
  [@bs.module "aws-amplify/lib/Auth"]
  external currentAuthenticatedUser : unit => Js.Promise.t(userT) = "";
  [@bs.module "aws-amplify/lib/Auth"]
  external changePassword : (userT, string, string) => resultT = "";
  [@bs.module "aws-amplify/lib/Auth"] [@bs.scope "default"]
  external signIn : (string, string) => Js.Promise.t('a) = "";
  let signIn = (~username: string, ~password: string) =>
    Js.Promise.(
      signIn(username, password)
      |> then_(result => {
           Js.log(result);
           let loginResult =
             switch (result##challengeName |> Js.Nullable.toOption) {
             | Some(challenge) => LoginChallenge(challenge)
             | None => LoginSuccessful(result)
             };
           resolve(loginResult);
         })
      |> catch(err =>
           resolve(
             switch (err |> Obj.magic |> Js.Json.classify) {
             | Js.Json.JSONObject(obj) =>
               let (code, message, name) =
                 ["code", "message", "name"]
                 |> List.map(Js.Dict.get(obj))
                 |> List.map(
                      Js.Option.andThen((. o) => Js.Json.decodeString(o)),
                    )
                 |> List.map(Js.Nullable.fromOption)
                 |> (
                   l =>
                     switch (l) {
                     | [c, m, n] => (c, m, n)
                     | _ => (
                         Js.Nullable.null,
                         Js.Nullable.null,
                         Js.Nullable.null,
                       )
                     }
                 );
               LoginFailure(
                 Response({"code": code, "message": message, "name": name}),
               );
             | Js.Json.JSONString(str) => LoginFailure(Message(str))
             | _ =>
               let errMsg =
                 err |> Js.Json.stringifyAny |> Js.Option.getWithDefault("");
               LoginFailure(Message("An error occurred: " ++ errMsg));
             },
           )
         )
    );
  let changePassword =
      (~oldPassword: string, ~newPassword: string, user: userT) =>
    changePassword(user, oldPassword, newPassword);
};
