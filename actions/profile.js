'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.autoCompleteLocation = autoCompleteLocation;
exports.followCategories = followCategories;
exports.loadProfile = loadProfile;
exports.signUpUser = signUpUser;
exports.saveProfile = saveProfile;
exports.deleteProfile = deleteProfile;
exports.availableToggles = availableToggles;
exports.checkAvailability = checkAvailability;
exports.resetAvailability = resetAvailability;
exports.requestInvite = requestInvite;
exports.temporaryAssetCreated = temporaryAssetCreated;
exports.saveAvatar = saveAvatar;
exports.saveCover = saveCover;
exports.blockedUsers = blockedUsers;
exports.mutedUsers = mutedUsers;
exports.exportData = exportData;
exports.registerForGCM = registerForGCM;
exports.requestPushSubscription = requestPushSubscription;
exports.unregisterForGCM = unregisterForGCM;
exports.splitStart = splitStart;
exports.splitFinish = splitFinish;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouterRedux = require('react-router-redux');

var _mapping_types = require('../constants/mapping_types');

var MAPPING_TYPES = _interopRequireWildcard(_mapping_types);

var _action_types = require('../constants/action_types');

var _api = require('../networking/api');

var api = _interopRequireWildcard(_api);

var _StreamFilters = require('../components/streams/StreamFilters');

var StreamFilters = _interopRequireWildcard(_StreamFilters);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function autoCompleteLocation(location) {
  return {
    type: _action_types.PROFILE.LOCATION_AUTOCOMPLETE,
    payload: {
      endpoint: api.profileLocationAutocomplete(location),
      type: 'location'
    }
  };
}

function followCategories(catIds) {
  return {
    type: _action_types.PROFILE.FOLLOW_CATEGORIES,
    payload: {
      body: { followed_category_ids: catIds },
      endpoint: api.followCategories(),
      method: 'PUT'
    },
    meta: {}
  };
}

function loadProfile() {
  return {
    type: _action_types.PROFILE.LOAD,
    meta: {
      mappingType: MAPPING_TYPES.USERS,
      updateResult: false
    },
    payload: { endpoint: api.profilePath() }
  };
}

function signUpUser(email, username, password, invitationCode) {
  return {
    type: _action_types.PROFILE.SIGNUP,
    meta: {
      successAction: (0, _reactRouterRedux.replace)({ pathname: '/onboarding/categories' })
    },
    payload: {
      method: 'POST',
      endpoint: api.signupPath(),
      body: {
        email: email,
        username: username,
        password: password,
        invitation_code: invitationCode
      }
    }
  };
}

function saveProfile(params) {
  return {
    type: _action_types.PROFILE.SAVE,
    meta: {},
    payload: {
      method: 'PATCH',
      endpoint: api.profilePath(),
      body: params
    }
  };
}

function deleteProfile() {
  return {
    type: _action_types.PROFILE.DELETE,
    meta: {
      successAction: (0, _reactRouterRedux.replace)('/')
    },
    payload: {
      method: 'DELETE',
      endpoint: api.profilePath()
    }
  };
}

function availableToggles() {
  var ErrorState = api.ERROR_RENDERABLES.ErrorState;

  return {
    type: _action_types.LOAD_STREAM,
    meta: {
      mappingType: MAPPING_TYPES.SETTINGS,
      renderStream: {
        asList: api.STREAM_RENDERABLES.profileToggles,
        asGrid: api.STREAM_RENDERABLES.profileToggles,
        asError: _react2.default.createElement(ErrorState, null)
      },
      resultFilter: StreamFilters.settingsToggles,
      resultKey: '/settings',
      updateKey: '/settings'
    },
    payload: {
      endpoint: api.profileAvailableToggles()
    }
  };
}

function checkAvailability(vo) {
  return {
    type: _action_types.PROFILE.AVAILABILITY,
    meta: { original: vo },
    payload: {
      method: 'POST',
      body: vo,
      endpoint: api.availability()
    }
  };
}

