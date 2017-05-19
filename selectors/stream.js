'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectStreamFilteredResult = exports.selectStreamUnfilteredResult = exports.selectStreamResultPath = exports.selectStreamPostIdOrToken = exports.selectStreamMappingType = exports.selectStreamType = undefined;

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _reselect = require('reselect');

var _get = require('lodash/get');

var _get2 = _interopRequireDefault(_get);

var _pages = require('./pages');

var _store = require('./store');

var _routing = require('./routing');

var _json = require('../reducers/json');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// props.xxx
var selectMeta = function selectMeta(state, props) {
  return (0, _get2.default)(props, 'action.meta', {});
};

// state.stream.xxx
var selectStreamType = exports.selectStreamType = function selectStreamType(state) {
  return state.stream.get('type');
};

// state.stream.meta.xxx
var selectStreamMappingType = exports.selectStreamMappingType = function selectStreamMappingType(state) {
  return state.stream.getIn(['meta', 'mappingType']);
};

// state.stream.payload.xxx
var selectStreamPostIdOrToken = exports.selectStreamPostIdOrToken = function selectStreamPostIdOrToken(state) {
  return state.stream.getIn(['payload', 'postIdOrToken']);
};

var selectStreamResultPath = exports.selectStreamResultPath = (0, _reselect.createSelector)([selectMeta, _routing.selectPathname], function (meta, pathname) {
  return meta.resultKey || pathname;
});

var selectStreamUnfilteredResult = exports.selectStreamUnfilteredResult = (0, _reselect.createSelector)([_pages.selectPages, selectStreamResultPath], function (pages, resultPath) {
  return pages.get(resultPath, _immutable2.default.Map({ ids: _immutable2.default.List(), pagination: (0, _json.emptyPagination)() }));
});

// Memoized selectors
var selectStreamFilteredResult = exports.selectStreamFilteredResult = (0, _reselect.createSelector)([selectStreamUnfilteredResult, _store.selectJson, _routing.selectPathname], function (unfilteredResult, json, pathname) {
  // don't filter out blocked ids if we are in settings
  // since you can unblock/unmute them from there
  var delTypes = json.get('deleted_' + unfilteredResult.get('type'), _immutable2.default.List());
  return unfilteredResult.set('ids', unfilteredResult.get('ids').filter(function (value) {
    return pathname === '/settings' || !delTypes.includes(value);
  }));
});