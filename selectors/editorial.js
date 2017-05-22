'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectEditorialAnalyticsOptions = exports.selectEditorialUrl = exports.selectEditorialPostStreamHref = exports.selectEditorialPostId = exports.selectEditorialKind = exports.selectEditorialImageSource = exports.selectEditorial = exports.selectEditorials = exports.selectPropsEditorialId = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _immutable = require('immutable');

var _reselect = require('reselect');

var _get = require('lodash/get');

var _get2 = _interopRequireDefault(_get);

var _mapping_types = require('../constants/mapping_types');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import type { EditorialProps } from '../types/flowtypes'

var selectPropsSize = function selectPropsSize(state, props) {
  return (0, _get2.default)(props, 'size', '1x1');
};

var selectPropsPosition = function selectPropsPosition(state, props) {
  return (0, _get2.default)(props, 'position');
};

var selectPropsEditorialId = exports.selectPropsEditorialId = function selectPropsEditorialId(state, props) {
  return (0, _get2.default)(props, 'editorialId') || (0, _get2.default)(props, 'editorial', (0, _immutable.Map)()).get('id');
};

var selectEditorials = exports.selectEditorials = function selectEditorials(state) {
  return state.json.get(_mapping_types.EDITORIALS, (0, _immutable.Map)());
};

// Memoized selectors

// Requires `editorialId` or `editorial` to be found in props
var selectEditorial = exports.selectEditorial = (0, _reselect.createSelector)([selectPropsEditorialId, selectEditorials], function (editorialId, editorials) {
  return editorials.get(editorialId, (0, _immutable.Map)());
});

var selectEditorialImageSource = exports.selectEditorialImageSource = (0, _reselect.createSelector)([selectEditorial, selectPropsSize], function (editorial, size) {
  switch (size) {
    case '2x2':
      return editorial.get('twoByTwoImage', (0, _immutable.Map)());
    case '2x1':
      return editorial.get('twoByOneImage', (0, _immutable.Map)());
    case '1x2':
      return editorial.get('oneByTwoImage', (0, _immutable.Map)());
    case '1x1':
      return editorial.get('oneByOneImage', (0, _immutable.Map)());
    default:
      return editorial.get('oneByOneImage', (0, _immutable.Map)());
  }
});

var selectEditorialKind = exports.selectEditorialKind = (0, _reselect.createSelector)([selectEditorial], function (editorial) {
  return editorial.get('kind');
});

var selectEditorialPostId = exports.selectEditorialPostId = (0, _reselect.createSelector)([selectEditorial], function (editorial) {
  return editorial.getIn(['links', 'post', 'id']);
});

var selectEditorialPostStreamHref = exports.selectEditorialPostStreamHref = (0, _reselect.createSelector)([selectEditorial], function (editorial) {
  return editorial.getIn(['links', 'postStream', 'href']);
});

var selectEditorialUrl = exports.selectEditorialUrl = (0, _reselect.createSelector)([selectEditorial], function (editorial) {
  return editorial.get('url');
});

// Derived
var selectEditorialAnalyticsOptions = exports.selectEditorialAnalyticsOptions = (0, _reselect.createSelector)([selectEditorialKind, selectEditorialPostId, selectPropsPosition, selectPropsSize], function (kind, postId, position, size) {
  return _extends({
    kind: kind
  }, postId ? { postId: postId } : {}, {
    parent: 'editorial',
    position: position,
    size: size
  });
});