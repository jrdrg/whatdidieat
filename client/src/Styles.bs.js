'use strict';

var React = require("react");

function Styles$Container(Props) {
  var children = Props.children;
  return React.createElement("div", {
              className: "mx-auto w-10/12"
            }, children);
}

var Container = {
  make: Styles$Container
};

exports.Container = Container;
/* react Not a pure module */
