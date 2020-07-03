'use strict';

var React = require("react");

function NotFound(Props) {
  return React.createElement("div", {
              className: "mt-16 w-screen flex items-center justify-center"
            }, "Not found");
}

var make = NotFound;

exports.make = make;
/* react Not a pure module */
