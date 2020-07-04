'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");
var Js_exn = require("bs-platform/lib/js/js_exn.js");
var Js_dict = require("bs-platform/lib/js/js_dict.js");
var Js_json = require("bs-platform/lib/js/js_json.js");
var Js_option = require("bs-platform/lib/js/js_option.js");
var Belt_Array = require("bs-platform/lib/js/belt_Array.js");
var ApolloHooks = require("reason-apollo-hooks/src/ApolloHooks.bs.js");
var Belt_Option = require("bs-platform/lib/js/belt_Option.js");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var Styles$WhatDidIEat = require("./Styles.bs.js");

var ppx_printed_query = "query MealDetails($id: String!)  {\nmeal(id: $id)  {\n__typename  \nid  \ndate  \nrecipes  {\n__typename  \nid  \nname  \nnotes  \nurl  \n}\n\n}\n\n}\n";

function parse(value) {
  var value$1 = Js_option.getExn(Js_json.decodeObject(value));
  var value$2 = Js_dict.get(value$1, "meal");
  var tmp;
  if (value$2 !== undefined) {
    var value$3 = Caml_option.valFromOption(value$2);
    var match = Js_json.decodeNull(value$3);
    if (match !== undefined) {
      tmp = undefined;
    } else {
      var value$4 = Js_option.getExn(Js_json.decodeObject(value$3));
      var value$5 = Js_dict.get(value$4, "__typename");
      var tmp$1;
      if (value$5 !== undefined) {
        var value$6 = Caml_option.valFromOption(value$5);
        var value$7 = Js_json.decodeString(value$6);
        tmp$1 = value$7 !== undefined ? value$7 : Js_exn.raiseError("graphql_ppx: Expected string, got " + JSON.stringify(value$6));
      } else {
        tmp$1 = Js_exn.raiseError("graphql_ppx: Field __typename on type Meal is missing");
      }
      var value$8 = Js_dict.get(value$4, "id");
      var tmp$2;
      if (value$8 !== undefined) {
        var value$9 = Caml_option.valFromOption(value$8);
        var value$10 = Js_json.decodeString(value$9);
        tmp$2 = value$10 !== undefined ? value$10 : Js_exn.raiseError("graphql_ppx: Expected string, got " + JSON.stringify(value$9));
      } else {
        tmp$2 = Js_exn.raiseError("graphql_ppx: Field id on type Meal is missing");
      }
      var value$11 = Js_dict.get(value$4, "date");
      var tmp$3;
      if (value$11 !== undefined) {
        var value$12 = Caml_option.valFromOption(value$11);
        var value$13 = Js_json.decodeString(value$12);
        tmp$3 = value$13 !== undefined ? value$13 : Js_exn.raiseError("graphql_ppx: Expected string, got " + JSON.stringify(value$12));
      } else {
        tmp$3 = Js_exn.raiseError("graphql_ppx: Field date on type Meal is missing");
      }
      var value$14 = Js_dict.get(value$4, "recipes");
      var tmp$4;
      if (value$14 !== undefined) {
        var value$15 = Caml_option.valFromOption(value$14);
        var match$1 = Js_json.decodeNull(value$15);
        tmp$4 = match$1 !== undefined ? undefined : Js_option.getExn(Js_json.decodeArray(value$15)).map((function (value) {
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
                  var value$11 = Js_dict.get(value$1, "notes");
                  var tmp$3;
                  if (value$11 !== undefined) {
                    var value$12 = Caml_option.valFromOption(value$11);
                    var match$1 = Js_json.decodeNull(value$12);
                    if (match$1 !== undefined) {
                      tmp$3 = undefined;
                    } else {
                      var value$13 = Js_json.decodeString(value$12);
                      tmp$3 = value$13 !== undefined ? value$13 : Js_exn.raiseError("graphql_ppx: Expected string, got " + JSON.stringify(value$12));
                    }
                  } else {
                    tmp$3 = undefined;
                  }
                  var value$14 = Js_dict.get(value$1, "url");
                  var tmp$4;
                  if (value$14 !== undefined) {
                    var value$15 = Caml_option.valFromOption(value$14);
                    var match$2 = Js_json.decodeNull(value$15);
                    if (match$2 !== undefined) {
                      tmp$4 = undefined;
                    } else {
                      var value$16 = Js_json.decodeString(value$15);
                      tmp$4 = value$16 !== undefined ? value$16 : Js_exn.raiseError("graphql_ppx: Expected string, got " + JSON.stringify(value$15));
                    }
                  } else {
                    tmp$4 = undefined;
                  }
                  return {
                          __typename: tmp,
                          id: tmp$1,
                          name: tmp$2,
                          notes: tmp$3,
                          url: tmp$4
                        };
                }));
      } else {
        tmp$4 = undefined;
      }
      tmp = {
        __typename: tmp$1,
        id: tmp$2,
        date: tmp$3,
        recipes: tmp$4
      };
    }
  } else {
    tmp = undefined;
  }
  return {
          meal: tmp
        };
}

