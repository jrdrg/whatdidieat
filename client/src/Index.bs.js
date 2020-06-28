'use strict';

var React = require("react");
var ReactDom = require("react-dom");
var ReactApollo = require("react-apollo");
var App$WhatDidIEat = require("./App.bs.js");
var Client$WhatDidIEat = require("./Client.bs.js");
var ExampleStyles$WhatDidIEat = require("./ExampleStyles.bs.js");

((require("./tailwind.css")));

var style = document.createElement("style");

document.head.appendChild(style);

style.innerHTML = ExampleStyles$WhatDidIEat.style;

function makeContainer(text) {
  var container = document.createElement("div");
  container.className = "container";
  var title = document.createElement("div");
  title.className = "containerTitle";
  title.innerText = text;
  var content = document.createElement("div");
  content.className = "containerContent";
  container.appendChild(title);
  container.appendChild(content);
  document.body.appendChild(container);
  return content;
}

ReactDom.render(React.createElement(ReactApollo.ApolloProvider, {
          client: Client$WhatDidIEat.instance,
          children: React.createElement(App$WhatDidIEat.make, { })
        }), makeContainer("app"));

exports.style = style;
exports.makeContainer = makeContainer;
/*  Not a pure module */
