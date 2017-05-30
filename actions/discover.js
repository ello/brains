'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCategories = getCategories;
exports.getPagePromotionals = getPagePromotionals;
exports.loadCategoryPosts = loadCategoryPosts;
exports.loadDiscoverPosts = loadDiscoverPosts;
exports.loadCommunities = loadCommunities;
exports.loadFeaturedUsers = loadFeaturedUsers;
exports.bindDiscoverKey = bindDiscoverKey;

var _action_types = require('../constants/action_types');

var ACTION_TYPES = _interopRequireWildcard(_action_types);

var _mapping_types = require('../constants/mapping_types');

var MAPPING_TYPES = _interopRequireWildcard(_mapping_types);

var _api = require('../networking/api');

var api = _interopRequireWildcard(_api);

var _StreamFilters = require('../components/streams/StreamFilters');

var StreamFilters = _interopRequireWildcard(_StreamFilters);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function getCategories() {
  return {
    type: ACTION_TYPES.LOAD_STREAM,
    payload: { endpoint: api.categories() },
    meta: {
      mappingType: MAPPING_TYPES.CATEGORIES,
      renderStream: {
        asList: api.STREAM_RENDERABLES.categoriesAsGrid,
        asGrid: api.STREAM_RENDERABLES.categoriesAsGrid
      },
      resultFilter: StreamFilters.sortedCategories,
      resultKey: 'all-categories'
    }
  };
}

function getPagePromotionals() {
  return {
    type: ACTION_TYPES.LOAD_STREAM,
    payload: { endpoint: api.pagePromotionals() },
    meta: {
      mappingType: MAPPING_TYPES.PAGE_PROMOTIONALS,
      resultKey: '/page_promotionals'
    }
  };
}

function loadCategoryPosts(type) {
  return {
    type: ACTION_TYPES.LOAD_STREAM,
    payload: { endpoint: api.categoryPosts(type) },
    meta: {
      mappingType: MAPPING_TYPES.POSTS,
      renderStream: {
        asList: api.STREAM_RENDERABLES.postsAsList,
        asGrid: api.STREAM_RENDERABLES.postsAsGrid
      }
    }
  };
}

function loadDiscoverPosts(type) {
  return {
    type: ACTION_TYPES.LOAD_STREAM,
    payload: { endpoint: api.discoverPosts(type) },
    meta: {
      mappingType: MAPPING_TYPES.POSTS,
      renderStream: {
        asList: api.STREAM_RENDERABLES.postsAsList,
        asGrid: api.STREAM_RENDERABLES.postsAsGrid
      }
    }
  };
}

function loadCommunities() {
  return {
    type: ACTION_TYPES.LOAD_STREAM,
    payload: { endpoint: api.communitiesPath() },
    meta: {
      mappingType: MAPPING_TYPES.USERS,
      renderStream: {
        asList: api.STREAM_RENDERABLES.usersAsGrid,
        asGrid: api.STREAM_RENDERABLES.usersAsGrid
      }
    }
  };
}

function loadFeaturedUsers() {
  return {
    type: ACTION_TYPES.LOAD_STREAM,
    payload: { endpoint: api.awesomePeoplePath() },
    meta: {
      mappingType: MAPPING_TYPES.USERS,
      renderStream: {
        asList: api.STREAM_RENDERABLES.usersAsGrid,
        asGrid: api.STREAM_RENDERABLES.usersAsGrid
      }
    }
  };
}

function bindDiscoverKey(type) {
  return {
    type: ACTION_TYPES.GUI.BIND_DISCOVER_KEY,
    payload: { type: type }
  };
}