// Generated by BUCKLESCRIPT VERSION 3.0.0, PLEASE EDIT WITH CARE
'use strict';

var Js_option = require("bs-platform/lib/js/js_option.js");
var Js_primitive = require("bs-platform/lib/js/js_primitive.js");

function get(key) {
  return Js_option.getWithDefault("", Js_primitive.undefined_to_opt(process.env[key]));
}

var Env = /* module */[/* get */get];

var LocalStorage = /* module */[];

exports.Env = Env;
exports.LocalStorage = LocalStorage;
/* No side effect */
