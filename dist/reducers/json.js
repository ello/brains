'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.relationshipMethods = exports.postMethods = exports.commentMethods = exports.methods = exports.json = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */


exports.emptyPagination = emptyPagination;
exports.default = json;
exports.setPath = setPath;
exports.setHasLoadedFirstStream = setHasLoadedFirstStream;

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _reactRouterRedux = require('react-router-redux');

var _constants = require('redux-persist/constants');

var _humps = require('humps');

var _get = require('lodash/get');

var _get2 = _interopRequireDefault(_get);

var _union = require('lodash/union');

var _union2 = _interopRequireDefault(_union);

var _action_types = require('../constants/action_types');

var ACTION_TYPES = _interopRequireWildcard(_action_types);

var _mapping_types = require('../constants/mapping_types');

var MAPPING_TYPES = _interopRequireWildcard(_mapping_types);

var _relationship_types = require('../constants/relationship_types');

var _json_helper = require('../helpers/json_helper');

var _comments = require('./experience_updates/comments');

var _comments2 = _interopRequireDefault(_comments);

var _posts = require('./experience_updates/posts');

var _posts2 = _interopRequireDefault(_posts);

var _relationships = require('./experience_updates/relationships');

var _relationships2 = _interopRequireDefault(_relationships);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// adding methods and accessing them from this object
// allows the unit tests to stub methods in this module
var methods = {};
var path = '/';
var hasLoadedFirstStream = false;
var dupArr = [];

var initialState = _immutable2.default.Map({
  pages: _immutable2.default.Map()
});

function emptyPagination() {
  return _immutable2.default.Map({
    totalPages: 0,
    totalPagesRemaining: 0
  });
}

methods.addNewIdsToResult = function (state, action) {
  var resultKey = (0, _get2.default)(action, 'payload.resultKey', path);
  var result = state.getIn(['pages', resultKey]);
  if (!result || !result.get('morePostIds')) {
    return state;
  }
  // if you have created a post it gets prepended to the result ids
  // when we come back with additional ids we want them to be unique
  // and in descending order, which fills in the gaps and is what union does
  // unfortunately it is not very performant to use the `toArray`
  result = result.set('ids', _immutable2.default.List((0, _union2.default)(result.get('morePostIds').toArray(), result.get('ids').toArray()))).delete('morePostIds');
  return state.setIn(['pages', resultKey], result);
};

methods.updateUserCount = function (state, userId, prop, delta) {
  var count = state.getIn([MAPPING_TYPES.USERS, userId, prop], 0);
  if (count === '∞') {
    return state;
  }
  return state.setIn([MAPPING_TYPES.USERS, userId, prop], parseInt(count, 10) + delta);
};

methods.updatePostCount = function (state, postId, prop, delta) {
  var count = state.getIn([MAPPING_TYPES.POSTS, postId, prop], 0);
  if (count === '∞') {
    return state;
  }
  return state.setIn([MAPPING_TYPES.POSTS, postId, prop], parseInt(count, 10) + delta);
};

methods.appendPageId = function (state, pageName, mappingType, id) {
  var page = state.getIn(['pages', pageName]);
  if (page) {
    var ids = page.get('ids', _immutable2.default.List());
    if (!ids.includes('' + id)) {
      return state.setIn(['pages', pageName, 'ids'], ids.unshift('' + id));
    }
  }
  return state.setIn(['pages', pageName], _immutable2.default.fromJS({
    ids: ['' + id], type: mappingType, pagination: emptyPagination()
  }));
};

methods.removePageId = function (state, pageName, id) {
  var existingIds = state.getIn(['pages', pageName, 'ids']);
  if (existingIds) {
    var index = existingIds.indexOf('' + id);
    if (index !== -1) {
      existingIds = existingIds.splice(index, 1);
      return state.setIn(['pages', pageName, 'ids'], existingIds);
    }
  }
  return state;
};

methods.mergeModel = function (state, type, params) {
  if (params.id) {
    // make the model's id a string for later comparisons
    // the API sent them back as a number at one point
    params.id = '' + params.id;
    return state.setIn([type, params.id], state.getIn([type, params.id], _immutable2.default.Map()).mergeDeep(params));
  }
  return state;
};

