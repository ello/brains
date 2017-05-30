'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _get = require('lodash/get');

var _get2 = _interopRequireDefault(_get);

var _action_types = require('../constants/action_types');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var should404 = false;

var initialState = _immutable2.default.Map();

exports.default = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { type: '' };

  if (action.type === _action_types.AUTHENTICATION.LOGOUT_SUCCESS || action.type === _action_types.AUTHENTICATION.LOGOUT_FAILURE || action.type === _action_types.AUTHENTICATION.REFRESH_FAILURE || action.type === _action_types.PROFILE.DELETE_SUCCESS) {
    return initialState;
  } else if (!(action.type === _action_types.POST.DETAIL_SUCCESS || action.type === _action_types.USER.DETAIL_SUCCESS || action.type === _action_types.POST.DETAIL_FAILURE || action.type === _action_types.USER.DETAIL_FAILURE) && !(action.type.indexOf('COMMENT.') === 0 && action.type.indexOf('SUCCESS') > -1) && action && action.meta && action.meta.updateResult === false) {
    return state;
  } else if (action.type.includes('POST.DETAIL_') || action.type.includes('USER.DETAIL_') || action.type.includes('LOAD_STREAM_') || action.type.includes('LOAD_NEXT_CONTENT_')) {
    switch (action.type) {
      case _action_types.POST.DETAIL_FAILURE:
      case _action_types.USER.DETAIL_FAILURE:
        if ((0, _get2.default)(action, 'error.response.status') === 404) {
          should404 = true;
        }
        break;
      case _action_types.LOAD_STREAM_FAILURE:
        {
          var path = (0, _get2.default)(action, 'payload.endpoint.path');
          if (/\/categories/.test(path)) {
            if ((0, _get2.default)(action, 'error.response.status') === 404) {
              should404 = true;
            }
          }
          break;
        }
      default:
        break;
    }
    return state.merge(action).set('should404', should404);
  }
  return state;
};