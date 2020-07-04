'use strict';

var $$Array = require("bs-platform/lib/js/array.js");
var Block = require("bs-platform/lib/js/block.js");
var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");
var Js_exn = require("bs-platform/lib/js/js_exn.js");
var Js_dict = require("bs-platform/lib/js/js_dict.js");
var Js_json = require("bs-platform/lib/js/js_json.js");
var Js_option = require("bs-platform/lib/js/js_option.js");
var ApolloHooks = require("reason-apollo-hooks/src/ApolloHooks.bs.js");
var Belt_Option = require("bs-platform/lib/js/belt_Option.js");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var Modal$WhatDidIEat = require("./Modal.bs.js");
var Styles$WhatDidIEat = require("./Styles.bs.js");

function newRecipe(param) {
  return {
          name: "",
          url: "",
          notes: ""
        };
}

var initialState_recipes = [{
    name: "",
    url: "",
    notes: ""
  }];

var initialState = {
  date: "",
  error: undefined,
  recipes: initialState_recipes
};

function reducer(state, action) {
  if (typeof action === "number") {
    if (action === /* AddRecipe */0) {
      return {
              date: state.date,
              error: state.error,
              recipes: $$Array.append(state.recipes, [{
                      name: "",
                      url: "",
                      notes: ""
                    }])
            };
    } else {
      return initialState;
    }
  }
  switch (action.tag | 0) {
    case /* ChangeDate */0 :
        return {
                date: action[0],
                error: undefined,
                recipes: state.recipes
              };
    case /* ChangeName */1 :
        var name = action[1];
        var index = action[0];
        return {
                date: state.date,
                error: undefined,
                recipes: $$Array.mapi((function (i, recipe) {
                        if (i === index) {
                          return {
                                  name: name,
                                  url: recipe.url,
                                  notes: recipe.notes
                                };
                        } else {
                          return recipe;
                        }
                      }), state.recipes)
              };
    case /* Error */2 :
        return {
                date: state.date,
                error: action[0],
                recipes: state.recipes
              };
    
  }
}

var ppx_printed_query = "mutation CreateMeal($input: AddMealMutationInput!)  {\naddMeal(input: $input)  {\n__typename  \nid  \ndate  \nrecipes  {\n__typename  \nname  \n}\n\n}\n\n}\n";

function parse(value) {
  var value$1 = Js_option.getExn(Js_json.decodeObject(value));
  var value$2 = Js_dict.get(value$1, "addMeal");
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
                  var value$5 = Js_dict.get(value$1, "name");
                  var tmp$1;
                  if (value$5 !== undefined) {
                    var value$6 = Caml_option.valFromOption(value$5);
                    var value$7 = Js_json.decodeString(value$6);
                    tmp$1 = value$7 !== undefined ? value$7 : Js_exn.raiseError("graphql_ppx: Expected string, got " + JSON.stringify(value$6));
                  } else {
                    tmp$1 = Js_exn.raiseError("graphql_ppx: Field name on type Recipe is missing");
                  }
                  return {
                          __typename: tmp,
                          name: tmp$1
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
          addMeal: tmp
        };
}

function json_of_RecipeInput(value) {
  var v = value.id;
  var v$1 = value.name;
  var v$2 = value.url;
  var v$3 = value.notes;
  return Js_dict.fromArray([
                /* tuple */[
                  "id",
                  v !== undefined ? v : null
                ],
                /* tuple */[
                  "name",
                  v$1 !== undefined ? v$1 : null
                ],
                /* tuple */[
                  "url",
                  v$2 !== undefined ? v$2 : null
                ],
                /* tuple */[
                  "notes",
                  v$3 !== undefined ? v$3 : null
                ]
              ].filter((function (param) {
                    return !Js_json.test(param[1], /* Null */5);
                  })));
}

function json_of_AddMealMutationInput(value) {
  var v = value.recipes;
  return Js_dict.fromArray([
                /* tuple */[
                  "date",
                  value.date
                ],
                /* tuple */[
                  "recipes",
                  v.map(json_of_RecipeInput)
                ]
              ].filter((function (param) {
                    return !Js_json.test(param[1], /* Null */5);
                  })));
}

function make(input, param) {
  return {
          query: ppx_printed_query,
          variables: Js_dict.fromArray([/* tuple */[
                    "input",
                    json_of_AddMealMutationInput(input)
                  ]].filter((function (param) {
                      return !Js_json.test(param[1], /* Null */5);
                    }))),
          parse: parse
        };
}