methods.addModels = function (state, type, data) {
  // add state['modelType']
  var camelType = (0, _humps.camelize)(type);
  var ids = _immutable2.default.List();
  if (camelType === MAPPING_TYPES.CATEGORIES || camelType === MAPPING_TYPES.PAGE_PROMOTIONALS) {
    data[camelType].forEach(function (item) {
      var id = '' + item.id;
      state = state.setIn([camelType, id], state.getIn([camelType, id], _immutable2.default.Map()).mergeDeep(item));
      ids = ids.push(id);
    });
  } else if (data[camelType] && data[camelType].length) {
    // add arrays of models to state['modelType']['id']
    data[camelType].forEach(function (model) {
      state = methods.mergeModel(state, camelType, model);
      ids = ids.push('' + model.id);
    });
  } else if (data[camelType] && _typeof(data[camelType]) === 'object') {
    // add single model objects to state['modelType']['id']
    var model = data[camelType];
    state = methods.mergeModel(state, camelType, model);
    ids = ids.push('' + model.id);
  }
  return { ids: ids, state: state };
};

// parses the 'linked' node of the JSON
// api responses into the json store
methods.parseLinked = function (linked, state) {
  if (!linked) {
    return state;
  }
  Object.keys(linked).forEach(function (linkedType) {
    state = methods.addModels(state, linkedType, linked).state;
  });
  return state;
};

// parse main part of request into the state and
// pull out the ids as this is the main payload
methods.getResult = function (response, state, action) {
  var _action$meta = action.meta,
      mappingType = _action$meta.mappingType,
      resultFilter = _action$meta.resultFilter;

  var _methods$addModels = methods.addModels(state, mappingType, response),
      ids = _methods$addModels.ids,
      newState = _methods$addModels.state;
  // set the result to the resultFilter if it exists


  var result = typeof resultFilter === 'function' ? resultFilter(response[mappingType]) : { type: mappingType, ids: ids };
  result.pagination = action.payload.pagination;
  return { newState: newState, result: _immutable2.default.fromJS(result) };
};

methods.getCurrentUser = function (state) {
  return state.get(MAPPING_TYPES.USERS).find(function (user) {
    return user.get('relationshipPriority') === _relationship_types.RELATIONSHIP_PRIORITY.SELF;
  });
};

methods.findPostFromIdOrToken = function (state, postIdOrToken) {
  return state.getIn([MAPPING_TYPES.POSTS, postIdOrToken], (0, _json_helper.findModel)(state, {
    collection: MAPPING_TYPES.POSTS,
    findObj: { token: postIdOrToken }
  }));
};

// This method updates comment postIds to be the id of the post that was
// requesting the comments. This is due to the fact that a comment can get
// added to the original post, a repost of it, or a repost of a repost of it.
// This way the comment will always have a post that we have loaded client
// side to reference from.
methods.addParentPostIdToComments = function (response, state, action) {
  var mappingType = (0, _get2.default)(action, 'meta.mappingType');
  if (mappingType !== MAPPING_TYPES.COMMENTS) {
    return response;
  }
  var postIdOrToken = action.payload.postIdOrToken;

  if (postIdOrToken) {
    var post = methods.findPostFromIdOrToken(state, postIdOrToken);
    if (post) {
      var newResponse = _extends({}, response);
      newResponse[mappingType] = response[mappingType].map(function (model) {
        // need this to determine if a user can
        // delete comments on their own repost
        model.originalPostId = model.postId;
        model.postId = post.get('id');
        return model;
      });
      return newResponse;
    }
  }
  return response;
};

methods.setLayoutMode = function (action, state) {
  var result = state.getIn(['pages', path]);
  if (!result || result.get('mode') === action.payload.mode) {
    return state;
  }
  return state.setIn(['pages', path, 'mode'], action.payload.mode);
};

methods.pagesKey = function (action) {
  return (0, _get2.default)(action, 'meta.resultKey', (0, _get2.default)(action, 'payload.pathname', path));
};

function removeDuplicates(value) {
  if (dupArr.includes(value)) {
    return false;
  }
  dupArr.push(value);
  return true;
}

