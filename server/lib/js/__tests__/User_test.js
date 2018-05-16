// Generated by BUCKLESCRIPT VERSION 3.0.0, PLEASE EDIT WITH CARE
'use strict';

var Jest = require("@glennsl/bs-jest/lib/js/src/jest.js");
var Json = require("@glennsl/bs-json/lib/js/src/Json.bs.js");
var User$Server = require("../src/User.js");

describe("User", (function () {
        var json = "{\"id\":\"1\",\"createdDate\":\"1525147200000\",\"name\":\"Test User\",\"email\":\"test@example.com\"}";
        var user = /* record */[
          /* id */"1",
          /* createdDate */"1525147200000",
          /* name */"Test User",
          /* email */"test@example.com"
        ];
        describe("deserializing from json", (function () {
                Jest.test("should deserialize if all fields are present", (function () {
                        var u = User$Server.Decode[/* user */0](json);
                        var decoded;
                        decoded = u.tag ? /* None */0 : /* Some */[u[0]];
                        return Jest.Expect[/* toEqual */12](/* Some */[user], Jest.Expect[/* expect */0](decoded));
                      }));
                return Jest.test("should return errors if a field is missing", (function () {
                              var u = User$Server.Decode[/* user */0]("{\"id\":\"1\"}");
                              var decoded;
                              decoded = u.tag ? /* Some */[u[0]] : /* None */0;
                              return Jest.Expect[/* toEqual */12](/* Some */["Expected field 'createdDate'"], Jest.Expect[/* expect */0](decoded));
                            }));
              }));
        return Jest.test("should serialize to json", (function () {
                      var encoded = Json.stringify(User$Server.Encode[/* user */0](user));
                      return Jest.Expect[/* toEqual */12](json, Jest.Expect[/* expect */0](encoded));
                    }));
      }));

/*  Not a pure module */
