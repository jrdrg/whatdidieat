'use strict';

var $$Array = require("bs-platform/lib/js/array.js");
var React = require("react");
var Js_exn = require("bs-platform/lib/js/js_exn.js");
var Js_dict = require("bs-platform/lib/js/js_dict.js");
var Js_json = require("bs-platform/lib/js/js_json.js");
var Js_option = require("bs-platform/lib/js/js_option.js");
var ApolloHooks = require("reason-apollo-hooks/src/ApolloHooks.bs.js");
var Belt_Option = require("bs-platform/lib/js/belt_Option.js");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var Styles$WhatDidIEat = require("./Styles.bs.js");

var ppx_printed_query = "query RecipesList  {\nrecipes  {\n__typename  \nid  \nname  \n}\n\n}\n";

function parse(value) {
  var value$1 = Js_option.getExn(Js_json.decodeObject(value));
  var value$2 = Js_dict.get(value$1, "recipes");
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
              var value$2 = Js_dict.get(value$1, "__typename");
              var tmp;
              if (value$2 !== undefined) {
                var value$3 = Caml_option.valFromOption(value$2);
                var value$4 = Js_json.decodeString(value$3);
                tmp = value$4 !== undefined ? value$4 : Js_exn.raiseError("graphql_ppx: Expected string, got " + JSON.stringify(value$3));
              } else {
                tmp = Js_exn.raiseError("graphql_ppx: Field __typename on type Recipe is missing");
              }
              var value$5 = Js_dict.get(value$1, "id");
              var tmp$1;
              if (value$5 !== undefined) {
                var value$6 = Caml_option.valFromOption(value$5);
                var value$7 = Js_json.decodeString(value$6);
                tmp$1 = value$7 !== undefined ? value$7 : Js_exn.raiseError("graphql_ppx: Expected string, got " + JSON.stringify(value$6));
              } else {
                tmp$1 = Js_exn.raiseError("graphql_ppx: Field id on type Recipe is missing");
              }
              var value$8 = Js_dict.get(value$1, "name");
              var tmp$2;
              if (value$8 !== undefined) {
                var value$9 = Caml_option.valFromOption(value$8);
                var value$10 = Js_json.decodeString(value$9);
                tmp$2 = value$10 !== undefined ? value$10 : Js_exn.raiseError("graphql_ppx: Expected string, got " + JSON.stringify(value$9));
              } else {
                tmp$2 = Js_exn.raiseError("graphql_ppx: Field name on type Recipe is missing");
              }
              return {
                      __typename: tmp,
                      id: tmp$1,
                      name: tmp$2
                    };
            }));
  } else {
    tmp = undefined;
  }
  return {
          recipes: tmp
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

var RecipesListQuery = {
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

function useMeals(param) {
  return ApolloHooks.useQuery(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, definition)[0];
}

function recipeItems(query) {
  return $$Array.map((function (recipe) {
                return Belt_Option.getWithDefault(Belt_Option.map(recipe, (function (r) {
                                  var id = r.id;
                                  var name = r.name;
                                  return React.createElement("div", {
                                              key: id
                                            }, name);
                                })), null);
              }), Js_option.getWithDefault([], query.recipes));
}

function RecipesList(Props) {
  var data = useMeals(undefined);
  var tmp;
  tmp = typeof data === "number" ? (
      data === /* Loading */0 ? React.createElement("div", undefined, "Loading") : React.createElement("div", undefined, "no data")
    ) : (
      data.tag ? React.createElement("div", undefined, data[0].message) : React.createElement("div", undefined, recipeItems(data[0]))
    );
  return React.createElement(Styles$WhatDidIEat.Container.make, {
              children: null
            }, React.createElement("div", {
                  className: "font-bold text-lg"
                }, "Recipes"), tmp);
}

var make$1 = RecipesList;

exports.RecipesListQuery = RecipesListQuery;
exports.useMeals = useMeals;
exports.recipeItems = recipeItems;
exports.make = make$1;
/* react Not a pure module */