// look at json_test to see more documentation for what happens in here
methods.updateResult = function (response, state, action) {
  var _methods$getResult = methods.getResult(response, state, action),
      newState = _methods$getResult.newState,
      result = _methods$getResult.result;

  state = newState;
  var resultPath = methods.pagesKey(action);
  var existingResult = state.getIn(['pages', resultPath]);
  if (existingResult) {
    if (action.type === ACTION_TYPES.LOAD_NEXT_CONTENT_SUCCESS) {
      dupArr = [];
      return state.setIn(['pages', resultPath], result.set('ids', existingResult.get('ids', _immutable2.default.List()).concat(result.get('ids')).filter(removeDuplicates)));
    } else if (existingResult.get('ids').isSuperset(result.get('ids'))) {
      return state;
    } else if (!existingResult.get('ids').includes(result.get('ids').last()) && existingResult.get('morePostIds', _immutable2.default.List()).isEmpty() || !existingResult.get('morePostIds', _immutable2.default.List()).isEmpty() && !existingResult.get('morePostIds').includes(result.get('ids').last())) {
      return state.setIn(['pages', resultPath], result);
    } else if (hasLoadedFirstStream && !(0, _get2.default)(action, 'meta.mergeResults')) {
      if (!existingResult.get('morePostIds', _immutable2.default.List()).isEmpty()) {
        dupArr = [];
        return state.setIn(['pages', resultPath, 'morePostIds'], _immutable2.default.List((0, _union2.default)(result.get('ids').toArray(), existingResult.get('morePostIds').toArray())).filter(removeDuplicates));
      } else if (existingResult.get('ids').first() !== result.get('ids').first()) {
        return state.setIn(['pages', resultPath, 'morePostIds'], result.get('ids'));
      }
    } else {
      return state.setIn(['pages', resultPath], existingResult.set('ids', _immutable2.default.List((0, _union2.default)(result.get('ids').toArray(), existingResult.get('ids').toArray()))).delete('morePostIds'));
    }
  }
  return state.setIn(['pages', resultPath], result);
};

methods.deleteModel = function (state, action, mappingType) {
  var model = action.payload.model;

  switch (action.type) {
    case ACTION_TYPES.COMMENT.DELETE_SUCCESS:
      state = _comments2.default.addOrUpdateComment(state, _extends({}, action, { payload: _extends({}, action.payload, { postId: model.get('postId') }) }));
      break;
    case ACTION_TYPES.POST.DELETE_SUCCESS:
      state = _posts2.default.addOrUpdatePost(state, action);
      break;
    default:
      break;
  }
  var deletedType = state.get('deleted_' + mappingType, _immutable2.default.List());
  if (action.type.includes('_REQUEST') || action.type.includes('_SUCCESS')) {
    if (!deletedType.includes('' + model.get('id'))) {
      return state.set('deleted_' + mappingType, deletedType.push('' + model.get('id')));
    }
  } else if (action.type.includes('_FAILURE')) {
    // TODO: pop an alert or modal saying 'something went wrong'
    // and we couldn't delete this model?
    return state.setIn([mappingType, model.get('id')], model).set('deleted_' + mappingType, deletedType.splice(deletedType.indexOf('' + model.get('id')), 1));
  }
  return state;
};

methods.updateCurrentUser = function (state, action) {
  var response = action.payload.response;

  var curUser = state.getIn([MAPPING_TYPES.USERS, '' + response[MAPPING_TYPES.USERS].id]);
  var newUser = curUser ? curUser.mergeDeep(response[MAPPING_TYPES.USERS]) : _immutable2.default.fromJS(response[MAPPING_TYPES.USERS]);
  var tmpAvatar = curUser && curUser.getIn(['avatar', 'tmp']);
  var tmpCoverImage = curUser && curUser.getIn(['coverImage', 'tmp']);
  if (tmpAvatar) {
    newUser.setIn(['avatar', 'tmp'], tmpAvatar);
  }
  if (tmpCoverImage) {
    newUser.setIn(['coverImage', 'tmp'], tmpCoverImage);
  }
  return state.setIn([MAPPING_TYPES.USERS, '' + response[MAPPING_TYPES.USERS].id], newUser);
};

methods.updateCurrentUserTmpAsset = function (state, action) {
  var assetType = action.type === ACTION_TYPES.PROFILE.TMP_AVATAR_CREATED ? 'avatar' : 'coverImage';
  var currentUser = methods.getCurrentUser(state);
  return state.setIn([MAPPING_TYPES.USERS, currentUser.get('id')], currentUser.set(assetType, currentUser.get(assetType).mergeDeep(action.payload)));
};

