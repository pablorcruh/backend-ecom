"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

var _initialSetup = require("./utils/initialSetup");

var _products = _interopRequireDefault(require("./routes/products.routes"));

var _users = _interopRequireDefault(require("./routes/users.routes"));

var _shoppingCart = _interopRequireDefault(require("./routes/shoppingCart.routes"));

var app = (0, _express["default"])();
(0, _initialSetup.createRoles)();
app.use(_express["default"].json());
app.use((0, _morgan["default"])('dev'));
app.use('/api/products', _products["default"]);
app.use('/api/users', _users["default"]);
app.use('/api/shoppingCart', _shoppingCart["default"]);
var _default = app;
exports["default"] = _default;