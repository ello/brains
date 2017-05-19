'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _action_types = require('../../constants/action_types');

var ACTION_TYPES = _interopRequireWildcard(_action_types);

var _mapping_types = require('../../constants/mapping_types');

var MAPPING_TYPES = _interopRequireWildcard(_mapping_types);

var _json = require('../../reducers/json');

var jsonReducer = _interopRequireWildcard(_json);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-param-reassign */
var methods = {};

methods.updatePostLoves = function (state, action) {
  var _action$payload = action.payload,
      method = _action$payload.method,
      model = _action$payload.model;


  var newPost = {
    id: model ? model.get('id') : ''
  };

  var delta = 0;
  var idAdded = false;
  switch (action.type) {
    case ACTION_TYPES.POST.LOVE_REQUEST:
      if (method === 'POST') {
        delta = 1;
        newPost.loved = true;
      } else {
        delta = -1;
        newPost.loved = false;
      }
      break;
    case ACTION_TYPES.POST.LOVE_SUCCESS:
      if (method === 'POST') {
        newPost.showLovers = true;
        idAdded = true;
      } else {
        newPost.showLovers = false;
      }
      break;
    case ACTION_TYPES.POST.LOVE_FAILURE:
      if (method === 'POST') {
        delta = -1;
        newPost.loved = false;
      } else {
        delta = 1;
        newPost.loved = true;
        idAdded = true;
      }
      break;
    default:
      return state;
  }

  // since we pull `model` out of payload, not state, we don't want to set
  // or update the lovesCount during a LOVE_SUCCESS.
  //
  // During LOVE_REQUEST, model.lovesCount is incremented.
  // In LOVE_SUCCESS, model.lovesCount is the *old* value, so just ignore it.
  if (delta !== 0) {
    newPost.lovesCount = Number(model.get('lovesCount')) + delta;
  }

  var resultPath = jsonReducer.methods.pagesKey(action);
  var currentUser = jsonReducer.methods.getCurrentUser(state);
  if (currentUser) {
    state = idAdded ? jsonReducer.methods.appendPageId(state, resultPath, MAPPING_TYPES.USERS, currentUser.get('id')) : jsonReducer.methods.removePageId(state, resultPath, currentUser.get('id'));
  }

  if (currentUser.get('id') === model.get('authorId')) {
    state = jsonReducer.methods.updateUserCount(state, model.get('authorId'), 'lovesCount', delta);
  }
  return jsonReducer.methods.mergeModel(state, MAPPING_TYPES.POSTS, newPost);
};

methods.updatePostWatch = function (state, action) {
  var _action$payload2 = action.payload,
      method = _action$payload2.method,
      model = _action$payload2.model,
      hasAutoWatchEnabled = _action$payload2.hasAutoWatchEnabled;

  var isWatching = false;

  if (method === 'POST') {
    isWatching = action.type === ACTION_TYPES.POST.WATCH_SUCCESS ? true : hasAutoWatchEnabled;
  }

  var newPost = {
    id: model ? model.get('id') : '',
    watching: isWatching
  };
  if (action.type === ACTION_TYPES.POST.WATCH_FAILURE) {
    newPost.watching = !method === 'POST';
  }
  return jsonReducer.methods.mergeModel(state, MAPPING_TYPES.POSTS, newPost);
};

methods.addOrUpdatePost = function (state, action) {
  var _action$payload3 = action.payload,
      model = _action$payload3.model,
      response = _action$payload3.response;

  var user = model ? state.getIn([MAPPING_TYPES.USERS, model.get('authorId')]) : jsonReducer.methods.getCurrentUser(state);
  switch (action.type) {
    case ACTION_TYPES.POST.CREATE_SUCCESS:
    case ACTION_TYPES.POST.UPDATE_SUCCESS:
      state = state.setIn([MAPPING_TYPES.POSTS, response[MAPPING_TYPES.POSTS].id], _immutable2.default.fromJS(response[MAPPING_TYPES.POSTS]));
      if (action.type === ACTION_TYPES.POST.UPDATE_SUCCESS) {
        return state;
      }
      state = jsonReducer.methods.appendPageId(state, '/following', MAPPING_TYPES.POSTS, response[MAPPING_TYPES.POSTS].id);

      if (action.meta.repostId) {
        state = jsonReducer.methods.updatePostCount(state, action.meta.repostId, 'repostsCount', 1);
        state = jsonReducer.methods.appendPageId(state, '/posts/' + action.meta.repostId + '/repost', MAPPING_TYPES.USERS, user.get('id'));
        state = jsonReducer.methods.mergeModel(state, MAPPING_TYPES.POSTS, { id: action.meta.repostId, reposted: true, showReposters: true });
      }
      if (action.meta.repostedFromId) {
        state = jsonReducer.methods.updatePostCount(state, action.meta.repostedFromId, 'repostsCount', 1);
        state = jsonReducer.methods.appendPageId(state, '/posts/' + action.meta.repostedFromId + '/repost', MAPPING_TYPES.USERS, user.get('id'));
        state = jsonReducer.methods.mergeModel(state, MAPPING_TYPES.POSTS, { id: action.meta.repostedFromId, reposted: true });
      }
      if (user) {
        state = jsonReducer.methods.updateUserCount(state, user.get('id'), 'postsCount', 1);
        state = jsonReducer.methods.appendPageId(state, '/' + user.get('username'), MAPPING_TYPES.POSTS, response[MAPPING_TYPES.POSTS].id);
      }
      return state;
    case ACTION_TYPES.POST.DELETE_SUCCESS:
      if (user) {
        state = jsonReducer.methods.removePageId(state, '/following', model.get('id'));
        state = jsonReducer.methods.removePageId(state, '/' + user.get('username'), model.get('id'));
        state = jsonReducer.methods.updateUserCount(state, user.get('id'), 'postsCount', -1);
      }
      return state;
    case ACTION_TYPES.POST.CREATE_FAILURE:
      if (user) {
        state = jsonReducer.methods.updateUserCount(state, user.get('id'), 'postsCount', -1);
      }
      return state;
    default:
      return state;
  }
};

methods.toggleComments = function (state, action) {
  var _action$payload4 = action.payload,
      model = _action$payload4.model,
      showComments = _action$payload4.showComments;

  return state.setIn([MAPPING_TYPES.POSTS, model.get('id'), 'showComments'], showComments);
};

methods.toggleEditing = function (state, action) {
  var _action$payload5 = action.payload,
      model = _action$payload5.model,
      isEditing = _action$payload5.isEditing;

  return state.setIn([MAPPING_TYPES.POSTS, model.get('id'), 'isEditing'], isEditing);
};

methods.toggleReposting = function (state, action) {
  var _action$payload6 = action.payload,
      model = _action$payload6.model,
      isReposting = _action$payload6.isReposting;

  return state.setIn([MAPPING_TYPES.POSTS, model.get('id'), 'isReposting'], isReposting);
};

exports.default = methods;