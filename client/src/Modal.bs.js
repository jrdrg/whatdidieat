'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");
var ReactDom = require("react-dom");
var Styles$WhatDidIEat = require("./Styles.bs.js");

function Modal$Overlay(Props) {
  var children = Props.children;
  return React.createElement("div", {
              className: "fixed top-0 left-0 bottom-0 right-0 bg-black bg-opacity-50 flex justify-center items-start pt-24"
            }, children);
}

var Overlay = {
  make: Modal$Overlay
};

function Modal$Content(Props) {
  var children = Props.children;
  return React.createElement("div", {
              className: "w-2/3 bg-white max-w-lg"
            }, children);
}

var Content = {
  make: Modal$Content
};

function Modal$Header(Props) {
  var children = Props.children;
  return React.createElement("div", {
              className: "p-4"
            }, React.createElement("div", {
                  className: "pb-1 border-b border-black font-bold"
                }, children));
}

var Header = {
  make: Modal$Header
};

function Modal$Body(Props) {
  var children = Props.children;
  return React.createElement("div", {
              className: "p-4"
            }, children);
}

var Body = {
  make: Modal$Body
};

function Modal$Footer(Props) {
  var onSubmit = Props.onSubmit;
  var onClose = Props.onClose;
  return React.createElement("div", {
              className: "p-4 flex justify-end"
            }, React.createElement(Styles$WhatDidIEat.Button.make, {
                  buttonType: /* Secondary */1,
                  onClick: onClose,
                  children: "Close"
                }), React.createElement("span", {
                  className: "p-1"
                }), React.createElement(Styles$WhatDidIEat.Button.make, {
                  buttonType: /* Primary */0,
                  onClick: onSubmit,
                  children: "Ok"
                }));
}

var Footer = {
  make: Modal$Footer
};

function useModal(param) {
  var match = React.useState((function () {
          return false;
        }));
  var setIsOpen = match[1];
  var openModal = function (param) {
    return Curry._1(setIsOpen, (function (param) {
                  return true;
                }));
  };
  var closeModal = function (param) {
    return Curry._1(setIsOpen, (function (param) {
                  return false;
                }));
  };
  return /* tuple */[
          match[0],
          openModal,
          closeModal
        ];
}

function Modal(Props) {
  var header = Props.header;
  var isOpen = Props.isOpen;
  var onSubmit = Props.onSubmit;
  var onClose = Props.onClose;
  var children = Props.children;
  if (isOpen) {
    return ReactDom.createPortal(React.createElement(Modal$Overlay, {
                    children: React.createElement(Modal$Content, {
                          children: null
                        }, React.createElement(Modal$Header, {
                              children: header
                            }), React.createElement(Modal$Body, {
                              children: children
                            }), React.createElement(Modal$Footer, {
                              onSubmit: onSubmit,
                              onClose: onClose
                            }))
                  }), document.body);
  } else {
    return null;
  }
}

var make = Modal;

exports.Overlay = Overlay;
exports.Content = Content;
exports.Header = Header;
exports.Body = Body;
exports.Footer = Footer;
exports.useModal = useModal;
exports.make = make;
/* react Not a pure module */
