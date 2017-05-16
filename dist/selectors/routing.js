'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectIsDiscoverRoot = exports.selectIsPostDetail = exports.selectIsOnboardingView = exports.selectIsAuthenticationView = exports.selectViewNameFromRoute = exports.selectQueryTerms = exports.selectPathname = exports.selectPreviousPath = exports.selectLocation = exports.selectPropsQueryType = exports.selectPropsQueryTerms = exports.selectPropsPathname = exports.selectPropsLocationKey = undefined;

var _reselect = require('reselect');

var _get = require('lodash/get');

var _get2 = _interopRequireDefault(_get);

var _params = require('./params');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var POST_DETAIL_EXPRESSION = /^\/[\w-]+\/post\/.+/;

var AUTHENTICATION_ROUTES = [/^\/enter\b/, /^\/forgot-password\b/, /^\/join\b/, /^\/signup\b/];

// props.routing.xxx
var selectPropsLocationKey = exports.selectPropsLocationKey = function selectPropsLocationKey(state, props) {
  return (0, _get2.default)(props, 'location.key');
};
var selectPropsPathname = exports.selectPropsPathname = function selectPropsPathname(state, props) {
  return (0, _get2.default)(props, 'location.pathname');
};
var selectPropsQueryTerms = exports.selectPropsQueryTerms = function selectPropsQueryTerms(state, props) {
  return (0, _get2.default)(props, 'location.query.terms');
};
var selectPropsQueryType = exports.selectPropsQueryType = function selectPropsQueryType(state, props) {
  return (0, _get2.default)(props, 'location.query.type');
};

// state.routing.xxx
var selectLocation = exports.selectLocation = function selectLocation(state) {
  return state.routing.get('location');
};
var selectPreviousPath = exports.selectPreviousPath = function selectPreviousPath(state) {
  return state.routing.get('previousPath');
};

// state.routing.location.xxx
var selectPathname = exports.selectPathname = function selectPathname(state) {
  return state.routing.getIn(['location', 'pathname']);
};
var selectQueryTerms = exports.selectQueryTerms = function selectQueryTerms(state) {
  return state.routing.getIn(['location', 'terms']);
};

// Memoized selectors
var selectViewNameFromRoute = exports.selectViewNameFromRoute = (0, _reselect.createSelector)([selectPathname, _params.selectParamsUsername], function (pathname, username) {
  if (/^\/following\b/.test(pathname)) {
    return 'following';
  }
  if (/^\/find\b|^\/search\b/.test(pathname)) {
    return 'search';
  }
  if (pathname === '/' || /^\/discover\b|^\/explore\b/.test(pathname)) {
    return 'discover';
  }
  if (/^\/invitations\b/.test(pathname)) {
    return 'invitations';
  }
  if (/^\/settings\b/.test(pathname)) {
    return 'settings';
  }
  if (/^\/notifications\b/.test(pathname)) {
    return 'notifications';
  }
  if (/^\/onboarding\b/.test(pathname)) {
    return 'onboarding';
  }
  if (POST_DETAIL_EXPRESSION.test(pathname)) {
    return 'postDetail';
  }
  if (AUTHENTICATION_ROUTES.some(function (route) {
    return route.test(pathname);
  })) {
    return 'authentication';
  }
  // Yo! to get 'userDetail' you have to pass in props... for now
  if (username) {
    return 'userDetail';
  }
  return 'unknown';
});

var selectIsAuthenticationView = exports.selectIsAuthenticationView = (0, _reselect.createSelector)([selectViewNameFromRoute], function (viewName) {
  return viewName === 'authentication';
});

var selectIsOnboardingView = exports.selectIsOnboardingView = (0, _reselect.createSelector)([selectViewNameFromRoute], function (viewName) {
  return viewName === 'onboarding';
});

var selectIsPostDetail = exports.selectIsPostDetail = (0, _reselect.createSelector)([selectViewNameFromRoute], function (viewName) {
  return viewName === 'postDetail';
});

var selectIsDiscoverRoot = exports.selectIsDiscoverRoot = (0, _reselect.createSelector)([selectPathname], function (pathname) {
  return (/^\/(?:discover(\/featured|\/recommended)?)?$/.test(pathname)
  );
});