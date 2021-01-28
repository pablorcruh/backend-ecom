"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteProductById = exports.updateProductById = exports.getProductImage = exports.getProductById = exports.getProducts = exports.uploadImage = exports.createProduct = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _Products = _interopRequireDefault(require("../models/Products"));

var _os = _interopRequireDefault(require("os"));

var _sharp = _interopRequireDefault(require("sharp"));

var createProduct = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var _req$body, name, description, stock, price, newProduct, productSaved;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _req$body = req.body, name = _req$body.name, description = _req$body.description, stock = _req$body.stock, price = _req$body.price;
            newProduct = new _Products["default"]({
              name: name,
              description: description,
              stock: stock,
              image: '',
              price: price
            });
            _context.next = 5;
            return newProduct.save();

          case 5:
            productSaved = _context.sent;
            res.status(200).json(productSaved);
            _context.next = 13;
            break;

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](0);
            console.error.error(_context.t0.message);
            res.status(500).json({
              message: _context.t0.message
            });

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 9]]);
  }));

  return function createProduct(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.createProduct = createProduct;

var uploadImage = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var productId, product, buffer;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            productId = req.params.productId;
            _context2.next = 4;
            return _Products["default"].findById(productId);

          case 4:
            product = _context2.sent;

            if (product) {
              _context2.next = 8;
              break;
            }

            res.status(400).json({
              message: 'Product not found'
            });
            return _context2.abrupt("return");

          case 8:
            _context2.next = 10;
            return (0, _sharp["default"])(req.file.buffer).resize({
              width: 250,
              height: 250
            }).png().toBuffer();

          case 10:
            buffer = _context2.sent;
            product.image = buffer;
            _context2.next = 14;
            return _Products["default"].findByIdAndUpdate(productId, product);

          case 14:
            createImageUrl(productId);
            res.status(200).send();
            _context2.next = 22;
            break;

          case 18:
            _context2.prev = 18;
            _context2.t0 = _context2["catch"](0);
            console.error.error(_context2.t0.message);
            res.status(500).json({
              message: _context2.t0.message
            });

          case 22:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 18]]);
  }));

  return function uploadImage(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.uploadImage = uploadImage;

var createImageUrl = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(productId) {
    var product, hostname, imageURL;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _Products["default"].findById(productId);

          case 2:
            product = _context3.sent;
            hostname = _os["default"].hostname();
            imageURL = "https://".concat(hostname).concat(':').concat(process.env.PORT).concat('/api/products/').concat(productId).concat('/image');
            product.imageUrl = imageURL;
            console.log(product);
            _context3.next = 9;
            return _Products["default"].findByIdAndUpdate(productId, product);

          case 9:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function createImageUrl(_x5) {
    return _ref3.apply(this, arguments);
  };
}();

var getProducts = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var products;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return _Products["default"].find();

          case 3:
            products = _context4.sent;
            res.status(200).json(products);
            _context4.next = 11;
            break;

          case 7:
            _context4.prev = 7;
            _context4.t0 = _context4["catch"](0);
            console.error(_context4.t0.message);
            res.status(500).json({
              message: _context4.t0.message
            });

          case 11:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 7]]);
  }));

  return function getProducts(_x6, _x7) {
    return _ref4.apply(this, arguments);
  };
}();

exports.getProducts = getProducts;

var getProductById = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var productId, product;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            productId = req.params.productId;
            _context5.next = 4;
            return _Products["default"].findById(productId);

          case 4:
            product = _context5.sent;

            if (product) {
              _context5.next = 8;
              break;
            }

            res.status(400).json({
              message: 'product not found'
            });
            return _context5.abrupt("return");

          case 8:
            res.status(200).json(product);
            _context5.next = 15;
            break;

          case 11:
            _context5.prev = 11;
            _context5.t0 = _context5["catch"](0);
            console.error(_context5.t0.message);
            res.status(500).json({
              message: _context5.t0.message
            });

          case 15:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 11]]);
  }));

  return function getProductById(_x8, _x9) {
    return _ref5.apply(this, arguments);
  };
}();

exports.getProductById = getProductById;

var getProductImage = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var product;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            _context6.next = 3;
            return _Products["default"].findById(req.params.productId);

          case 3:
            product = _context6.sent;

            if (product) {
              _context6.next = 6;
              break;
            }

            throw new Error();

          case 6:
            if (!product.image) res.status(404).json({
              message: 'no image found'
            });
            res.set('Content-Type', 'image/png');
            res.send(product.image);
            _context6.next = 15;
            break;

          case 11:
            _context6.prev = 11;
            _context6.t0 = _context6["catch"](0);
            console.error(_context6.t0.message);
            res.status(404).send({
              message: 'Product not found'
            });

          case 15:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[0, 11]]);
  }));

  return function getProductImage(_x10, _x11) {
    return _ref6.apply(this, arguments);
  };
}();

exports.getProductImage = getProductImage;

var updateProductById = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res) {
    var productId, updatedProduct;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            productId = req.params.productId;
            _context7.next = 4;
            return _Products["default"].findByIdAndUpdate(productId, req.body, {
              "new": true
            });

          case 4:
            updatedProduct = _context7.sent;
            res.status(200).json(updatedProduct);
            _context7.next = 12;
            break;

          case 8:
            _context7.prev = 8;
            _context7.t0 = _context7["catch"](0);
            console.error(_context7.t0.message);
            res.status(500).json({
              message: _context7.t0.message
            });

          case 12:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[0, 8]]);
  }));

  return function updateProductById(_x12, _x13) {
    return _ref7.apply(this, arguments);
  };
}();

exports.updateProductById = updateProductById;

var deleteProductById = /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(req, res) {
    var productId;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.prev = 0;
            productId = req.params.productId;
            _context8.next = 4;
            return _Products["default"].findByIdAndDelete(productId);

          case 4:
            res.status(201).send();
            _context8.next = 11;
            break;

          case 7:
            _context8.prev = 7;
            _context8.t0 = _context8["catch"](0);
            console.error(_context8.t0.message);
            res.status(500).json({
              message: _context8.t0.message
            });

          case 11:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, null, [[0, 7]]);
  }));

  return function deleteProductById(_x14, _x15) {
    return _ref8.apply(this, arguments);
  };
}();

exports.deleteProductById = deleteProductById;