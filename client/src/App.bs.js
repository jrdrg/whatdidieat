'use strict';

var React = require("react");
var ReasonReactRouter = require("reason-react/src/ReasonReactRouter.bs.js");
var NotFound$WhatDidIEat = require("./NotFound.bs.js");
var MealsList$WhatDidIEat = require("./MealsList.bs.js");
var NavHeader$WhatDidIEat = require("./NavHeader.bs.js");
var GlobalState$WhatDidIEat = require("./GlobalState.bs.js");
var MealDetails$WhatDidIEat = require("./MealDetails.bs.js");

function App(Props) {
  var match = React.useReducer(GlobalState$WhatDidIEat.reducer, GlobalState$WhatDidIEat.initialState);
  var url = ReasonReactRouter.useUrl(undefined, undefined);
  console.log(url.path);
  var match$1 = url.path;
  var tmp;
  var exit = 0;
  if (match$1) {
    if (match$1[0] === "meals") {
      var match$2 = match$1[1];
      if (match$2 && !match$2[1]) {
        tmp = React.createElement(MealDetails$WhatDidIEat.make, {
              id: match$2[0]
            });
      } else {
        exit = 1;
      }
    } else {
      exit = 1;
    }
  } else {
    tmp = React.createElement(MealsList$WhatDidIEat.make, { });
  }
  if (exit === 1) {
    tmp = React.createElement(NotFound$WhatDidIEat.make, { });
  }
  return React.createElement(GlobalState$WhatDidIEat.ContextProvider.make, GlobalState$WhatDidIEat.ContextProvider.makeProps(/* tuple */[
                  match[0],
                  match[1]
                ], React.createElement(React.Fragment, undefined, React.createElement(NavHeader$WhatDidIEat.make, { }), tmp), undefined));
}

var make = App;

exports.make = make;
/* react Not a pure module */
