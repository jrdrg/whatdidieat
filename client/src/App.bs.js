'use strict';

var $$Array = require("bs-platform/lib/js/array.js");
var React = require("react");
var Js_exn = require("bs-platform/lib/js/js_exn.js");
var Js_dict = require("bs-platform/lib/js/js_dict.js");
var Js_json = require("bs-platform/lib/js/js_json.js");
var Js_option = require("bs-platform/lib/js/js_option.js");
var Belt_Option = require("bs-platform/lib/js/belt_Option.js");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var ReasonApollo = require("reason-apollo/src/ReasonApollo.bs.js");

var ppx_printed_query = "query getMeals  {\nmeals  {\nid  \n}\n\n}\n";

function parse(value) {
  var value$1 = Js_option.getExn(Js_json.decodeObject(value));
  var value$2 = Js_dict.get(value$1, "meals");
  var tmp;
  if (value$2 !== undefined) {
    var value$3 = Caml_option.valFromOption(value$2);
    var match = Js_json.decodeNull(value$3);
    tmp = match !== undefined ? undefined : Js_option.getExn(Js_json.decodeArray(value$3)).map((function (value) {
              var match = Js_json.decodeNull(value);
              if (match !== undefined) {
                return ;
              }
              var value$1 = Js_option.getExn(Js_json.decodeObject(value));
              var value$2 = Js_dict.get(value$1, "id");
              var tmp;
              if (value$2 !== undefined) {
                var value$3 = Caml_option.valFromOption(value$2);
                var value$4 = Js_json.decodeString(value$3);
                tmp = value$4 !== undefined ? value$4 : Js_exn.raiseError("graphql_ppx: Expected string, got " + JSON.stringify(value$3));
              } else {
                tmp = Js_exn.raiseError("graphql_ppx: Field id on type Meal is missing");
              }
              return {
                      id: tmp
                    };
            }));
  } else {
    tmp = undefined;
  }
  return {
          meals: tmp
        };
}

function make(param) {
  return {
          query: ppx_printed_query,
          variables: null,
          parse: parse
        };
}

function makeWithVariables(param) {
  return {
          query: ppx_printed_query,
          variables: null,
          parse: parse
        };
}

function makeVariables(param) {
  return null;
}

function definition_002(graphql_ppx_use_json_variables_fn) {
  return 0;
}

var definition = /* tuple */[
  parse,
  ppx_printed_query,
  definition_002
];

function ret_type(f) {
  return { };
}

var MT_Ret = { };

var GetMeals = {
  ppx_printed_query: ppx_printed_query,
  query: ppx_printed_query,
  parse: parse,
  make: make,
  makeWithVariables: makeWithVariables,
  makeVariables: makeVariables,
  definition: definition,
  ret_type: ret_type,
  MT_Ret: MT_Ret
};

var GetMealsQuery = ReasonApollo.CreateQuery({
      query: ppx_printed_query,
      parse: parse
    });

function App(Props) {
  return React.createElement(GetMealsQuery.make, {
              children: (function (param) {
                  var result = param.result;
                  if (typeof result === "number") {
                    return React.createElement("div", undefined, "loading");
                  }
                  if (!result.tag) {
                    return React.createElement("div", undefined, result[0].message);
                  }
                  var meals = Js_option.getWithDefault([], result[0].meals);
                  var m = $$Array.map((function (meal) {
                          var mealId = Belt_Option.getWithDefault(Belt_Option.map(meal, (function (m) {
                                      return m.id;
                                    })), "");
                          return React.createElement("div", {
                                      key: mealId
                                    }, mealId);
                        }), meals);
                  return React.createElement("div", {
                              className: "flex-row"
                            }, React.createElement("div", undefined, "Test"), "Recent meals: ", m);
                })
            });
}

var make$1 = App;

exports.GetMeals = GetMeals;
exports.GetMealsQuery = GetMealsQuery;
exports.make = make$1;
/* GetMealsQuery Not a pure module */