function resetAvailability() {
  return {
    type: _action_types.PROFILE.AVAILABILITY_RESET,
    meta: {},
    payload: {}
  };
}

function requestInvite(email) {
  return {
    type: _action_types.PROFILE.REQUEST_INVITE,
    meta: {},
    payload: {
      method: 'POST',
      body: JSON.stringify({ email: email }),
      endpoint: api.invite()
    }
  };
}

function temporaryAssetCreated(type, objectURL) {
  return {
    type: type,
    meta: {},
    payload: { tmp: { url: objectURL } }
  };
}

// There are 2 branches here. One to Base64 encode the asset for immediate
// feedback. The other sends it off to S3 and friends.
function saveAvatar(file) {
  return {
    type: _action_types.PROFILE.SAVE_AVATAR,
    meta: {},
    payload: {
      endpoint: api.profilePath(),
      file: file
    }
  };
}

// Basically the same things as saveAvatar above
function saveCover(file) {
  return {
    type: _action_types.PROFILE.SAVE_COVER,
    meta: {},
    payload: {
      endpoint: api.profilePath(),
      file: file
    }
  };
}

function blockedUsers() {
  return {
    type: _action_types.LOAD_STREAM,
    payload: {
      endpoint: api.profileBlockedUsers()
    },
    meta: {
      defaultMode: 'list',
      mappingType: MAPPING_TYPES.USERS,
      renderStream: {
        asList: api.STREAM_RENDERABLES.usersAsCompact,
        asGrid: api.STREAM_RENDERABLES.usersAsCompact
      },
      resultFilter: StreamFilters.userResults,
      resultKey: '/settings/blocked',
      updateKey: '/profile/blocked'
    }
  };
}

function mutedUsers() {
  return {
    type: _action_types.LOAD_STREAM,
    payload: {
      endpoint: api.profileMutedUsers()
    },
    meta: {
      defaultMode: 'list',
      mappingType: MAPPING_TYPES.USERS,
      renderStream: {
        asList: api.STREAM_RENDERABLES.usersAsCompact,
        asGrid: api.STREAM_RENDERABLES.usersAsCompact
      },
      resultFilter: StreamFilters.userResults,
      resultKey: '/settings/muted',
      updateKey: '/profile/muted'
    }
  };
}

function exportData() {
  return {
    type: _action_types.PROFILE.EXPORT,
    meta: {},
    payload: {
      endpoint: api.profileExport(),
      method: 'POST'
    }
  };
}

function registerForGCM(regId, bundleId, marketingVersion, buildVersion) {
  return {
    type: _action_types.PROFILE.REGISTER_FOR_GCM,
    payload: {
      endpoint: api.registerForGCM(regId),
      method: 'POST',
      body: {
        bundle_identifier: bundleId,
        marketing_version: marketingVersion,
        build_version: buildVersion
      }
    }
  };
}

function requestPushSubscription(registrationId, bundleId, marketingVersion, buildVersion) {
  return {
    type: _action_types.PROFILE.REQUEST_PUSH_SUBSCRIPTION,
    payload: {
      registrationId: registrationId,
      bundleId: bundleId,
      marketingVersion: marketingVersion,
      buildVersion: buildVersion
    }
  };
}

function unregisterForGCM(regId, bundleId) {
  return {
    type: _action_types.PROFILE.UNREGISTER_FOR_GCM,
    payload: {
      endpoint: api.registerForGCM(regId),
      method: 'DELETE',
      body: {
        bundle_identifier: bundleId
      }
    }
  };
}

function splitStart(uuid, name, alt1, alt2) {
  return {
    type: _action_types.PROFILE.SPLIT,
    payload: {
      endpoint: api.splitStart(uuid, name, alt1, alt2),
      method: 'POST',
      name: name,
      type: 'start',
      uuid: uuid
    }
  };
}

function splitFinish(uuid, name) {
  return {
    type: _action_types.PROFILE.SPLIT,
    payload: {
      endpoint: api.splitFinish(uuid, name),
      method: 'POST',
      name: name,
      type: 'finish',
      uuid: uuid
    }
  };
}