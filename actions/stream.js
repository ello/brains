'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadFollowing = loadFollowing;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _action_types = require('../constants/action_types');

var _mapping_types = require('../constants/mapping_types');

var _api = require('../networking/api');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function loadFollowing() {
  var ZeroFollowingStream = _api.ZERO_RENDERABLES.ZeroFollowingStream;

  return {
    type: _action_types.LOAD_STREAM,
    payload: { endpoint: (0, _api.followingStream)() },
    meta: {
      mappingType: _mapping_types.POSTS,
      renderStream: {
        asList: _api.STREAM_RENDERABLES.postsAsList,
        asGrid: _api.STREAM_RENDERABLES.postsAsGrid,
        asZero: _react2.default.createElement(ZeroFollowingStream, null)
      }
    }
  };
}

exports.default = loadFollowing;