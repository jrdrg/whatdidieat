'use strict';

var React = require("react");

function NavHeader(Props) {
  return React.createElement("header", {
              className: "w-screen h-16 bg-black text-white flex flex-row items-center"
            }, React.createElement("div", {
                  className: "flex-1 m-4 font-bold  flex-shrink-0"
                }, "what did i eat"), React.createElement("nav", {
                  className: "flex-1 flex-grow-0"
                }, React.createElement("ul", {
                      className: "flex flex-row justify-between"
                    }, React.createElement("li", {
                          className: "m-4"
                        }, React.createElement("a", {
                              className: "hover:text-gray-500",
                              href: "/recipes"
                            }, "Recipes")), React.createElement("li", {
                          className: "m-4"
                        }, React.createElement("a", {
                              className: "hover:text-gray-500",
                              href: "/"
                            }, "Meals")))));
}

var make = NavHeader;

exports.make = make;
/* react Not a pure module */
