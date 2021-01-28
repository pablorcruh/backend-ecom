"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var shoppingCartController = _interopRequireWildcard(require("../controllers/shoppingCart.controller"));

var _middleware = require("../middleware");

var router = (0, _express.Router)();
router.post('/', [_middleware.authJWT.verifyToken, _middleware.authJWT.isShopper], shoppingCartController.createShoppingCart);
var _default = router;
exports["default"] = _default;