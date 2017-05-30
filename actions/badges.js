'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadBadges = loadBadges;

var _action_types = require('../constants/action_types');

var _mapping_types = require('../constants/mapping_types');

var _api = require('../networking/api');

function loadBadges() {
  return {
    type: _action_types.LOAD_STREAM,
    payload: { endpoint: (0, _api.badges)() },
    meta: {
      mappingType: _mapping_types.BADGES,
      resultKey: '/badges'
    }
  };
} /* eslint-disable import/prefer-default-export */