'use strict';


var graphqlServer = process.env.GRAPHQL_SERVER;

var Env = {
  graphqlServer: graphqlServer
};

var LocalStorage = { };

exports.Env = Env;
exports.LocalStorage = LocalStorage;
/* graphqlServer Not a pure module */
