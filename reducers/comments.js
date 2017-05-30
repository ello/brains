'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _action_types = require('../constants/action_types');

var ACTION_TYPES = _interopRequireWildcard(_action_types);

var _mapping_types = require('../constants/mapping_types');

var MAPPING_TYPES = _interopRequireWildcard(_mapping_types);

var _json = require('../reducers/json');

var jsonReducer = _interopRequireWildcard(_json);

var _posts = require('./posts');

var _posts2 = _interopRequireDefault(_posts);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var methods = {}; /* eslint-disable no-param-reassign */


methods.updateCommentsCount = function (state, postId, delta) {
  var commentCount = state.getIn([MAPPING_TYPES.POSTS, postId, 'commentsCount']);
  return jsonReducer.methods.mergeModel(state, MAPPING_TYPES.POSTS, {
    id: postId,
    commentsCount: Number(commentCount) + delta
  });
};

methods.addOrUpdateComment = function (state, action) {
  var _action$payload = action.payload,
      hasAutoWatchEnabled = _action$payload.hasAutoWatchEnabled,
      model = _action$payload.model,
      postId = _action$payload.postId,
      response = _action$payload.response;

  var post = state.getIn([MAPPING_TYPES.POSTS, postId]);
  var index = null;
  switch (action.type) {
    case ACTION_TYPES.COMMENT.CREATE_REQUEST:
      if (!hasAutoWatchEnabled) {
        return state;
      }
      return _posts2.default.updatePostWatch(state, {
        payload: { method: 'POST', model: post, hasAutoWatchEnabled: hasAutoWatchEnabled }
      });
    case ACTION_TYPES.COMMENT.CREATE_SUCCESS:
    case ACTION_TYPES.COMMENT.UPDATE_SUCCESS:
      state = state.setIn([MAPPING_TYPES.COMMENTS, response[MAPPING_TYPES.COMMENTS].id], _immutable2.default.fromJS(response[MAPPING_TYPES.COMMENTS]));
      if (action.type === ACTION_TYPES.COMMENT.UPDATE_SUCCESS) {
        return state;
      }
      // update post watching prop
      if (hasAutoWatchEnabled) {
        state = _posts2.default.updatePostWatch(state, { payload: { method: 'POST', model: post }, type: ACTION_TYPES.POST.WATCH_SUCCESS });
      }
      // add the comment to the linked array
      if (!post.getIn(['links', 'comments'], _immutable2.default.List()).isEmpty()) {
        state = state.setIn([MAPPING_TYPES.POSTS, postId, 'links', 'comments', 'ids'], post.getIn(['links', 'comments', 'ids']).unshift('' + response[MAPPING_TYPES.COMMENTS].id));
      }
      state = jsonReducer.methods.appendPageId(state, '/posts/' + postId + '/comments', MAPPING_TYPES.COMMENTS, response[MAPPING_TYPES.COMMENTS].id);
      return methods.updateCommentsCount(state, postId, 1);
    case ACTION_TYPES.COMMENT.DELETE_SUCCESS:
      // delete the comment from the linked array
      if (!post.getIn(['links', 'comments'], _immutable2.default.List()).isEmpty()) {
        index = post.links.comments.ids.indexOf('' + model.get('id'));
        if (index > -1) {
          state = state.setIn([MAPPING_TYPES.POSTS, postId, 'links', 'comments', 'ids'], post.getIn(['links', 'comments', 'ids']).splice(index, 1));
        }
      }
      state = jsonReducer.methods.removePageId(state, '/posts/' + postId + '/comments', model.get('id'));
      return methods.updateCommentsCount(state, postId, -1);
    case ACTION_TYPES.COMMENT.CREATE_FAILURE:
      state = _posts2.default.updatePostWatch(state, {
        payload: { method: 'DELETE', model: post }
      });
      return methods.updateCommentsCount(state, postId, -1);
    default:
      return state;
  }
};

methods.toggleEditing = function (state, action) {
  var _action$payload2 = action.payload,
      model = _action$payload2.model,
      isEditing = _action$payload2.isEditing;

  return state.setIn([MAPPING_TYPES.COMMENTS, model.get('id'), 'isEditing'], isEditing);
};

exports.default = methods;