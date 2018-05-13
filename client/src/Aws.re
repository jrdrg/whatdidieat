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
  type loginResultT;
  type loginResult =
    | LoginSuccessful(loginResultT)
    | LoginError
    | LoginChallenge(string);
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
  [@bs.module "aws-amplify/lib/Auth"] [@bs.scope "default"]
  external signIn : (string, string) => Js.Promise.t('a) = "";
  let signIn = (~username: string, ~password: string) =>
    signIn(username, password)
    |> Js.Promise.then_(result => {
         Js.log(result);
         let challengeName: option(string) =
           result##challengeName |> Js.Nullable.toOption;
         switch (challengeName) {
         | Some(challenge) => Js.log2("Challenge", challenge)
         | None => Js.log("no challenge")
         };
         Js.Promise.resolve(result);
       });
};
