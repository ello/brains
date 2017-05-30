'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _reactRouterRedux = require('react-router-redux');

var _action_types = require('../constants/action_types');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var initialState = _immutable2.default.Map({
  classList: null,
  component: null,
  isActive: false,
  kind: 'Modal',
  type: null
});

exports.default = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  switch (action.type) {
    case _action_types.ALERT.OPEN:
    case _action_types.ALERT.CLOSE:
    case _action_types.MODAL.OPEN:
    case _action_types.MODAL.CLOSE:
      return state.merge(action.payload).set('component', action.payload.component);
    case _action_types.AUTHENTICATION.LOGOUT_SUCCESS:
    case _action_types.AUTHENTICATION.LOGOUT_FAILURE:
    case _action_types.AUTHENTICATION.REFRESH_FAILURE:
    case _action_types.PROFILE.DELETE_SUCCESS:
      return initialState;
    case _reactRouterRedux.LOCATION_CHANGE:
      if (state.get('isActive')) {
        return initialState;
      }
      return state;
    default:
      return state;
  }
};