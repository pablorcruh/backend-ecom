"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _mongoose = require("mongoose");

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _validator = _interopRequireDefault(require("validator"));

var usersSchema = new _mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  username: {
    type: String,
    unique: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    validate: function validate(value) {
      if (!_validator["default"].isEmail(value)) {
        throw new Error('Email is invalid');
      }
    }
  },
  password: {
    type: String,
    required: true,
    validate: function validate(value) {
      if (!_validator["default"].isLength(value, {
        min: 5
      })) {
        throw new Error('Password must be greated than 5');
      }
    }
  },
  roles: [{
    ref: 'Roles',
    type: _mongoose.Schema.Types.ObjectId
  }]
}, {
  versionKey: false,
  timestamps: true
});

usersSchema.statics.encryptPassword = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(password) {
    var salt;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _bcryptjs["default"].genSalt(10);

          case 2:
            salt = _context.sent;
            _context.next = 5;
            return _bcryptjs["default"].hash(password, salt);

          case 5:
            return _context.abrupt("return", _context.sent);

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();

usersSchema.statics.findByCredentials = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(email, password) {
    var user, isMatch;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return User.findOne({
              email: email
            }).populate('roles');

          case 2:
            user = _context2.sent;

            if (user) {
              _context2.next = 5;
              break;
            }

            throw new Error('Credentials not found');

          case 5:
            _context2.next = 7;
            return _bcryptjs["default"].compare(password, user.password);

          case 7:
            isMatch = _context2.sent;

            if (isMatch) {
              _context2.next = 10;
              break;
            }

            throw new Error('Password not valid');

          case 10:
            return _context2.abrupt("return", user);

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();

var User = (0, _mongoose.model)('User', usersSchema);
var _default = User;
exports["default"] = _default;