'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");
var Belt_Option = require("bs-platform/lib/js/belt_Option.js");
var ReasonReactRouter = require("reason-react/src/ReasonReactRouter.bs.js");

function Styles$Container(Props) {
  var children = Props.children;
  return React.createElement("div", {
              className: "mx-auto w-10/12 p-4"
            }, children);
}

var Container = {
  make: Styles$Container
};

function Styles$Link(Props) {
  var className = Props.className;
  var href = Props.href;
  var onClickOpt = Props.onClick;
  var children = Props.children;
  var onClick = onClickOpt !== undefined ? onClickOpt : (function (prim) {
        
      });
  return React.createElement("a", {
              className: Belt_Option.getWithDefault(className, "hover:text-gray-600"),
              href: href,
              onClick: (function (e) {
                  e.preventDefault();
                  ReasonReactRouter.push(href);
                  return Curry._1(onClick, undefined);
                })
            }, children);
}

var Link = {
  make: Styles$Link
};

function Styles$Button(Props) {
  var buttonTypeOpt = Props.buttonType;
  var onClick = Props.onClick;
  var children = Props.children;
  var buttonType = buttonTypeOpt !== undefined ? buttonTypeOpt : /* Primary */0;
  var match = buttonType ? /* tuple */[
      "bg-gray-400",
      "text-gray-800"
    ] : /* tuple */[
      "bg-blue-700",
      "text-gray-200"
    ];
  return React.createElement("button", {
              className: "pl-2 pr-2 pt-1 pb-1 " + (match[0] + (" " + (match[1] + " rounded-sm shadow-sm tracking-wide"))),
              onClick: onClick
            }, children);
}

var Button = {
  make: Styles$Button
};

function Styles$Input(Props) {
  var label = Props.label;
  var name = Props.name;
  return React.createElement(React.Fragment, undefined, React.createElement("div", undefined, React.createElement("label", {
                      className: "font-semibold",
                      htmlFor: name
                    }, label)), React.createElement("div", undefined, React.createElement("input", {
                      className: "border border-gray-700 rounded-sm p-1",
                      name: name
                    })));
}

var Input = {
  make: Styles$Input
};

exports.Container = Container;
exports.Link = Link;
exports.Button = Button;
exports.Input = Input;
/* react Not a pure module */
