"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userLogin = exports.createUser = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _Users = _interopRequireDefault(require("../models/Users"));

var _Roles = _interopRequireDefault(require("../models/Roles"));

var createUser = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var _req$body, name, username, email, password, roles, newUser, rolesFound;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _req$body = req.body, name = _req$body.name, username = _req$body.username, email = _req$body.email, password = _req$body.password, roles = _req$body.roles;
            newUser = new _Users["default"]({
              name: name,
              username: username,
              email: email,
              password: password
            });

            if (!roles) {
              _context.next = 9;
              break;
            }

            _context.next = 6;
            return _Roles["default"].find({
              name: {
                $in: roles
              }
            });

          case 6:
            rolesFound = _context.sent;
            _context.next = 12;
            break;

          case 9:
            _context.next = 11;
            return _Roles["default"].find({
              name: 'shopper'
            });

          case 11:
            rolesFound = _context.sent;

          case 12:
            newUser.roles = rolesFound.map(function (role) {
              return role._id;
            });
            _context.next = 15;
            return _Users["default"].encryptPassword(newUser.password);

          case 15:
            newUser.password = _context.sent;
            _context.next = 18;
            return newUser.save();

          case 18:
            res.status(200).json({
              message: 'User Created'
            });
            _context.next = 25;
            break;

          case 21:
            _context.prev = 21;
            _context.t0 = _context["catch"](0);
            console.error(_context.t0.message);
            res.status(500).json({
              message: _context.t0.message
            });

          case 25:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 21]]);
  }));

  return function createUser(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.createUser = createUser;

var userLogin = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var _req$body2, email, password, user, token;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;
            _context2.next = 4;
            return _Users["default"].findByCredentials(email, password);

          case 4:
            user = _context2.sent;
            token = _jsonwebtoken["default"].sign({
              id: user._id,
              roles: user.roles
            }, process.env.TOKEN_SECRET, {
              expiresIn: 86400
            });
            res.json({
              token: token
            });
            _context2.next = 13;
            break;

          case 9:
            _context2.prev = 9;
            _context2.t0 = _context2["catch"](0);
            console.error(_context2.t0.message);
            res.status(401).json({
              message: 'Unable to Login'
            });

          case 13:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 9]]);
  }));

  return function userLogin(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.userLogin = userLogin;