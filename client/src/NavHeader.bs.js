'use strict';

var React = require("react");

function NavHeader(Props) {
  return React.createElement("div", {
              className: "w-screen h-24 bg-black text-white flex flex-row items-center"
            }, React.createElement("div", {
                  className: "flex-1 p-4"
                }, "Header goes here"));
}

var make = NavHeader;

exports.make = make;
/* react Not a pure module */
