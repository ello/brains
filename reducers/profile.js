'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /* eslint-disable no-param-reassign */


var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _humps = require('humps');

var _jwtDecode = require('jwt-decode');

var _jwtDecode2 = _interopRequireDefault(_jwtDecode);

var _get = require('lodash/get');

var _get2 = _interopRequireDefault(_get);

var _constants = require('redux-persist/constants');

var _action_types = require('../constants/action_types');

var _file_helper = require('../helpers/file_helper');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function parseJWT(token) {
  var decoded = (0, _jwtDecode2.default)(token);
  if (decoded && decoded.data) {
    return _extends({}, (0, _humps.camelizeKeys)(decoded.data));
  }
  return {};
}

var initialState = _immutable2.default.Map({
  splits: _immutable2.default.Map(),
  uuid: (0, _file_helper.imageGuid)()
});

exports.default = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  switch (action.type) {
    case _action_types.PROFILE.AVAILABILITY_SUCCESS:
      return state.merge({
        availability: _extends({
          original: action.meta.original
        }, action.payload.response.availability)
      });
    case _action_types.PROFILE.AVAILABILITY_RESET:
      return state.set('availability', null);
    case _action_types.AUTHENTICATION.LOGOUT_SUCCESS:
    case _action_types.AUTHENTICATION.LOGOUT_FAILURE:
    case _action_types.AUTHENTICATION.REFRESH_FAILURE:
    case _action_types.PROFILE.DELETE_SUCCESS:
      // keep around the registration data so that android
      // can re-register a user if they logout and then login
      // as a different user without leaving the app
      return _immutable2.default.Map({
        buildVersion: state.get('buildVersion'),
        bundleId: state.get('bundleId'),
        marketingVersion: state.get('marketingVersion'),
        registrationId: state.get('registrationId')
      });
    case _action_types.PROFILE.EXPORT_SUCCESS:
      if (action.payload.serverStatus === 200) {
        return state.set('dataExport', action.payload.response.exportUrl);
      }
      return state.set('dataExport', null);
    case _action_types.PROFILE.LOAD_SUCCESS:
      return state.merge(_extends({}, action.payload.response.users, {
        id: '' + action.payload.response.users.id
      }));
    case _action_types.PROFILE.REQUEST_PUSH_SUBSCRIPTION:
      return state.merge(action.payload);
    case _action_types.PROFILE.SAVE_REQUEST:
      return state.set('errors', null);
    case _action_types.PROFILE.SAVE_SUCCESS:
      {
        var tmpAvatar = state && state.getIn(['avatar', 'tmp']);
        var tmpCoverImage = state && state.getIn(['coverImage', 'tmp']);
        state = state.merge(_extends({}, action.payload.response.users, {
          availability: null,
          id: '' + action.payload.response.users.id
        }));
        if (tmpAvatar) {
          state = state.setIn(['avatar', 'tmp'], tmpAvatar);
        }
        if (tmpCoverImage) {
          state = state.setIn(['coverImage', 'tmp'], tmpCoverImage);
        }
        return state;
      }
    // should only happen if we get a 422 meaning
    // the current password entered was wrong
    case _action_types.PROFILE.SAVE_FAILURE:
      return state.set('errors', (0, _get2.default)(action, 'payload.response.errors'));
    // Store a base64 reprensentation of the asset in `tmp` while uploading
    case _action_types.PROFILE.TMP_AVATAR_CREATED:
    case _action_types.PROFILE.TMP_COVER_CREATED:
      {
        var type = action.type;

        var assetType = type === _action_types.PROFILE.TMP_AVATAR_CREATED ? 'avatar' : 'coverImage';
        var key = type === _action_types.PROFILE.TMP_AVATAR_CREATED ? 'hasAvatarPresent' : 'hasCoverImagePresent';
        var obj = {};
        obj[assetType] = _extends({}, state[assetType], action.payload);
        obj[key] = key;
        return state.merge(obj);
      }
    case _action_types.UPDATE_STATE_FROM_NATIVE:
      {
        if (!action.payload.profile.isEmpty()) {
          return action.payload.profile;
        }
        return state;
      }
    case _constants.REHYDRATE:
      if (!action.payload.profile) {
        return state;
      }
      return state.merge(action.payload.profile).set('availability', null).set('dataExport', null).deleteIn(['avatar', 'tmp']).deleteIn(['coverImage', 'tmp']);
    case _action_types.PROFILE.SAVE_AVATAR_SUCCESS:
    case _action_types.PROFILE.SAVE_COVER_SUCCESS:
      {
        var avatarTmp = state.getIn(['avatar', 'tmp']);
        var avatar = avatarTmp ? _immutable2.default.fromJS(_extends({}, action.payload.response.users.avatar)).set('tmp', avatarTmp) : _immutable2.default.fromJS(action.payload.response.users.avatar);
        var coverImageTmp = state.getIn(['coverImage', 'tmp']);
        var coverImage = coverImageTmp ? _immutable2.default.fromJS(_extends({}, action.payload.response.users.coverImage)).set('tmp', coverImageTmp) : _immutable2.default.fromJS(action.payload.response.users.coverImage);
        return state.merge(action.payload.response.users).set('avatar', avatar).set('coverImage', coverImage);
      }
    case _action_types.AUTHENTICATION.USER_SUCCESS:
    case _action_types.AUTHENTICATION.REFRESH_SUCCESS:
    case _action_types.PROFILE.SIGNUP_SUCCESS:
      return state.merge(parseJWT(action.payload.response.accessToken));
    case _action_types.PROFILE.SPLIT_SUCCESS:
      return state.setIn(['splits', (0, _get2.default)(action, 'payload.name')], (0, _get2.default)(action, 'payload.response.alternative'));
    case _action_types.INVITATIONS.GET_EMAIL_SUCCESS:
      return state.set('email', (0, _get2.default)(action, 'payload.response.invitations.email'));
    default:
      return state;
  }
};