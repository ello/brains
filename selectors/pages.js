'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectPage = exports.selectPagesResult = exports.selectAllCategoriesPage = exports.selectPages = undefined;

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _reselect = require('reselect');

var _get = require('lodash/get');

var _get2 = _interopRequireDefault(_get);

var _json = require('../reducers/json');

var _routing = require('./routing');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var selectMeta = function selectMeta(state, props) {
  return (0, _get2.default)(props, 'action.meta', {});
};

// state.json.pages.xxx
var selectPages = exports.selectPages = function selectPages(state) {
  return state.json.get('pages');
};
var selectAllCategoriesPage = exports.selectAllCategoriesPage = function selectAllCategoriesPage(state) {
  return state.json.getIn(['pages', 'all-categories']);
};

var selectPagesResult = exports.selectPagesResult = (0, _reselect.createSelector)([selectMeta, _routing.selectPathname, selectPages], function (meta, pathname, pages) {
  return pages ? pages.get(meta.resultKey || pathname, _immutable2.default.Map({ ids: _immutable2.default.List(), pagination: (0, _json.emptyPagination)() })) : _immutable2.default.Map({ ids: _immutable2.default.List(), pagination: (0, _json.emptyPagination)() });
});

// Memoized selectors
var selectPage = exports.selectPage = (0, _reselect.createSelector)([selectPages, _routing.selectPathname], function (pages, pathname) {
  return pages.get(pathname, null);
});