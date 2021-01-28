"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createShoppingCart = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _ShoppingCart = _interopRequireDefault(require("../models/ShoppingCart"));

var _Products = _interopRequireDefault(require("../models/Products"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var createShoppingCart = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var _req$body, products, totalPrice, newShoppingCart, modifiedData;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _req$body = req.body, products = _req$body.products, totalPrice = _req$body.totalPrice;
            products.forEach( /*#__PURE__*/function () {
              var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(product) {
                var _yield$Products$findB, productId, stockAvailable;

                return _regenerator["default"].wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.next = 2;
                        return _Products["default"].findById(product.id);

                      case 2:
                        _yield$Products$findB = _context.sent;
                        productId = _yield$Products$findB.id;
                        stockAvailable = _yield$Products$findB.stock;

                        if (!(stockAvailable > 0)) {
                          _context.next = 9;
                          break;
                        }

                        stockAvailable = stockAvailable - product.quantity;
                        _context.next = 9;
                        return _Products["default"].findByIdAndUpdate(productId, {
                          stock: stockAvailable
                        }, {
                          "new": true
                        });

                      case 9:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee);
              }));

              return function (_x3) {
                return _ref2.apply(this, arguments);
              };
            }());
            newShoppingCart = new _ShoppingCart["default"]({
              shopper: req.userId,
              totalPrice: totalPrice
            });
            modifiedData = products.map(function (product) {
              return {
                _id: _mongoose["default"].Types.ObjectId(product.id),
                quantity: product.quantity
              };
            });
            newShoppingCart.products = modifiedData;
            _context2.next = 8;
            return newShoppingCart.save();

          case 8:
            res.send();
            _context2.next = 15;
            break;

          case 11:
            _context2.prev = 11;
            _context2.t0 = _context2["catch"](0);
            console.error(_context2.t0.message);
            res.status(500).json({
              message: _context2.t0.message
            });

          case 15:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 11]]);
  }));

  return function createShoppingCart(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.createShoppingCart = createShoppingCart;