"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var rolesSchema = new _mongoose.Schema({
  name: {
    type: String
  }
}, {
  versionKey: false,
  timestamps: true
});

var _default = (0, _mongoose.model)('Roles', rolesSchema);

exports["default"] = _default;