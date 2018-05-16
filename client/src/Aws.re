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
  type loginResult =
    | LoginSuccessful(loginResultT)
    | LoginFailure(string)
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
  [@bs.module "aws-amplify/lib/Auth"]
  external currentAuthenticatedUser : unit => Js.Promise.t(userT) = "";
  [@bs.module "aws-amplify/lib/Auth"]
  external changePassword : (userT, string, string) => resultT = "";
  [@bs.module "aws-amplify/lib/Auth"] [@bs.scope "default"]
  external signIn : (string, string) => Js.Promise.t('a) = "";
  let signIn = (~username: string, ~password: string) =>
    signIn(username, password)
    |> Js.Promise.then_(result => {
         Js.log(result);
         let challengeName: option(string) =
           result##challengeName |> Js.Nullable.toOption;
         let loginResult =
           switch (challengeName) {
           | Some(challenge) =>
             Js.log2("Challenge", challenge);
             LoginChallenge(challenge);
           | None =>
             Js.log("no challenge");
             LoginSuccessful(result);
           };
         Js.Promise.resolve(loginResult);
       });
  let changePassword = (~oldPassword: string, ~newPassword: string, user: userT) =>
    changePassword(user, oldPassword, newPassword);
};
