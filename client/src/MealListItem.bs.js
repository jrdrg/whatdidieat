'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");
var ContextProvider$WhatDidIEat = require("./ContextProvider.bs.js");

function MealListItem(Props) {
  var date = Props.date;
  var recipes = Props.recipes;
  var id = Props.id;
  var match = React.useContext(ContextProvider$WhatDidIEat.ContextProvider.context);
  var dispatch = match[1];
  return React.createElement("div", {
              className: "border-gray-100 rounded-sm p-2"
            }, React.createElement("div", {
                  className: "text-gray-900"
                }, React.createElement("a", {
                      href: "#",
                      onClick: (function (e) {
                          e.preventDefault();
                          return Curry._1(dispatch, /* NavigateToMeal */[id]);
                        })
                    }, date)), React.createElement("div", {
                  className: "text-gray-700"
                }, recipes));
}

var make = MealListItem;

exports.make = make;
/* react Not a pure module */
