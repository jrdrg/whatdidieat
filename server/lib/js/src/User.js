// Generated by BUCKLESCRIPT VERSION 3.0.0, PLEASE EDIT WITH CARE
'use strict';

var Json = require("@glennsl/bs-json/lib/js/src/Json.bs.js");
var Block = require("bs-platform/lib/js/block.js");
var Curry = require("bs-platform/lib/js/curry.js");
var Js_exn = require("bs-platform/lib/js/js_exn.js");
var AwsSdk = require("aws-sdk");
var Js_option = require("bs-platform/lib/js/js_option.js");
var Aws$Server = require("./Aws.js");
var Caml_format = require("bs-platform/lib/js/caml_format.js");
var Json_decode = require("@glennsl/bs-json/lib/js/src/Json_decode.bs.js");
var Json_encode = require("@glennsl/bs-json/lib/js/src/Json_encode.bs.js");
var Js_primitive = require("bs-platform/lib/js/js_primitive.js");

function user(json) {
  return /* record */[
          /* id */Json_decode.field("id", Json_decode.string, json),
          /* createdDate */Json_decode.field("createdDate", Json_decode.string, json),
          /* name */Json_decode.field("name", Json_decode.string, json),
          /* email */Json_decode.field("email", Json_decode.string, json)
        ];
}

function user$1(json) {
  try {
    return /* Ok */Block.__(0, [user(Json.parseOrRaise(json))]);
  }
  catch (raw_e){
    var e = Js_exn.internalToOCamlException(raw_e);
    if (e[0] === Json_decode.DecodeError) {
      return /* Error */Block.__(1, [e[1]]);
    } else {
      return /* Error */Block.__(1, [String(e)]);
    }
  }
}

var Decode = /* module */[/* user */user$1];

function user$2(user$3) {
  return Json_encode.object_(/* :: */[
              /* tuple */[
                "id",
                user$3[/* id */0]
              ],
              /* :: */[
                /* tuple */[
                  "createdDate",
                  user$3[/* createdDate */1]
                ],
                /* :: */[
                  /* tuple */[
                    "name",
                    user$3[/* name */2]
                  ],
                  /* :: */[
                    /* tuple */[
                      "email",
                      user$3[/* email */3]
                    ],
                    /* [] */0
                  ]
                ]
              ]
            ]);
}

var Encode = /* module */[/* user */user$2];

function userIdFromUrl(parameters) {
  return Js_option.andThen((function (p) {
                return Js_primitive.undefined_to_opt(p["id"]);
              }), parameters === null ? /* None */0 : [parameters]);
}

function decodeBody(body) {
  if (body !== null) {
    return body;
  } else {
    return "";
  }
}

function errToResult(exn) {
  return Aws$Server.errorResult(/* None */0, /* None */0, exn.message);
}

function createUser($$event, _, callback) {
  var result = Js_option.andThen((function (body) {
          console.log(body);
          var decoded = user$1(body);
          if (decoded.tag) {
            return /* Some */[Aws$Server.errorResult(/* Some */[400], /* None */0, decoded[0])];
          } else {
            return /* Some */[Aws$Server.okResult({
                          user: user$2(decoded[0])
                        })];
          }
        }), Js_primitive.null_to_opt($$event.body));
  var result$1 = result ? result[0] : Aws$Server.errorResult(/* Some */[400], /* None */0, "Invalid input, could not create user");
  return Promise.resolve(Curry._2(callback, null, result$1));
}

function listUsers($$event, context, callback) {
  console.log("event", $$event);
  console.log("context", context);
  var limit = Caml_format.caml_int_of_string(Js_option.getWithDefault("50", Aws$Server.queryStringParam($$event, "limit")));
  return Aws$Server.DynamoDb[/* scan */1](/* Some */[limit], "WhatDidIEat", new (AwsSdk.DynamoDB.DocumentClient)()).then((function (users) {
                  var match = users.Items;
                  var result = (match == null) ? Aws$Server.errorResult(/* None */0, /* None */0, "No users exist in the DB") : Aws$Server.okResult({
                          users: match
                        });
                  return Promise.resolve(Curry._2(callback, null, result));
                })).catch((function (e) {
                console.log("Error", e);
                return Promise.resolve(Curry._2(callback, null, errToResult(e)));
              }));
}

function getUser($$event, _, callback) {
  console.log("Event", $$event);
  var match = userIdFromUrl($$event.pathParameters);
  if (match) {
    var userId = "User_" + match[0];
    return Aws$Server.DynamoDb[/* get */0]("WhatDidIEat", {
                    entity_id: userId,
                    related_entity_id: userId
                  }, new (AwsSdk.DynamoDB.DocumentClient)()).then((function (user) {
                    var match = user.Item;
                    var result = (match == null) ? Aws$Server.errorResult(/* Some */[404], /* None */0, "No matching id found.") : Aws$Server.okResult(match);
                    return Promise.resolve(Curry._2(callback, null, result));
                  })).catch((function (e) {
                  console.log("Error", e);
                  return Promise.resolve(Curry._2(callback, null, errToResult(e)));
                }));
  } else {
    return Promise.resolve(Curry._2(callback, null, Aws$Server.errorResult(/* Some */[404], /* None */0, "No id was provided")));
  }
}

exports.Decode = Decode;
exports.Encode = Encode;
exports.userIdFromUrl = userIdFromUrl;
exports.decodeBody = decodeBody;
exports.errToResult = errToResult;
exports.createUser = createUser;
exports.listUsers = listUsers;
exports.getUser = getUser;
/* aws-sdk Not a pure module */