function make(id, param) {
  return {
          query: ppx_printed_query,
          variables: Js_dict.fromArray([/* tuple */[
                    "id",
                    id
                  ]].filter((function (param) {
                      return !Js_json.test(param[1], /* Null */5);
                    }))),
          parse: parse
        };
}

function makeWithVariables(variables) {
  var id = variables.id;
  return {
          query: ppx_printed_query,
          variables: Js_dict.fromArray([/* tuple */[
                    "id",
                    id
                  ]].filter((function (param) {
                      return !Js_json.test(param[1], /* Null */5);
                    }))),
          parse: parse
        };
}

function makeVariables(id, param) {
  return Js_dict.fromArray([/* tuple */[
                  "id",
                  id
                ]].filter((function (param) {
                    return !Js_json.test(param[1], /* Null */5);
                  })));
}

function definition_002(graphql_ppx_use_json_variables_fn, id, param) {
  return Curry._1(graphql_ppx_use_json_variables_fn, Js_dict.fromArray([/* tuple */[
                      "id",
                      id
                    ]].filter((function (param) {
                        return !Js_json.test(param[1], /* Null */5);
                      }))));
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

var MealDetailsQuery = {
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

function MealDetails$Recipe(Props) {
  var name = Props.name;
  var notes = Props.notes;
  var url = Props.url;
  return React.createElement("div", undefined, React.createElement("div", undefined, name), React.createElement("div", undefined, notes), React.createElement("div", undefined, url));
}

var Recipe = {
  make: MealDetails$Recipe
};

function MealDetails(Props) {
  var id = Props.id;
  var match = ApolloHooks.useQuery(undefined, Caml_option.some(makeVariables(id, undefined)), undefined, undefined, undefined, undefined, undefined, undefined, definition);
  var result = match[0];
  var tmp;
  if (typeof result === "number") {
    tmp = result === /* Loading */0 ? React.createElement("div", undefined, "Loading") : React.createElement("div", undefined, "No data.");
  } else if (result.tag) {
    tmp = React.createElement("div", undefined, result[0].message);
  } else {
    var details = Belt_Option.getWithDefault(Belt_Option.map(result[0].meal, (function (meal) {
                var date = meal.date;
                var recipes = Belt_Array.map(Belt_Option.getWithDefault(meal.recipes, []), (function (recipeOpt) {
                        return Belt_Option.mapWithDefault(recipeOpt, "No recipe found...", (function (r) {
                                      return React.createElement(MealDetails$Recipe, {
                                                  name: r.name,
                                                  notes: Belt_Option.getWithDefault(r.notes, ""),
                                                  url: Belt_Option.getWithDefault(r.url, ""),
                                                  key: r.id
                                                });
                                    }));
                      }));
                return React.createElement(React.Fragment, undefined, React.createElement("div", {
                                className: "text-lg font-bold"
                              }, "Date"), React.createElement("div", {
                                className: "pb-8"
                              }, date), React.createElement("div", {
                                className: "text-lg font-bold"
                              }, "Recipes"), React.createElement("div", undefined, recipes));
              })), null);
    tmp = React.createElement("div", undefined, details);
  }
  return React.createElement(Styles$WhatDidIEat.Container.make, {
              children: null
            }, React.createElement(Styles$WhatDidIEat.Link.make, {
                  href: "/",
                  children: "< Back to list"
                }), React.createElement("div", {
                  className: "pt-4"
                }, tmp));
}

var make$1 = MealDetails;

exports.MealDetailsQuery = MealDetailsQuery;
exports.Recipe = Recipe;
exports.make = make$1;
/* react Not a pure module */
