'use strict';

var $$Array = require("bs-platform/lib/js/array.js");
var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");
var Js_exn = require("bs-platform/lib/js/js_exn.js");
var Js_dict = require("bs-platform/lib/js/js_dict.js");
var Js_json = require("bs-platform/lib/js/js_json.js");
var Js_option = require("bs-platform/lib/js/js_option.js");
var ApolloHooks = require("reason-apollo-hooks/src/ApolloHooks.bs.js");
var Belt_Option = require("bs-platform/lib/js/belt_Option.js");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var ReasonApollo = require("reason-apollo/src/ReasonApollo.bs.js");
var Modal$WhatDidIEat = require("./Modal.bs.js");
var Styles$WhatDidIEat = require("./Styles.bs.js");
var CreateMeal$WhatDidIEat = require("./CreateMeal.bs.js");
var MealListItem$WhatDidIEat = require("./MealListItem.bs.js");

var ppx_printed_query = "query getMeals  {\nmeals  {\nid  \ndate  \nrecipes  {\nname  \n}\n\n}\n\n}\n";

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
              var value$5 = Js_dict.get(value$1, "date");
              var tmp$1;
              if (value$5 !== undefined) {
                var value$6 = Caml_option.valFromOption(value$5);
                var value$7 = Js_json.decodeString(value$6);
                tmp$1 = value$7 !== undefined ? value$7 : Js_exn.raiseError("graphql_ppx: Expected string, got " + JSON.stringify(value$6));
              } else {
                tmp$1 = Js_exn.raiseError("graphql_ppx: Field date on type Meal is missing");
              }
              var value$8 = Js_dict.get(value$1, "recipes");
              var tmp$2;
              if (value$8 !== undefined) {
                var value$9 = Caml_option.valFromOption(value$8);
                var match$1 = Js_json.decodeNull(value$9);
                tmp$2 = match$1 !== undefined ? undefined : Js_option.getExn(Js_json.decodeArray(value$9)).map((function (value) {
                          var match = Js_json.decodeNull(value);
                          if (match !== undefined) {
                            return ;
                          }
                          var value$1 = Js_option.getExn(Js_json.decodeObject(value));
                          var value$2 = Js_dict.get(value$1, "name");
                          var tmp;
                          if (value$2 !== undefined) {
                            var value$3 = Caml_option.valFromOption(value$2);
                            var value$4 = Js_json.decodeString(value$3);
                            tmp = value$4 !== undefined ? value$4 : Js_exn.raiseError("graphql_ppx: Expected string, got " + JSON.stringify(value$3));
                          } else {
                            tmp = Js_exn.raiseError("graphql_ppx: Field name on type Recipe is missing");
                          }
                          return {
                                  name: tmp
                                };
                        }));
              } else {
                tmp$2 = undefined;
              }
              return {
                      id: tmp,
                      date: tmp$1,
                      recipes: tmp$2
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

function useMeals(param) {
  return ApolloHooks.useQuery(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, definition)[0];
}

function mealListItems(query) {
  return $$Array.map((function (meal) {
                return Belt_Option.getWithDefault(Belt_Option.map(meal, (function (m) {
                                  var id = m.id;
                                  var date = m.date;
                                  var recipes = $$Array.map((function (recipe) {
                                            return Belt_Option.getWithDefault(Belt_Option.map(recipe, (function (r) {
                                                              return r.name;
                                                            })), "?");
                                          }), Belt_Option.getWithDefault(m.recipes, [])).join(", ");
                                  return React.createElement(MealListItem$WhatDidIEat.make, {
                                              date: date,
                                              recipes: recipes,
                                              id: id,
                                              key: id
                                            });
                                })), null);
              }), Js_option.getWithDefault([], query.meals));
}

function MealsList(Props) {
  var data = useMeals(undefined);
  var match = Modal$WhatDidIEat.useModal(undefined);
  var closeModal = match[2];
  var openModal = match[1];
  var tmp;
  tmp = typeof data === "number" ? (
      data === /* Loading */0 ? React.createElement("div", undefined, "Loading") : React.createElement("div", undefined, "no data")
    ) : (
      data.tag ? React.createElement("div", undefined, data[0].message) : React.createElement("div", {
              className: ""
            }, React.createElement("div", {
                  className: "font-bold text-lg"
                }, "Recent meals: "), mealListItems(data[0]), React.createElement(Styles$WhatDidIEat.Button.make, {
                  onClick: (function (param) {
                      return Curry._1(openModal, undefined);
                    }),
                  children: "new"
                }), React.createElement(Modal$WhatDidIEat.make, {
                  header: "What did you eat?",
                  isOpen: match[0],
                  onSubmit: (function (param) {
                      console.log("ok");
                      
                    }),
                  onClose: (function (param) {
                      return Curry._1(closeModal, undefined);
                    }),
                  children: React.createElement(CreateMeal$WhatDidIEat.make, { })
                }))
    );
  return React.createElement(Styles$WhatDidIEat.Container.make, {
              children: tmp
            });
}

var make$1 = MealsList;

exports.GetMeals = GetMeals;
exports.GetMealsQuery = GetMealsQuery;
exports.useMeals = useMeals;
exports.mealListItems = mealListItems;
exports.make = make$1;
/* GetMealsQuery Not a pure module */
