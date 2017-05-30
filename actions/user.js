'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.flagUser = flagUser;
exports.loadUserDetail = loadUserDetail;
exports.loadUserPosts = loadUserPosts;
exports.loadUserLoves = loadUserLoves;
exports.loadUserFollowing = loadUserFollowing;
exports.loadUserUsers = loadUserUsers;
exports.loadUserDrawer = loadUserDrawer;
exports.collabWithUser = collabWithUser;
exports.hireUser = hireUser;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _action_types = require('../constants/action_types');

var ACTION_TYPES = _interopRequireWildcard(_action_types);

var _mapping_types = require('../constants/mapping_types');

var MAPPING_TYPES = _interopRequireWildcard(_mapping_types);

var _api = require('../networking/api');

var api = _interopRequireWildcard(_api);

var _StreamFilters = require('../components/streams/StreamFilters');

var StreamFilters = _interopRequireWildcard(_StreamFilters);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function flagUser(username, kind) {
  return {
    type: ACTION_TYPES.USER.FLAG,
    payload: {
      endpoint: api.flagUser('~' + username, kind),
      method: 'POST'
    },
    meta: {}
  };
}

function loadUserDetail(username) {
  return {
    type: ACTION_TYPES.USER.DETAIL,
    payload: { endpoint: api.userDetail(username) },
    meta: {
      mappingType: MAPPING_TYPES.USERS,
      updateResult: false
    }
  };
}

function loadUserPosts(username, type) {
  return {
    type: ACTION_TYPES.LOAD_STREAM,
    payload: { endpoint: api.userResources(username, type) },
    meta: {
      mappingType: MAPPING_TYPES.POSTS,
      renderStream: {
        asList: api.STREAM_RENDERABLES.postsAsList,
        asGrid: api.STREAM_RENDERABLES.postsAsGrid
      }
    }
  };
}

function loadUserLoves(username, type) {
  return {
    type: ACTION_TYPES.LOAD_STREAM,
    payload: { endpoint: api.userResources(username, type) },
    meta: {
      mappingType: MAPPING_TYPES.LOVES,
      renderStream: {
        asList: api.STREAM_RENDERABLES.postsAsList,
        asGrid: api.STREAM_RENDERABLES.postsAsGrid
      },
      resultFilter: StreamFilters.postsFromLoves
    }
  };
}

function loadUserFollowing(username, priority) {
  var endpoint = api.userFollowing(username, priority);
  return {
    type: ACTION_TYPES.LOAD_STREAM,
    payload: { endpoint: endpoint },
    meta: {
      mappingType: MAPPING_TYPES.USERS,
      renderStream: {
        asList: api.STREAM_RENDERABLES.usersAsGrid,
        asGrid: api.STREAM_RENDERABLES.usersAsGrid
      },
      resultKey: '/' + username + '/following?per_page=10&priority=' + priority
    }
  };
}
function loadUserUsers(username, type) {
  return {
    type: ACTION_TYPES.LOAD_STREAM,
    payload: { endpoint: api.userResources(username, type) },
    meta: {
      mappingType: MAPPING_TYPES.USERS,
      renderStream: {
        asList: api.STREAM_RENDERABLES.usersAsGrid,
        asGrid: api.STREAM_RENDERABLES.usersAsGrid
      }
    }
  };
}

function loadUserDrawer(endpoint, postId, resultType) {
  var ErrorState = api.ERROR_RENDERABLES.ErrorState;

  return {
    type: ACTION_TYPES.LOAD_STREAM,
    payload: { endpoint: endpoint },
    meta: {
      mappingType: MAPPING_TYPES.USERS,
      mergeResults: true,
      renderStream: {
        asList: api.STREAM_RENDERABLES.usersAsGrid,
        asGrid: api.STREAM_RENDERABLES.usersAsGrid,
        asError: _react2.default.createElement(ErrorState, null)
      },
      resultKey: '/posts/' + postId + '/' + resultType,
      updateKey: '/posts/' + postId + '/'
    }
  };
}

function collabWithUser(id, message) {
  return {
    type: ACTION_TYPES.USER.COLLAB_WITH,
    payload: {
      body: { body: message },
      endpoint: api.collabWithUser(id),
      method: 'POST'
    }
  };
}

function hireUser(id, message) {
  return {
    type: ACTION_TYPES.USER.HIRE_ME,
    payload: {
      body: { body: message },
      endpoint: api.hireUser(id),
      method: 'POST'
    }
  };
}