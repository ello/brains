'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _action_types = require('../constants/action_types');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var initialState = _immutable2.default.Map({
  authentication: _immutable2.default.List()
});

exports.default = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  switch (action.type) {
    case _action_types.PROMOTIONS.AUTHENTICATION_SUCCESS:
      return state.set('authentication', _immutable2.default.fromJS(action.payload.response));
    default:
      return state;
  }
};