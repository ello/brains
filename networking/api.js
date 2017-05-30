'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ZERO_RENDERABLES = exports.USE_LOCAL_EMOJI = exports.STREAM_RENDERABLES = exports.PROMO_HOST = exports.PER_PAGE = exports.getAPIPath = exports.ERROR_RENDERABLES = exports.AUTH_DOMAIN = exports.AUTH_CLIENT_ID = exports.API_VERSION = exports.API_DOMAIN = exports.setZeroRenderables = exports.setUseLocalEmoji = exports.setStreamRenderables = exports.setPromoHost = exports.setErrorRenderables = exports.setAuthDomain = exports.setAuthClientId = exports.setApiDomain = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.editorials = editorials;
exports.announcements = announcements;
exports.markAnnouncementRead = markAnnouncementRead;
exports.s3CredentialsPath = s3CredentialsPath;
exports.accessTokens = accessTokens;
exports.loginToken = loginToken;
exports.logout = logout;
exports.forgotPassword = forgotPassword;
exports.refreshAuthToken = refreshAuthToken;
exports.signupPath = signupPath;
exports.authenticationPromo = authenticationPromo;
exports.profilePath = profilePath;
exports.profileLocationAutocomplete = profileLocationAutocomplete;
exports.profileAvailableToggles = profileAvailableToggles;
exports.profileBlockedUsers = profileBlockedUsers;
exports.profileMutedUsers = profileMutedUsers;
exports.profileExport = profileExport;
exports.followCategories = followCategories;
exports.awesomePeoplePath = awesomePeoplePath;
exports.communitiesPath = communitiesPath;
exports.relationshipBatchPath = relationshipBatchPath;
exports.badges = badges;
exports.categories = categories;
exports.categoryPosts = categoryPosts;
exports.pagePromotionals = pagePromotionals;
exports.discoverPosts = discoverPosts;
exports.followingStream = followingStream;
exports.postDetail = postDetail;
exports.editPostDetail = editPostDetail;
exports.relatedPosts = relatedPosts;
exports.lovePost = lovePost;
exports.unlovePost = unlovePost;
exports.watchPost = watchPost;
exports.unwatchPost = unwatchPost;
exports.deletePost = deletePost;
exports.flagPost = flagPost;
exports.postLovers = postLovers;
exports.postReplyAll = postReplyAll;
exports.postReposters = postReposters;
exports.createPost = createPost;
exports.updatePost = updatePost;
exports.postPreviews = postPreviews;
exports.trackPostViews = trackPostViews;
exports.userAutocompleter = userAutocompleter;
exports.loadEmojis = loadEmojis;
exports.textToolsPath = textToolsPath;
exports.commentsForPost = commentsForPost;
exports.createComment = createComment;
exports.editComment = editComment;
exports.deleteComment = deleteComment;
exports.flagComment = flagComment;
exports.userDetail = userDetail;
exports.userFollowing = userFollowing;
exports.userResources = userResources;
exports.collabWithUser = collabWithUser;
exports.flagUser = flagUser;
exports.hireUser = hireUser;
exports.searchPosts = searchPosts;
exports.searchUsers = searchUsers;
exports.notifications = notifications;
exports.newNotifications = newNotifications;
exports.availability = availability;
exports.invite = invite;
exports.getInviteEmail = getInviteEmail;
exports.relationshipAdd = relationshipAdd;
exports.registerForGCM = registerForGCM;
exports.splitStart = splitStart;
exports.splitFinish = splitFinish;

var _uri_helper = require('../helpers/uri_helper');

var API_VERSION = 'v2';
var PER_PAGE = 25;
var API_DOMAIN = void 0;
var AUTH_DOMAIN = void 0;
var AUTH_CLIENT_ID = void 0;
var ERROR_RENDERABLES = void 0;
var PROMO_HOST = void 0;
var STREAM_RENDERABLES = void 0;
var USE_LOCAL_EMOJI = void 0;
var ZERO_RENDERABLES = void 0;

