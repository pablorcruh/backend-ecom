"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var shoppingCartModel = new _mongoose.Schema({
  shopper: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  totalPrice: {
    type: Number,
    "default": 0
  },
  products: [{
    product: {
      ref: 'Product',
      type: _mongoose.Schema.Types.ObjectId
    },
    quantity: {
      type: Number,
      "default": 1
    }
  }]
}, {
  versionKey: false,
  timestamps: true
});

var _default = (0, _mongoose.model)('ShoppingCart', shoppingCartModel);

exports["default"] = _default;