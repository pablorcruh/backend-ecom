"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isShopper = exports.isAdmin = exports.verifyToken = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _Users = _interopRequireDefault(require("../models/Users"));

var _Roles = _interopRequireDefault(require("../models/Roles"));

var verifyToken = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var token, decoded, user;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            token = req.header('Authorization').replace('Bearer ', '');

            if (token) {
              _context.next = 4;
              break;
            }

            return _context.abrupt("return", res.status(403).json({
              message: 'Token not provided'
            }));

          case 4:
            decoded = _jsonwebtoken["default"].verify(token, process.env.TOKEN_SECRET);
            req.userId = decoded.id;
            _context.next = 8;
            return _Users["default"].findById(req.userId);

          case 8:
            user = _context.sent;

            if (user) {
              _context.next = 11;
              break;
            }

            return _context.abrupt("return", res.status(404).json({
              message: 'User not Found'
            }));

          case 11:
            next();
            _context.next = 18;
            break;

          case 14:
            _context.prev = 14;
            _context.t0 = _context["catch"](0);
            console.error(_context.t0.message);
            res.status(403).json({
              message: 'Unauthorized'
            });

          case 18:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 14]]);
  }));

  return function verifyToken(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.verifyToken = verifyToken;

var isAdmin = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
    var user, roles, i;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _Users["default"].findById(req.userId);

          case 3:
            user = _context2.sent;
            _context2.next = 6;
            return _Roles["default"].find({
              _id: {
                $in: user.roles
              }
            });

          case 6:
            roles = _context2.sent;
            i = 0;

          case 8:
            if (!(i < roles.length)) {
              _context2.next = 16;
              break;
            }

            if (!(roles[i].name === 'admin')) {
              _context2.next = 12;
              break;
            }

            next();
            return _context2.abrupt("return");

          case 12:
            res.status(403).json({
              message: 'Require Admin Role'
            });

          case 13:
            i++;
            _context2.next = 8;
            break;

          case 16:
            _context2.next = 22;
            break;

          case 18:
            _context2.prev = 18;
            _context2.t0 = _context2["catch"](0);
            console.error(_context2.t0.message);
            res.status(403).json({
              message: 'Require Admin Role'
            });

          case 22:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 18]]);
  }));

  return function isAdmin(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

exports.isAdmin = isAdmin;

var isShopper = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res, next) {
    var user, roles, i;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return _Users["default"].findById(req.userId);

          case 3:
            user = _context3.sent;
            _context3.next = 6;
            return _Roles["default"].find({
              _id: {
                $in: user.roles
              }
            });

          case 6:
            roles = _context3.sent;
            i = 0;

          case 8:
            if (!(i < roles.length)) {
              _context3.next = 16;
              break;
            }

            if (!(roles[i].name === 'shopper')) {
              _context3.next = 12;
              break;
            }

            next();
            return _context3.abrupt("return");

          case 12:
            res.status(403).json({
              message: 'Require Shopper Role'
            });

          case 13:
            i++;
            _context3.next = 8;
            break;

          case 16:
            _context3.next = 22;
            break;

          case 18:
            _context3.prev = 18;
            _context3.t0 = _context3["catch"](0);
            console.error(_context3.t0.message);
            res.status(403).json({
              message: _context3.t0.message
            });

          case 22:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 18]]);
  }));

  return function isShopper(_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();

exports.isShopper = isShopper;