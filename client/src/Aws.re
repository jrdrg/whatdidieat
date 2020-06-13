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
  type resultT;
  type userT = {. "challengeName": Js.Nullable.t(string)};
  type errorT =
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
    | LoginSuccessful(userT)
    | LoginFailure(errorT)
    | LoginChallenge(string, userT);
  type passwordChangeResult =
    | PasswordChanged
    | PasswordChangeError(errorT);
  /*
   Convert a JS AWS error into a typed obj
   */
  let errorToObj = err =>
    switch (err |> Obj.magic |> Js.Json.classify) {
    | Js.Json.JSONObject(obj) =>
      let (code, message, name) =
        ["code", "message", "name"]
        |> List.map(Js.Dict.get(obj))
        |> List.map(Js.Option.andThen((. o) => Js.Json.decodeString(o)))
        |> List.map(Js.Nullable.fromOption)
        |> (
          l =>
            switch (l) {
            | [c, m, n] => (c, m, n)
            | _ => (Js.Nullable.null, Js.Nullable.null, Js.Nullable.null)
            }
        );
      Response({"code": code, "message": message, "name": name});
    | Js.Json.JSONString(str) => Message(str)
    | _ =>
      let errMsg =
        err |> Js.Json.stringifyAny |> Js.Option.getWithDefault("");
      Message("An error occurred: " ++ errMsg);
    };
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
  /*
   Get the current authenticated user
   */
  [@bs.module "aws-amplify/lib/Auth"] [@bs.scope "default"]
  external currentAuthenticatedUser : unit => Js.Promise.t(userT) = "";
  /*
   Change the password for a currently authenticated user
   */
  [@bs.module "aws-amplify/lib/Auth"] [@bs.scope "default"]
  external changePassword : (userT, string, string) => Js.Promise.t(unit) =
    "";
  let changePassword =
      (user: userT, ~oldPassword: string, ~newPassword: string) =>
    Js.Promise.(
      changePassword(user, oldPassword, newPassword)
      |> then_(result => {
           Js.log2("Ok", result);
           resolve(PasswordChanged);
         })
      |> catch(err => {
           Js.log2("Error", err);
           resolve(PasswordChangeError(errorToObj(err)));
         })
    );
  /*
   Complete the new password flow for a user created in AWS admin console
   */
  [@bs.module "aws-amplify/lib/Auth"] [@bs.scope "default"]
  external completeNewPassword : (userT, string) => Js.Promise.t(unit) = "";
  let completeNewPassword = (user: userT, ~newPassword: string) =>
    Js.Promise.(
      completeNewPassword(user, newPassword)
      |> then_(result => {
           Js.log2("OK!", result);
           resolve(PasswordChanged);
         })
      |> catch(err => {
           Js.log2("Error completing new password", err);
           resolve(PasswordChangeError(errorToObj(err)));
         })
    );
  /*
   Sign into AWS
   */
  [@bs.module "aws-amplify/lib/Auth"] [@bs.scope "default"]
  external signIn : (string, string) => Js.Promise.t(userT) = "";
  let signIn = (~username: string, ~password: string) =>
    Js.Promise.(
      signIn(username, password)
      |> then_(result => {
           Js.log(result);
           let loginResult =
             switch (result##challengeName |> Js.Nullable.toOption) {
             | Some(challenge) => LoginChallenge(challenge, result)
             | None => LoginSuccessful(result)
             };
           resolve(loginResult);
         })
      |> catch(err => resolve(LoginFailure(errorToObj(err))))
    );
};
