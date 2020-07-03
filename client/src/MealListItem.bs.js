'use strict';

var React = require("react");
var Styles$WhatDidIEat = require("./Styles.bs.js");
var GlobalState$WhatDidIEat = require("./GlobalState.bs.js");

function MealListItem(Props) {
  var date = Props.date;
  var recipes = Props.recipes;
  var id = Props.id;
  React.useContext(GlobalState$WhatDidIEat.ContextProvider.context);
  return React.createElement("div", {
              className: "border-gray-400 border-t border-l border-b border-r rounded-md p-2 m-2 shadow-sm"
            }, React.createElement("div", {
                  className: "text-gray-900"
                }, React.createElement(Styles$WhatDidIEat.Link.make, {
                      href: "/meals/" + (String(id) + ""),
                      children: date
                    })), React.createElement("div", {
                  className: "text-gray-700"
                }, recipes));
}

var make = MealListItem;

exports.make = make;
/* react Not a pure module */
