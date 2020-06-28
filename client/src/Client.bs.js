'use strict';

var ApolloLinks = require("reason-apollo/src/ApolloLinks.bs.js");
var ReasonApollo = require("reason-apollo/src/ReasonApollo.bs.js");
var Util$WhatDidIEat = require("./Util.bs.js");
var ApolloInMemoryCache = require("reason-apollo/src/ApolloInMemoryCache.bs.js");

var graphqlServer = Util$WhatDidIEat.Env.graphqlServer;

console.log("GQL server", graphqlServer);

var inMemoryCache = ApolloInMemoryCache.createInMemoryCache(undefined, undefined, undefined);

var httpLink = ApolloLinks.createHttpLink(graphqlServer, undefined, undefined, undefined, undefined, undefined, undefined);

var instance = ReasonApollo.createApolloClient(httpLink, inMemoryCache, undefined, undefined, undefined, undefined, undefined);

exports.graphqlServer = graphqlServer;
exports.inMemoryCache = inMemoryCache;
exports.httpLink = httpLink;
exports.instance = instance;
/*  Not a pure module */
