"use strict";

var handlers = require("../handlers");
var routes = [
  {
    method: "POST",
    path: "/{path*}",
    handler: handlers.handleUpload
  },
  {
    method: "GET",
    path: "/",
    handler: handlers.showFrontpage
  }
];

module.exports = routes;
