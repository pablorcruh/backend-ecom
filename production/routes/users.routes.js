"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var userController = _interopRequireWildcard(require("../controllers/users.controller"));

var router = (0, _express.Router)();
router.post('/signup', userController.createUser);
router.post('/signin', userController.userLogin);
var _default = router;
exports["default"] = _default;