'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.openOmnibar = openOmnibar;
exports.closeOmnibar = closeOmnibar;

var _action_types = require('../constants/action_types');

function openOmnibar() {
  var classList = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  return {
    type: _action_types.OMNIBAR.OPEN,
    payload: {
      classList: classList,
      isActive: true
    }
  };
}

function closeOmnibar() {
  return {
    type: _action_types.OMNIBAR.CLOSE,
    payload: {
      classList: null,
      isActive: false
    }
  };
}