// Generated by BUCKLESCRIPT VERSION 3.0.0, PLEASE EDIT WITH CARE
'use strict';

var List = require("bs-platform/lib/js/list.js");
var Block = require("bs-platform/lib/js/block.js");
var Js_json = require("bs-platform/lib/js/js_json.js");
var Js_option = require("bs-platform/lib/js/js_option.js");
var Js_primitive = require("bs-platform/lib/js/js_primitive.js");
var Js_null_undefined = require("bs-platform/lib/js/js_null_undefined.js");
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
  return Auth.default.signIn(username, password).then((function (result) {
                  console.log(result);
                  var match = result.challengeName;
                  return Promise.resolve((match == null) ? /* LoginSuccessful */Block.__(0, [result]) : /* LoginChallenge */Block.__(2, [match]));
                })).catch((function (err) {
                var match = Js_json.classify(err);
                var tmp;
                var exit = 0;
                if (typeof match === "number") {
                  exit = 1;
                } else {
                  switch (match.tag | 0) {
                    case 0 : 
                        tmp = /* LoginFailure */Block.__(1, [/* Message */Block.__(0, [match[0]])]);
                        break;
                    case 2 : 
                        var obj = match[0];
                        var l = List.map(Js_null_undefined.fromOption, List.map((function (param) {
                                    return Js_option.andThen(Js_json.decodeString, param);
                                  }), List.map((function (param) {
                                        return Js_primitive.undefined_to_opt(obj[param]);
                                      }), /* :: */[
                                      "code",
                                      /* :: */[
                                        "message",
                                        /* :: */[
                                          "name",
                                          /* [] */0
                                        ]
                                      ]
                                    ])));
                        var match$1;
                        if (l) {
                          var match$2 = l[1];
                          if (match$2) {
                            var match$3 = match$2[1];
                            match$1 = match$3 ? (
                                match$3[1] ? /* tuple */[
                                    null,
                                    null,
                                    null
                                  ] : /* tuple */[
                                    l[0],
                                    match$2[0],
                                    match$3[0]
                                  ]
                              ) : /* tuple */[
                                null,
                                null,
                                null
                              ];
                          } else {
                            match$1 = /* tuple */[
                              null,
                              null,
                              null
                            ];
                          }
                        } else {
                          match$1 = /* tuple */[
                            null,
                            null,
                            null
                          ];
                        }
                        tmp = /* LoginFailure */Block.__(1, [/* Response */Block.__(1, [{
                                  code: match$1[0],
                                  message: match$1[1],
                                  name: match$1[2]
                                }])]);
                        break;
                    default:
                      exit = 1;
                  }
                }
                if (exit === 1) {
                  var errMsg = Js_option.getWithDefault("", Js_primitive.undefined_to_opt(JSON.stringify(err)));
                  tmp = /* LoginFailure */Block.__(1, [/* Message */Block.__(0, ["An error occurred: " + errMsg])]);
                }
                return Promise.resolve(tmp);
              }));
}

function changePassword(oldPassword, newPassword, user) {
  return Auth.changePassword(user, oldPassword, newPassword);
}

var Amplify = /* module */[
  /* configure */configure,
  /* signIn */signIn,
  /* changePassword */changePassword
];

exports.Cognito = Cognito;
exports.Amplify = Amplify;
/* aws-amplify/lib/Auth Not a pure module */
