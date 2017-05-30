'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initialState = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /* eslint-disable no-param-reassign */


var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _constants = require('redux-persist/constants');

var _reactRouterRedux = require('react-router-redux');

var _action_types = require('../constants/action_types');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var initialState = exports.initialState = _immutable2.default.Map({
  accessToken: null,
  createdAt: null,
  expirationDate: null,
  expiresIn: null,
  isLoggedIn: false,
  refreshToken: null,
  tokenType: null
});

exports.default = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  var auth = void 0;
  switch (action.type) {
    case _action_types.AUTHENTICATION.CLEAR_AUTH_TOKEN:
      return state.delete('accessToken').delete('expirationDate').delete('expiresIn');
    case _action_types.AUTHENTICATION.LOGOUT_SUCCESS:
    case _action_types.AUTHENTICATION.LOGOUT_FAILURE:
    case _action_types.AUTHENTICATION.REFRESH_FAILURE:
    case _action_types.PROFILE.DELETE_SUCCESS:
      return initialState;
    case _action_types.AUTHENTICATION.USER_SUCCESS:
    case _action_types.AUTHENTICATION.REFRESH_SUCCESS:
    case _action_types.PROFILE.SIGNUP_SUCCESS:
      auth = action.payload.response;
      return state.merge(_extends({}, auth, {
        expirationDate: new Date((auth.createdAt + auth.expiresIn) * 1000),
        isLoggedIn: true
      }));
    case _reactRouterRedux.LOCATION_CHANGE:
      if (typeof window !== 'undefined' && window.nonImmutableState && window.nonImmutableState.authentication) {
        state = _immutable2.default.fromJS(JSON.parse(window.nonImmutableState.authentication));
        delete window.nonImmutableState.authentication;
        return state;
      }
      return state;
    case _action_types.UPDATE_STATE_FROM_NATIVE:
      {
        if (!action.payload.authentication.isEmpty()) {
          return action.payload.authentication;
        }
        return state;
      }
    case _constants.REHYDRATE:
      auth = action.payload.authentication;
      if (typeof window !== 'undefined' && window.nonImmutableState && window.nonImmutableState.authentication) {
        auth = _immutable2.default.fromJS(JSON.parse(window.nonImmutableState.authentication));
        delete window.nonImmutableState.authentication;
      }
      if (auth) {
        return auth.set('expirationDate', new Date((auth.get('createdAt') + auth.get('expiresIn')) * 1000));
      }
      return state;
    default:
      return state;
  }
};