"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var productSchema = new _mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  image: {
    type: Buffer
  },
  imageUrl: {
    type: String,
    "default": ''
  },
  stock: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  }
}, {
  versionKey: false,
  timestamps: true
});

productSchema.methods.toJSON = function () {
  var product = this;
  var productObject = product.toObject();
  delete productObject.image;
  return productObject;
};

var _default = (0, _mongoose.model)('Product', productSchema);

exports["default"] = _default;