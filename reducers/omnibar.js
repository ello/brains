'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _action_types = require('../constants/action_types');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var initialState = _immutable2.default.Map({
  classList: null,
  isActive: false
});

exports.default = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  switch (action.type) {
    case _action_types.AUTHENTICATION.LOGOUT_SUCCESS:
    case _action_types.AUTHENTICATION.LOGOUT_FAILURE:
    case _action_types.AUTHENTICATION.REFRESH_FAILURE:
    case _action_types.PROFILE.DELETE_SUCCESS:
      return initialState;
    case _action_types.OMNIBAR.OPEN:
    case _action_types.OMNIBAR.CLOSE:
      return state.merge(action.payload);
    default:
      return state;
  }
};