'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectCommentCanBeDeleted = exports.selectCommentIsOwnPost = exports.selectCommentIsOwn = exports.selectCommentIsEditing = exports.selectCommentPostDetailPath = exports.selectCommentPostAuthor = exports.selectCommentPostAuthorId = exports.selectCommentPost = exports.selectCommentAuthor = exports.selectCommentRepostId = exports.selectCommentPostId = exports.selectCommentOriginalPostId = exports.selectCommentCreatedAt = exports.selectCommentContent = exports.selectCommentBody = exports.selectCommentAuthorId = exports.selectComment = exports.selectComments = exports.selectPropsCommentId = undefined;

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _reselect = require('reselect');

var _get = require('lodash/get');

var _get2 = _interopRequireDefault(_get);

var _mapping_types = require('../constants/mapping_types');

var _assets = require('../selectors/assets');

var _profile = require('../selectors/profile');

var _post = require('../selectors/post');

var _user = require('./user');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var selectPropsCommentId = exports.selectPropsCommentId = function selectPropsCommentId(state, props) {
  return (0, _get2.default)(props, 'commentId') || (0, _get2.default)(props, 'comment', _immutable2.default.Map()).get('id');
};

var selectComments = exports.selectComments = function selectComments(state) {
  return state.json.get(_mapping_types.COMMENTS, _immutable2.default.Map());
};

// Memoized selectors

// Requires `commentId` or `comment` to be found in props
var selectComment = exports.selectComment = (0, _reselect.createSelector)([selectPropsCommentId, selectComments], function (id, comments) {
  return comments.get(id, _immutable2.default.Map());
});

// Properties on the comments reducer
var selectCommentAuthorId = exports.selectCommentAuthorId = (0, _reselect.createSelector)([selectComment], function (comment) {
  return comment.get('authorId');
});
var selectCommentBody = exports.selectCommentBody = (0, _reselect.createSelector)([selectComment], function (comment) {
  return comment.get('body');
});
var selectCommentContent = exports.selectCommentContent = (0, _reselect.createSelector)([selectComment, _assets.selectAssets], function (comment, assets) {
  return comment.get('content', _immutable2.default.Map()).map(function (region) {
    return (0, _post.addAssetToRegion)(region, assets);
  });
});
var selectCommentCreatedAt = exports.selectCommentCreatedAt = (0, _reselect.createSelector)([selectComment], function (comment) {
  return comment.get('createdAt');
});
var selectCommentOriginalPostId = exports.selectCommentOriginalPostId = (0, _reselect.createSelector)([selectComment], function (comment) {
  return comment.get('originalPostId');
});
var selectCommentPostId = exports.selectCommentPostId = (0, _reselect.createSelector)([selectComment], function (comment) {
  return comment.get('postId');
});
var selectCommentRepostId = exports.selectCommentRepostId = (0, _reselect.createSelector)([selectComment], function (comment) {
  return comment.get('repostId');
});

// Derived or additive properties
var selectCommentAuthor = exports.selectCommentAuthor = (0, _reselect.createSelector)([_user.selectUsers, selectCommentAuthorId], function (users, authorId) {
  return users.get(authorId, _immutable2.default.Map());
});

var selectCommentPost = exports.selectCommentPost = (0, _reselect.createSelector)([_post.selectPosts, selectCommentPostId], function (posts, postId) {
  return posts.get(postId, _immutable2.default.Map());
});

var selectCommentPostAuthorId = exports.selectCommentPostAuthorId = (0, _reselect.createSelector)([selectCommentPost], function (post) {
  return post.get('authorId');
});

var selectCommentPostAuthor = exports.selectCommentPostAuthor = (0, _reselect.createSelector)([_user.selectUsers, selectCommentPostAuthorId], function (users, authorId) {
  return users.get(authorId, _immutable2.default.Map());
});

var selectCommentPostDetailPath = exports.selectCommentPostDetailPath = (0, _reselect.createSelector)([selectCommentPost, selectCommentPostAuthor], function (post, author) {
  return '/' + author.get('username') + '/post/' + post.get('token');
});

var selectCommentIsEditing = exports.selectCommentIsEditing = (0, _reselect.createSelector)([selectComment], function (comment) {
  return comment.get('isEditing', false);
});

var selectCommentIsOwn = exports.selectCommentIsOwn = (0, _reselect.createSelector)([selectCommentAuthorId, _profile.selectId], function (authorId, profileId) {
  return '' + authorId === '' + profileId;
});

var selectCommentIsOwnPost = exports.selectCommentIsOwnPost = (0, _reselect.createSelector)([selectCommentPostAuthorId, _profile.selectId], function (authorId, profileId) {
  return '' + authorId === '' + profileId;
});

var selectCommentCanBeDeleted = exports.selectCommentCanBeDeleted = (0, _reselect.createSelector)([selectCommentIsOwnPost, selectCommentPostId, selectCommentOriginalPostId, selectCommentRepostId], function (isOwnPost, postId, originalPostId, repostId) {
  return repostId ? isOwnPost && postId === originalPostId : isOwnPost;
});