var setApiDomain = exports.setApiDomain = function setApiDomain(domain) {
  return exports.API_DOMAIN = API_DOMAIN = domain;
};
var setAuthClientId = exports.setAuthClientId = function setAuthClientId(id) {
  return exports.AUTH_CLIENT_ID = AUTH_CLIENT_ID = id;
};
var setAuthDomain = exports.setAuthDomain = function setAuthDomain(domain) {
  return exports.AUTH_DOMAIN = AUTH_DOMAIN = domain;
};
var setErrorRenderables = exports.setErrorRenderables = function setErrorRenderables(renderables) {
  return exports.ERROR_RENDERABLES = ERROR_RENDERABLES = renderables;
};
var setPromoHost = exports.setPromoHost = function setPromoHost(host) {
  return exports.PROMO_HOST = PROMO_HOST = host;
};
var setStreamRenderables = exports.setStreamRenderables = function setStreamRenderables(renderables) {
  return exports.STREAM_RENDERABLES = STREAM_RENDERABLES = renderables;
};
var setUseLocalEmoji = exports.setUseLocalEmoji = function setUseLocalEmoji(useLocalEmoji) {
  return exports.USE_LOCAL_EMOJI = USE_LOCAL_EMOJI = useLocalEmoji;
};
var setZeroRenderables = exports.setZeroRenderables = function setZeroRenderables(renderables) {
  return exports.ZERO_RENDERABLES = ZERO_RENDERABLES = renderables;
};

var basePath = function basePath() {
  return API_DOMAIN + '/api';
};
// TODO make the domain a static property that gets set from apps that use this

function getAPIPath(relPath) {
  var queryParams = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var path = basePath() + '/' + API_VERSION + '/' + relPath;
  var queryArr = [];
  Object.keys(queryParams).forEach(function (param) {
    queryArr.push(param + '=' + queryParams[param]);
  });
  if (queryArr.length) {
    path = path + '?' + queryArr.join('&');
  }
  return path;
}
// Editorials
function editorials(isPreview) {
  return {
    path: getAPIPath('editorials', isPreview ? { preview: true } : {})
  };
}
// Announcements
function announcements() {
  return {
    path: getAPIPath('most_recent_announcements')
  };
}
function markAnnouncementRead() {
  return {
    path: announcements().path + '/mark_last_read_announcement'
  };
}
// Assets
function s3CredentialsPath() {
  return {
    path: getAPIPath('assets/credentials')
  };
}
// Authentication
function accessTokens() {
  return {
    path: basePath() + '/oauth/token'
  };
}

function loginToken() {
  return {
    path: basePath() + '/oauth/token'
  };
}

function logout() {
  return {
    path: basePath() + '/oauth/logout'
  };
}

function forgotPassword() {
  return {
    path: getAPIPath('forgot-password')
  };
}

function refreshAuthToken(refreshToken) {
  var params = { refresh_token: refreshToken };
  return {
    path: basePath() + '/oauth/token',
    params: params
  };
}

function signupPath() {
  return {
    path: basePath() + '/v2/signup'
  };
}

function authenticationPromo() {
  return {
    path: PROMO_HOST + '/authentication.json'
  };
}

