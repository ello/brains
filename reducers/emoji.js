'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initialState = undefined;

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _action_types = require('../constants/action_types');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var initialState = exports.initialState = _immutable2.default.Map();

exports.default = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  switch (action.type) {
    case _action_types.EDITOR.EMOJI_COMPLETER_SUCCESS:
      return state.merge(_immutable2.default.fromJS(action.payload.response));
    default:
      return state;
  }
};