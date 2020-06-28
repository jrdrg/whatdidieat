'use strict';

var React = require("react");
var MealsList$WhatDidIEat = require("./MealsList.bs.js");
var NavHeader$WhatDidIEat = require("./NavHeader.bs.js");
var MealDetails$WhatDidIEat = require("./MealDetails.bs.js");
var ContextProvider$WhatDidIEat = require("./ContextProvider.bs.js");

function App(Props) {
  var match = React.useReducer(ContextProvider$WhatDidIEat.reducer, ContextProvider$WhatDidIEat.initialState);
  var state = match[0];
  var id = state.view;
  return React.createElement(ContextProvider$WhatDidIEat.ContextProvider.make, ContextProvider$WhatDidIEat.ContextProvider.makeProps(/* tuple */[
                  state,
                  match[1]
                ], React.createElement(React.Fragment, undefined, React.createElement(NavHeader$WhatDidIEat.make, { }), id ? React.createElement(MealDetails$WhatDidIEat.make, {
                            id: id[0]
                          }) : React.createElement(MealsList$WhatDidIEat.make, { })), undefined));
}

var make = App;

exports.make = make;
/* react Not a pure module */
