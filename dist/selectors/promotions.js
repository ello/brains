'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectRandomAuthPromotion = exports.selectLoggedOutPagePromotions = exports.selectLoggedInPagePromotions = exports.selectIsCategoryPromotion = exports.selectIsPagePromotion = exports.selectCategoryData = exports.selectAuthPromotionals = undefined;

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _reselect = require('reselect');

var _sample = require('lodash/sample');

var _sample2 = _interopRequireDefault(_sample);

var _routing = require('./routing');

var _store = require('./store');

var _json_helper = require('../helpers/json_helper');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var selectCats = function selectCats(state) {
  return state.json.get('categories', _immutable2.default.Map());
};
var selectAuthPromotionals = exports.selectAuthPromotionals = function selectAuthPromotionals(state) {
  return state.promotions.get('authentication');
};
var selectPagePromotionals = function selectPagePromotionals(state) {
  return state.json.get('pagePromotionals', _immutable2.default.Map());
};

var selectCategoryData = exports.selectCategoryData = (0, _reselect.createSelector)([_routing.selectPathname, _store.selectJson, selectCats], function (pathname, json, categories) {
  var slug = pathname.replace('/discover/', '');
  var cat = categories.valueSeq().find(function (category) {
    return category.get('slug') === slug;
  }) || _immutable2.default.Map();
  return {
    category: cat,
    promotionals: (0, _json_helper.getLinkArray)(cat, 'promotionals', json) || _immutable2.default.List()
  };
});

var selectIsPagePromotion = exports.selectIsPagePromotion = (0, _reselect.createSelector)([_routing.selectViewNameFromRoute, _routing.selectPathname], function (viewName, pathname) {
  return viewName === 'search' || viewName === 'discover' && pathname === '/' || viewName === 'discover' && pathname === '/discover' || viewName === 'discover' && pathname === '/discover/all' || viewName === 'discover' && /\/featured\b|\/trending\b|\/recent\b/.test(pathname);
});

var selectIsCategoryPromotion = exports.selectIsCategoryPromotion = (0, _reselect.createSelector)([_routing.selectViewNameFromRoute, selectIsPagePromotion], function (viewName, isPagePromotion) {
  return viewName === 'discover' && !isPagePromotion;
});

var selectLoggedInPagePromotions = exports.selectLoggedInPagePromotions = (0, _reselect.createSelector)([selectPagePromotionals], function (promos) {
  return promos.filter(function (value) {
    return value.get('isLoggedIn');
  });
});

var selectLoggedOutPagePromotions = exports.selectLoggedOutPagePromotions = (0, _reselect.createSelector)([selectPagePromotionals], function (promos) {
  return promos.filterNot(function (value) {
    return value.get('isLoggedIn');
  });
});

var selectRandomAuthPromotion = exports.selectRandomAuthPromotion = (0, _reselect.createSelector)([selectAuthPromotionals], function (authPromos) {
  var keyArr = [];
  authPromos.keySeq().forEach(function (key) {
    keyArr.push(key);
  });
  var randomKey = (0, _sample2.default)(keyArr);
  return authPromos.get(randomKey);
});