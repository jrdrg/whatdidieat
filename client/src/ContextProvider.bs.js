'use strict';

var React = require("react");

function reducer(_state, action) {
  if (action) {
    return {
            view: /* Meal */[action[0]]
          };
  } else {
    return {
            view: /* List */0
          };
  }
}

var initialState = {
  view: /* List */0
};

var context = React.createContext(/* tuple */[
      initialState,
      (function (param) {
          
        })
    ]);

function makeProps(value, children, param) {
  return {
          value: value,
          children: children
        };
}

var make = context.Provider;

var ContextProvider = {
  context: context,
  makeProps: makeProps,
  make: make
};

exports.reducer = reducer;
exports.initialState = initialState;
exports.ContextProvider = ContextProvider;
/* context Not a pure module */