// Current User Profile
function profilePath() {
  return {
    path: getAPIPath('profile')
  };
}
function profileLocationAutocomplete(location) {
  return {
    path: getAPIPath('profile/location_autocomplete', { location: location })
  };
}
function profileAvailableToggles() {
  return {
    path: getAPIPath('profile/settings')
  };
}
function profileBlockedUsers() {
  return {
    path: getAPIPath('profile/blocked')
  };
}
function profileMutedUsers() {
  return {
    path: getAPIPath('profile/muted')
  };
}
function profileExport() {
  return {
    path: getAPIPath('profile/export')
  };
}
function followCategories() {
  return {
    path: getAPIPath('profile/followed_categories')
  };
}
// Onboarding
function awesomePeoplePath() {
  var params = { per_page: PER_PAGE };
  return {
    path: getAPIPath('discover/users/onboarding', params),
    params: params
  };
}
function communitiesPath() {
  var params = { name: 'onboarding', per_page: PER_PAGE };
  return {
    path: getAPIPath('interest_categories/members', params),
    params: params
  };
}
function relationshipBatchPath() {
  return {
    path: getAPIPath('relationships/batches')
  };
}
// Badges
function badges() {
  return {
    path: getAPIPath('badges.json')
  };
}
// Categories
function categories() {
  return {
    path: getAPIPath('categories', { meta: true })
  };
}
function categoryPosts(type) {
  var typePath = type ? '/' + type : '';
  return {
    path: getAPIPath('categories' + typePath + '/posts/recent', { per_page: PER_PAGE })
  };
}
function pagePromotionals() {
  return {
    path: getAPIPath('page_promotionals')
  };
}
// Discover
function discoverPosts(type) {
  var params = _extends({
    per_page: PER_PAGE
  }, (0, _uri_helper.getPagingQueryParams)(typeof window !== 'undefined' ? window.location.search : ''));
  return {
    path: getAPIPath('discover/posts/' + type, params),
    params: params
  };
}
// Streams
function followingStream() {
  var params = { per_page: PER_PAGE };
  return {
    path: getAPIPath('following/posts/recent', params),
    params: params
  };
}
// Posts
function postDetail(idOrToken, userIdOrToken) {
  var params = { comment_count: false, user_id: userIdOrToken };
  return {
    path: getAPIPath('posts/' + idOrToken, params)
  };
}
function editPostDetail(idOrToken) {
  var params = { comment_count: false };
  return {
    path: getAPIPath('posts/' + idOrToken, params)
  };
}
function relatedPosts(idOrToken, perPage) {
  return {
    path: getAPIPath('posts/' + idOrToken + '/related', { per_page: perPage })
  };
}
// Loves
function lovePost(idOrToken) {
  return {
    path: getAPIPath('posts/' + idOrToken + '/loves')
  };
}
function unlovePost(idOrToken) {
  return {
    path: getAPIPath('posts/' + idOrToken + '/love')
  };
}
// Watch
function watchPost(idOrToken) {
  return {
    path: getAPIPath('posts/' + idOrToken + '/watches')
  };
}
function unwatchPost(idOrToken) {
  return {
    path: getAPIPath('posts/' + idOrToken + '/watch')
  };
}
function deletePost(idOrToken) {
  return {
    path: getAPIPath('posts/' + idOrToken)
  };
}
function flagPost(idOrToken, kind) {
  return {
    path: getAPIPath('posts/' + idOrToken + '/flag/' + kind)
  };
}
function postLovers(idOrToken) {
  return {
    path: getAPIPath('posts/' + idOrToken + '/lovers', { per_page: 10 })
  };
}
function postReplyAll(idOrToken) {
  return {
    path: getAPIPath('posts/' + idOrToken + '/commenters_usernames')
  };
}
function postReposters(idOrToken) {
  return {
    path: getAPIPath('posts/' + idOrToken + '/reposters', { per_page: 10 })
  };
}
function createPost(repostId) {
  var params = {};
  if (repostId) {
    params.repost_id = repostId;
  }
  return {
    path: getAPIPath('posts', params),
    params: params
  };
}
function updatePost(idOrToken) {
  return {
    path: getAPIPath('posts/' + idOrToken)
  };
}
function postPreviews() {
  return {
    path: getAPIPath('post_previews')
  };
}

