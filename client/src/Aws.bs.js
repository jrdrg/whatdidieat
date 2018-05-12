// Generated by BUCKLESCRIPT VERSION 3.0.0, PLEASE EDIT WITH CARE
'use strict';

var Auth = require("aws-amplify/lib/Auth");

function authData(username, password) {
  return {
          Username: username,
          Password: password
        };
}

var Cognito = /* module */[/* authData */authData];

function configure(identityPoolId, region, userPoolId, userPoolWebClientId) {
  Auth.default.configure({
        Auth: {
          identityPoolId: identityPoolId,
          region: region,
          userPoolId: userPoolId,
          userPoolWebClientId: userPoolWebClientId
        }
      });
  return /* () */0;
}

function signIn(username, password) {
  return Auth.default.signIn(username, password).then((function (success) {
                console.log("Success!");
                console.log(success);
                return Promise.resolve(success);
              }));
}

var Amplify = /* module */[
  /* configure */configure,
  /* signIn */signIn
];

exports.Cognito = Cognito;
exports.Amplify = Amplify;
/* aws-amplify/lib/Auth Not a pure module */
