'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");
var Styles$WhatDidIEat = require("./Styles.bs.js");
var ContextProvider$WhatDidIEat = require("./ContextProvider.bs.js");

function MealDetails(Props) {
  var id = Props.id;
  var match = React.useContext(ContextProvider$WhatDidIEat.ContextProvider.context);
  var dispatch = match[1];
  return React.createElement(Styles$WhatDidIEat.Container.make, {
              children: null
            }, React.createElement("a", {
                  href: "#",
                  onClick: (function (e) {
                      e.preventDefault();
                      return Curry._1(dispatch, /* NavigateToList */0);
                    })
                }, "< back to list"), React.createElement("div", undefined, id));
}

var make = MealDetails;

exports.make = make;
/* react Not a pure module */
