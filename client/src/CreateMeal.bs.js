'use strict';

var React = require("react");
var Styles$WhatDidIEat = require("./Styles.bs.js");

function CreateMeal(Props) {
  return React.createElement("div", undefined, React.createElement("div", {
                  className: "pb-2"
                }, React.createElement(Styles$WhatDidIEat.Input.make, {
                      label: "Date",
                      name: "date"
                    })), React.createElement("div", undefined, React.createElement(Styles$WhatDidIEat.Input.make, {
                      label: "Recipe name",
                      name: "recipe-name"
                    })));
}

var make = CreateMeal;

exports.make = make;
/* react Not a pure module */