function makeWithVariables(variables) {
  var input = variables.input;
  return {
          query: ppx_printed_query,
          variables: Js_dict.fromArray([/* tuple */[
                    "input",
                    json_of_AddMealMutationInput(input)
                  ]].filter((function (param) {
                      return !Js_json.test(param[1], /* Null */5);
                    }))),
          parse: parse
        };
}

function makeVariables(input, param) {
  return Js_dict.fromArray([/* tuple */[
                  "input",
                  json_of_AddMealMutationInput(input)
                ]].filter((function (param) {
                    return !Js_json.test(param[1], /* Null */5);
                  })));
}

function definition_002(graphql_ppx_use_json_variables_fn, input, param) {
  return Curry._1(graphql_ppx_use_json_variables_fn, Js_dict.fromArray([/* tuple */[
                      "input",
                      json_of_AddMealMutationInput(input)
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

var CreateMealMutation = {
  ppx_printed_query: ppx_printed_query,
  query: ppx_printed_query,
  parse: parse,
  json_of_RecipeInput: json_of_RecipeInput,
  json_of_AddMealMutationInput: json_of_AddMealMutationInput,
  make: make,
  makeWithVariables: makeWithVariables,
  makeVariables: makeVariables,
  definition: definition,
  ret_type: ret_type,
  MT_Ret: MT_Ret
};

var ppx_printed_query$1 = "query Meals  {\nmeals  {\n__typename  \nid  \ndate  \nrecipes  {\n__typename  \nname  \n}\n\n}\n\n}\n";

function parse$1(value) {
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
              var value$2 = Js_dict.get(value$1, "__typename");
              var tmp;
              if (value$2 !== undefined) {
                var value$3 = Caml_option.valFromOption(value$2);
                var value$4 = Js_json.decodeString(value$3);
                tmp = value$4 !== undefined ? value$4 : Js_exn.raiseError("graphql_ppx: Expected string, got " + JSON.stringify(value$3));
              } else {
                tmp = Js_exn.raiseError("graphql_ppx: Field __typename on type Meal is missing");
              }
              var value$5 = Js_dict.get(value$1, "id");
              var tmp$1;
              if (value$5 !== undefined) {
                var value$6 = Caml_option.valFromOption(value$5);
                var value$7 = Js_json.decodeString(value$6);
                tmp$1 = value$7 !== undefined ? value$7 : Js_exn.raiseError("graphql_ppx: Expected string, got " + JSON.stringify(value$6));
              } else {
                tmp$1 = Js_exn.raiseError("graphql_ppx: Field id on type Meal is missing");
              }
              var value$8 = Js_dict.get(value$1, "date");
              var tmp$2;
              if (value$8 !== undefined) {
                var value$9 = Caml_option.valFromOption(value$8);
                var value$10 = Js_json.decodeString(value$9);
                tmp$2 = value$10 !== undefined ? value$10 : Js_exn.raiseError("graphql_ppx: Expected string, got " + JSON.stringify(value$9));
              } else {
                tmp$2 = Js_exn.raiseError("graphql_ppx: Field date on type Meal is missing");
              }
              var value$11 = Js_dict.get(value$1, "recipes");
              var tmp$3;
              if (value$11 !== undefined) {
                var value$12 = Caml_option.valFromOption(value$11);
                var match$1 = Js_json.decodeNull(value$12);
                tmp$3 = match$1 !== undefined ? undefined : Js_option.getExn(Js_json.decodeArray(value$12)).map((function (value) {
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
                          var value$5 = Js_dict.get(value$1, "name");
                          var tmp$1;
                          if (value$5 !== undefined) {
                            var value$6 = Caml_option.valFromOption(value$5);
                            var value$7 = Js_json.decodeString(value$6);
                            tmp$1 = value$7 !== undefined ? value$7 : Js_exn.raiseError("graphql_ppx: Expected string, got " + JSON.stringify(value$6));
                          } else {
                            tmp$1 = Js_exn.raiseError("graphql_ppx: Field name on type Recipe is missing");
                          }
                          return {
                                  __typename: tmp,
                                  name: tmp$1
                                };
                        }));
              } else {
                tmp$3 = undefined;
              }
              return {
                      __typename: tmp,
                      id: tmp$1,
                      date: tmp$2,
                      recipes: tmp$3
                    };
            }));
  } else {
    tmp = undefined;
  }
  return {
          meals: tmp
        };
}

function make$1(param) {
  return {
          query: ppx_printed_query$1,
          variables: null,
          parse: parse$1
        };
}

function makeWithVariables$1(param) {
  return {
          query: ppx_printed_query$1,
          variables: null,
          parse: parse$1
        };
}

function makeVariables$1(param) {
  return null;
}

function definition_002$1(graphql_ppx_use_json_variables_fn) {
  return 0;
}

var definition$1 = /* tuple */[
  parse$1,
  ppx_printed_query$1,
  definition_002$1
];

function ret_type$1(f) {
  return { };
}

var MT_Ret$1 = { };

var RefetchMeals = {
  ppx_printed_query: ppx_printed_query$1,
  query: ppx_printed_query$1,
  parse: parse$1,
  make: make$1,
  makeWithVariables: makeWithVariables$1,
  makeVariables: makeVariables$1,
  definition: definition$1,
  ret_type: ret_type$1,
  MT_Ret: MT_Ret$1
};

function useCreateMeal(state, dispatch, closeModal) {
  var match = ApolloHooks.useMutation(undefined, undefined, (function (x) {
          console.log("REFETCH");
          console.log(x);
          return [ApolloHooks.toQueryObj(make$1(undefined))];
        }), undefined, (function (cache, result) {
          console.log("UPDATE");
          console.log(cache);
          console.log("UPDATE 2");
          console.log(result);
          
        }), undefined, definition);
  var result = match[1];
  var create = match[0];
  React.useEffect((function () {
          if (typeof result !== "number") {
            if (result.tag) {
              Curry._1(dispatch, /* Error */Block.__(2, [result[0].message]));
            } else {
              console.log("RES");
              console.log(result[0]);
              Curry._1(dispatch, /* ResetForm */1);
              Curry._1(closeModal, undefined);
            }
          }
          
        }), [result]);
  return React.useCallback((function (param) {
                return Curry._6(create, Caml_option.some(makeVariables({
                                        date: state.date,
                                        recipes: $$Array.map((function (recipe) {
                                                return {
                                                        id: undefined,
                                                        name: recipe.name,
                                                        notes: "test notes",
                                                        url: "http://www.example.com"
                                                      };
                                              }), state.recipes)
                                      }, undefined)), undefined, undefined, undefined, undefined, undefined).then((function (_res) {
                                return Promise.resolve(undefined);
                              })).catch((function (_err) {
                              return Promise.resolve(undefined);
                            }));
              }), [state]);
}

function CreateMeal(Props) {
  var match = Modal$WhatDidIEat.useModal(undefined);
  var closeModal = match[2];
  var openModal = match[1];
  var match$1 = React.useReducer(reducer, initialState);
  var dispatch = match$1[1];
  var state = match$1[0];
  var create = useCreateMeal(state, dispatch, closeModal);
  return React.createElement(React.Fragment, undefined, React.createElement(Styles$WhatDidIEat.Button.make, {
                  onClick: (function (param) {
                      return Curry._1(openModal, undefined);
                    }),
                  children: "new"
                }), React.createElement(Modal$WhatDidIEat.make, {
                  header: "What did you eat?",
                  isOpen: match[0],
                  onSubmit: (function (param) {
                      Curry._1(create, undefined);
                      
                    }),
                  onClose: (function (param) {
                      Curry._1(dispatch, /* ResetForm */1);
                      return Curry._1(closeModal, undefined);
                    }),
                  children: React.createElement("div", undefined, React.createElement("div", {
                            className: "pb-2"
                          }, React.createElement(Styles$WhatDidIEat.Input.make, {
                                label: "Date",
                                name: "date",
                                onChange: (function (e) {
                                    return Curry._1(dispatch, /* ChangeDate */Block.__(0, [e.currentTarget.value]));
                                  }),
                                type_: /* Date */1,
                                value: state.date
                              })), $$Array.mapi((function (i, recipe) {
                              return React.createElement("div", {
                                          key: String(i)
                                        }, React.createElement(Styles$WhatDidIEat.Input.make, {
                                              label: "Recipe name",
                                              name: "recipe-name",
                                              onChange: (function (e) {
                                                  return Curry._1(dispatch, /* ChangeName */Block.__(1, [
                                                                i,
                                                                e.currentTarget.value
                                                              ]));
                                                }),
                                              value: recipe.name
                                            }));
                            }), state.recipes), React.createElement("div", {
                            className: "text-sm text-red-600"
                          }, Belt_Option.getWithDefault(state.error, "")), React.createElement("div", undefined, React.createElement("a", {
                                href: "#",
                                onClick: (function (e) {
                                    e.preventDefault();
                                    return Curry._1(dispatch, /* AddRecipe */0);
                                  })
                              }, "+ Add recipe")))
                }));
}

var make$2 = CreateMeal;

exports.newRecipe = newRecipe;
exports.initialState = initialState;
exports.reducer = reducer;
exports.CreateMealMutation = CreateMealMutation;
exports.RefetchMeals = RefetchMeals;
exports.useCreateMeal = useCreateMeal;
exports.make = make$2;
/* react Not a pure module */