function trackPostViews(postIds, postTokens, streamKind, streamId) {
  return {
    path: getAPIPath('post_views', { post_tokens: postTokens, post_ids: postIds, kind: streamKind, id: streamId })
  };
}
function userAutocompleter(word) {
  return {
    path: getAPIPath('users/autocomplete', { terms: word.replace(/@|:/ig, ''), per_page: 10 })
  };
}
function loadEmojis() {
  if (USE_LOCAL_EMOJI) {
    return {
      path: '/static/emojis.json'
    };
  }
  return {
    path: AUTH_DOMAIN + '/emojis.json'
  };
}
// Dummy editor endpoint to use for default action on text tools form
function textToolsPath() {
  return {
    path: getAPIPath('editor-text-tools')
  };
}
// Comments
function commentsForPost(idOrToken) {
  var params = _extends({
    per_page: 10
  }, (0, _uri_helper.getPagingQueryParams)(typeof window !== 'undefined' ? window.location.search : ''));
  return {
    path: getAPIPath('posts/' + idOrToken + '/comments', params)
  };
}
function createComment(postId) {
  return {
    path: getAPIPath('posts/' + postId + '/comments')
  };
}
function editComment(comment) {
  return {
    path: getAPIPath('posts/' + comment.get('postId') + '/comments/' + comment.get('id'))
  };
}
function deleteComment(comment) {
  return {
    path: getAPIPath('posts/' + comment.get('postId') + '/comments/' + comment.get('id'))
  };
}
function flagComment(comment, kind) {
  return {
    path: getAPIPath('posts/' + comment.get('postId') + '/comments/' + comment.get('id') + '/flag/' + kind)
  };
}
// Users
function userDetail(idOrUsername) {
  var params = { post_count: false };
  return {
    path: getAPIPath('users/' + idOrUsername, params)
  };
}
function userFollowing(idOrUsername, priority) {
  var params = _extends({
    per_page: 10
  }, (0, _uri_helper.getPagingQueryParams)(typeof window !== 'undefined' ? window.location.search : ''));

  if (priority) params.priority = priority;

  return {
    path: getAPIPath('users/' + idOrUsername + '/following', params)
  };
}

function userResources(idOrUsername, resource) {
  var params = _extends({
    per_page: 10
  }, (0, _uri_helper.getPagingQueryParams)(typeof window !== 'undefined' ? window.location.search : ''));
  return {
    path: getAPIPath('users/' + idOrUsername + '/' + resource, params),
    params: params
  };
}
function collabWithUser(id) {
  return {
    path: getAPIPath('users/' + id + '/collaborate')
  };
}
function flagUser(idOrUsername, kind) {
  return {
    path: getAPIPath('users/' + idOrUsername + '/flag/' + kind)
  };
}
function hireUser(id) {
  return {
    path: getAPIPath('users/' + id + '/hire_me')
  };
}
// Search
function searchPosts(params) {
  return {
    path: getAPIPath('posts', params),
    params: params
  };
}
function searchUsers(params) {
  return {
    path: getAPIPath('users', params),
    params: params
  };
}
// Notifications
function notifications() {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var newParams = _extends({ per_page: PER_PAGE }, params);
  if (newParams.category && newParams.category === 'all') {
    delete newParams.category;
  }
  return {
    path: getAPIPath('notifications', newParams),
    newParams: newParams
  };
}
function newNotifications() {
  return {
    path: getAPIPath('notifications')
  };
}
// AVAILABILITY
function availability() {
  return {
    path: getAPIPath('availability')
  };
}
// INVITE
function invite() {
  return {
    path: getAPIPath('invitations', { per_page: 100 })
  };
}
function getInviteEmail(code) {
  return {
    path: getAPIPath('invitations/' + code)
  };
}
// RELATIONSHIPS
function relationshipAdd(userId, priority) {
  return {
    path: getAPIPath('users/' + userId + '/add/' + priority)
  };
}
// Android Push Subscriptions
function registerForGCM(regId) {
  return {
    path: getAPIPath('profile/push_subscriptions/gcm/' + regId)
  };
}
// Split a/b testing
function splitStart(uuid, name, alternative1, alternative2) {
  return {
    path: getAPIPath('split/' + name + '/start', { alternative1: alternative1, alternative2: alternative2, uuid: uuid })
  };
}
function splitFinish(uuid, name) {
  return {
    path: getAPIPath('split/' + name + '/finish', { uuid: uuid })
  };
}

exports.API_DOMAIN = API_DOMAIN;
exports.API_VERSION = API_VERSION;
exports.AUTH_CLIENT_ID = AUTH_CLIENT_ID;
exports.AUTH_DOMAIN = AUTH_DOMAIN;
exports.ERROR_RENDERABLES = ERROR_RENDERABLES;
exports.getAPIPath = getAPIPath;
exports.PER_PAGE = PER_PAGE;
exports.PROMO_HOST = PROMO_HOST;
exports.STREAM_RENDERABLES = STREAM_RENDERABLES;
exports.USE_LOCAL_EMOJI = USE_LOCAL_EMOJI;
exports.ZERO_RENDERABLES = ZERO_RENDERABLES;