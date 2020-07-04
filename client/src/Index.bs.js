'use strict';

var React = require("react");
var ReactDom = require("react-dom");
var App$WhatDidIEat = require("./App.bs.js");
var Client$WhatDidIEat = require("./Client.bs.js");
var ReactHooks = require("@apollo/react-hooks");

((require("./tailwind.css")));

ReactDom.render(React.createElement(ReactHooks.ApolloProvider, {
          client: Client$WhatDidIEat.instance,
          children: React.createElement(App$WhatDidIEat.make, { })
        }), document.getElementById("app"));

/*  Not a pure module */
