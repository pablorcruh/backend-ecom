"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _app = _interopRequireDefault(require("./app"));

require("./database");

var _dotenv = _interopRequireDefault(require("dotenv"));

_dotenv["default"].config();

var port = process.env.PORT;

_app["default"].listen(port);