'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadCuratedPosts = exports.loadEditorials = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _action_types = require('../constants/action_types');

var _mapping_types = require('../constants/mapping_types');

var _api = require('../networking/api');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var loadEditorials = exports.loadEditorials = function loadEditorials(isPreview) {
  return {
    type: _action_types.LOAD_STREAM,
    payload: { endpoint: (0, _api.editorials)(isPreview) },
    meta: {
      mappingType: _mapping_types.EDITORIALS,
      renderStream: {
        asList: _api.STREAM_RENDERABLES.editorials,
        asGrid: _api.STREAM_RENDERABLES.editorials
      }
    }
  };
};

var loadCuratedPosts = function loadCuratedPosts(_ref) {
  var endpointPath = _ref.endpointPath,
      resultKey = _ref.resultKey,
      props = _objectWithoutProperties(_ref, ['endpointPath', 'resultKey']);

  var ErrorStateEditorial = _api.ERROR_RENDERABLES.ErrorStateEditorial;
  var ZeroStateEditorial = _api.ZERO_RENDERABLES.ZeroStateEditorial;

  return {
    type: _action_types.LOAD_STREAM,
    payload: { endpoint: { path: endpointPath } },
    meta: {
      mappingType: _mapping_types.POSTS,
      renderProps: _extends({}, props),
      renderStream: {
        asList: _api.STREAM_RENDERABLES.postsAsCuratedEditorial,
        asGrid: _api.STREAM_RENDERABLES.postsAsCuratedEditorial,
        asZero: _react2.default.createElement(ZeroStateEditorial, null),
        asError: _react2.default.createElement(ErrorStateEditorial, null)
      },
      resultKey: resultKey
    }
  };
};
exports.loadCuratedPosts = loadCuratedPosts;