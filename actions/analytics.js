'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.trackEvent = trackEvent;
exports.trackInitialPage = trackInitialPage;

var _action_types = require('../constants/action_types');

function trackEvent(label) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  return {
    type: _action_types.TRACK.EVENT,
    meta: {},
    payload: {
      label: label,
      options: options
    }
  };
}

function trackInitialPage() {
  return {
    type: _action_types.TRACK.INITIAL_PAGE,
    meta: {},
    payload: {}
  };
}