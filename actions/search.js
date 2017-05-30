'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.searchForPosts = searchForPosts;
exports.searchForUsers = searchForUsers;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _action_types = require('../constants/action_types');

var ACTION_TYPES = _interopRequireWildcard(_action_types);

var _mapping_types = require('../constants/mapping_types');

var MAPPING_TYPES = _interopRequireWildcard(_mapping_types);

var _api = require('../networking/api');

var api = _interopRequireWildcard(_api);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function searchForPosts(terms) {
  var ZeroState = api.ZERO_RENDERABLES.ZeroState;

  return {
    type: ACTION_TYPES.LOAD_STREAM,
    payload: {
      endpoint: api.searchPosts({
        per_page: api.PER_PAGE,
        terms: encodeURIComponent(terms)
      })
    },
    meta: {
      mappingType: MAPPING_TYPES.POSTS,
      renderStream: {
        asGrid: api.STREAM_RENDERABLES.postsAsGrid,
        asList: api.STREAM_RENDERABLES.postsAsList,
        asZero: _react2.default.createElement(ZeroState, null)
      },
      resultKey: '/search/posts'
    }
  };
}

function searchForUsers(terms) {
  var ZeroState = api.ZERO_RENDERABLES.ZeroState;

  return {
    type: ACTION_TYPES.LOAD_STREAM,
    payload: {
      endpoint: api.searchUsers({
        per_page: api.PER_PAGE,
        terms: encodeURIComponent(terms)
      })
    },
    meta: {
      mappingType: MAPPING_TYPES.USERS,
      renderStream: {
        asGrid: api.STREAM_RENDERABLES.usersAsGrid,
        asList: api.STREAM_RENDERABLES.usersAsGrid,
        asZero: _react2.default.createElement(ZeroState, null)
      },
      resultKey: '/search/users'
    }
  };
}