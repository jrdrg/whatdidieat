'use strict';

var React = require("react");
var Styles$WhatDidIEat = require("./Styles.bs.js");

function MealDetails(Props) {
  var id = Props.id;
  return React.createElement(Styles$WhatDidIEat.Container.make, {
              children: null
            }, React.createElement(Styles$WhatDidIEat.Link.make, {
                  href: "/",
                  children: "< back to list"
                }), React.createElement("div", undefined, id));
}

var make = MealDetails;

exports.make = make;
/* react Not a pure module */
