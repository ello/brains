'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sayHello = sayHello;

var _action_types = require('../constants/action_types');

function sayHello(_ref) {
  var username = _ref.username;

  return {
    type: _action_types.ZEROS.SAY_HELLO,
    payload: { username: username }
  };
}

exports.default = sayHello;