methods.updatePostDetail = function (state, action) {
  var post = action.payload.response.posts;
  state = methods.parseLinked(action.payload.response.linked, state);
  state = methods.addModels(state, action.meta.mappingType, action.payload.response).state;
  return methods.mergeModel(state, action.meta.mappingType, {
    id: post.id,
    showLovers: parseInt(post.lovesCount, 10) > 0,
    showReposters: parseInt(post.repostsCount, 10) > 0
  });
};

methods.markAnnouncementRead = function (state) {
  return state.delete('announcements');
};

function json() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { type: '' };

  // whitelist actions
  switch (action.type) {
    case ACTION_TYPES.ADD_NEW_IDS_TO_RESULT:
      return methods.addNewIdsToResult(state, action);
    case ACTION_TYPES.AUTHENTICATION.LOGOUT_SUCCESS:
    case ACTION_TYPES.AUTHENTICATION.LOGOUT_FAILURE:
    case ACTION_TYPES.AUTHENTICATION.REFRESH_FAILURE:
    case ACTION_TYPES.PROFILE.DELETE_SUCCESS:
      return initialState;
    case ACTION_TYPES.CLEAR_PAGE_RESULT:
      return state.deleteIn(['pages', action.payload.resultKey]);
    case ACTION_TYPES.COMMENT.CREATE_FAILURE:
    case ACTION_TYPES.COMMENT.CREATE_REQUEST:
    case ACTION_TYPES.COMMENT.CREATE_SUCCESS:
    case ACTION_TYPES.COMMENT.UPDATE_SUCCESS:
      state = methods.parseLinked((0, _get2.default)(action, 'payload.response.linked'), state);
      return _comments2.default.addOrUpdateComment(state, action);
    case ACTION_TYPES.COMMENT.DELETE_REQUEST:
    case ACTION_TYPES.COMMENT.DELETE_SUCCESS:
    case ACTION_TYPES.COMMENT.DELETE_FAILURE:
      return methods.deleteModel(state, action, MAPPING_TYPES.COMMENTS);
    case ACTION_TYPES.COMMENT.TOGGLE_EDITING:
      return _comments2.default.toggleEditing(state, action);
    case ACTION_TYPES.COMMENT.EDITABLE_SUCCESS:
    case ACTION_TYPES.LOAD_NEXT_CONTENT_SUCCESS:
    case ACTION_TYPES.LOAD_STREAM_SUCCESS:
    case ACTION_TYPES.POST.EDITABLE_SUCCESS:
    case ACTION_TYPES.USER.DETAIL_SUCCESS:
      // fall through to parse the rest
      break;
    case ACTION_TYPES.NOTIFICATIONS.MARK_ANNOUNCEMENT_READ_REQUEST:
      return methods.markAnnouncementRead(state);
    case ACTION_TYPES.POST.CREATE_FAILURE:
    case ACTION_TYPES.POST.CREATE_SUCCESS:
    case ACTION_TYPES.POST.UPDATE_SUCCESS:
      state = methods.parseLinked((0, _get2.default)(action, 'payload.response.linked'), state);
      return _posts2.default.addOrUpdatePost(state, action);
    case ACTION_TYPES.POST.DELETE_REQUEST:
    case ACTION_TYPES.POST.DELETE_SUCCESS:
    case ACTION_TYPES.POST.DELETE_FAILURE:
      return methods.deleteModel(state, action, MAPPING_TYPES.POSTS);
    case ACTION_TYPES.POST.DETAIL_SUCCESS:
      return methods.updatePostDetail(state, action);
    case ACTION_TYPES.POST.LOVE_REQUEST:
    case ACTION_TYPES.POST.LOVE_SUCCESS:
    case ACTION_TYPES.POST.LOVE_FAILURE:
      return _posts2.default.updatePostLoves(state, action);
    case ACTION_TYPES.POST.WATCH_REQUEST:
    case ACTION_TYPES.POST.WATCH_SUCCESS:
    case ACTION_TYPES.POST.WATCH_FAILURE:
      return _posts2.default.updatePostWatch(state, action);
    case ACTION_TYPES.POST.TOGGLE_COMMENTS:
      return _posts2.default.toggleComments(state, action);
    case ACTION_TYPES.POST.TOGGLE_EDITING:
      return _posts2.default.toggleEditing(state, action);
    case ACTION_TYPES.POST.TOGGLE_REPOSTING:
      return _posts2.default.toggleReposting(state, action);
    case ACTION_TYPES.PROFILE.LOAD_SUCCESS:
    case ACTION_TYPES.PROFILE.SAVE_AVATAR_SUCCESS:
    case ACTION_TYPES.PROFILE.SAVE_COVER_SUCCESS:
    case ACTION_TYPES.PROFILE.SAVE_SUCCESS:
      state = methods.parseLinked((0, _get2.default)(action, 'payload.response.linked'), state);
      return methods.updateCurrentUser(state, action);
    case ACTION_TYPES.PROFILE.TMP_AVATAR_CREATED:
    case ACTION_TYPES.PROFILE.TMP_COVER_CREATED:
      return methods.updateCurrentUserTmpAsset(state, action);
    case ACTION_TYPES.RELATIONSHIPS.BATCH_UPDATE_INTERNAL:
      return _relationships2.default.batchUpdateRelationship(state, action);
    case ACTION_TYPES.RELATIONSHIPS.UPDATE_INTERNAL:
    case ACTION_TYPES.RELATIONSHIPS.UPDATE_REQUEST:
    case ACTION_TYPES.RELATIONSHIPS.UPDATE_SUCCESS:
      return _relationships2.default.updateRelationship(state, action);
    case ACTION_TYPES.UPDATE_STATE_FROM_NATIVE:
      {
        if (!action.payload.json.isEmpty()) {
          return action.payload.json;
        }
        return state;
      }
    case _constants.REHYDRATE:
      {
        // if we start with an initial state we are iso
        // rendering and we should keep it to display the page
        if (typeof window !== 'undefined' && window.__INITIAL_STATE__) {
          return state;
        }
        // only keep the items that have been deleted
        // so we can still filter them out if needed
        var keepers = initialState;
        if (action.payload.json) {
          action.payload.json.keySeq().forEach(function (collection) {
            if (/deleted_/.test(collection)) {
              keepers = keepers.set(collection, action.payload.json.get(collection));
            }
          });
        }
        if (action.payload.profile) {
          var curUser = action.payload.profile;
          if (curUser) {
            curUser = curUser.deleteIn(['avatar', 'tmp']).deleteIn(['coverImage', 'tmp']);
            keepers = keepers.setIn([MAPPING_TYPES.USERS, curUser.get('id')], curUser);
          }
        }
        return keepers;
      }
    case _reactRouterRedux.LOCATION_CHANGE:
      path = action.payload.pathname;
      return state;
    default:
      return state;
  }
  var response = action.payload.response;
  // Announcement notifications dismissed from another tab/device/browser send an empty response

  if (!response && (0, _get2.default)(action, ['meta', 'mappingType'], null) === MAPPING_TYPES.ANNOUNCEMENTS) {
    return methods.markAnnouncementRead(state, action);
  }
  if (!response) {
    return state;
  }
  // parse the linked part of the response into the state
  state = methods.parseLinked(response.linked, state);
  // parse main part of response into the state
  // and update the paging information
  // unless updateResult is false which is used for
  // user details when you want the result to be for
  // posts/following/followers/loves
  var mappingType = (0, _get2.default)(action, 'meta.mappingType');
  if (mappingType && action.meta.updateResult === false) {
    state = methods.addModels(state, mappingType, response).state;
  } else {
    if (mappingType === MAPPING_TYPES.COMMENTS) {
      response = methods.addParentPostIdToComments(response, state, action);
    } else if (mappingType === MAPPING_TYPES.BADGES && response[MAPPING_TYPES.BADGES]) {
      state = state.setIn([MAPPING_TYPES.BADGES], _immutable2.default.fromJS(response[MAPPING_TYPES.BADGES]));
    }
    state = methods.updateResult(response, state, action);
  }
  hasLoadedFirstStream = true;
  return state;
}

// only used for testing where results get stored
function setPath(newPath) {
  path = newPath;
}
function setHasLoadedFirstStream(bool) {
  hasLoadedFirstStream = bool;
}

exports.json = json;
exports.methods = methods;
exports.commentMethods = _comments2.default;
exports.postMethods = _posts2.default;
exports.relationshipMethods = _relationships2.default;