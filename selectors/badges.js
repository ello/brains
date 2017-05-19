'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectBadgesHasLoaded = exports.selectBadge = exports.selectBadges = undefined;

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _reselect = require('reselect');

var _get = require('lodash/get');

var _get2 = _interopRequireDefault(_get);

var _mapping_types = require('../constants/mapping_types');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var selectPropsBadgeId = function selectPropsBadgeId(state, props) {
  return (0, _get2.default)(props, 'badgeId');
};

var selectBadges = exports.selectBadges = function selectBadges(state) {
  return state.json.get(_mapping_types.BADGES, _immutable2.default.List());
};

// Memoized selectors
var selectBadge = exports.selectBadge = (0, _reselect.createSelector)([selectBadges, selectPropsBadgeId], function (badges, badgeId) {
  return badges.find(function (badge) {
    return badge.get('slug') === badgeId;
  });
});

var selectBadgesHasLoaded = exports.selectBadgesHasLoaded = (0, _reselect.createSelector)([selectBadges], function (badges) {
  return !badges.isEmpty();
});