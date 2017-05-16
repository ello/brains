'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectDiscoverMetaData = exports.selectCategoryPageTitle = exports.selectCategoryTabs = exports.selectOnboardingCategoriesFiltered = exports.selectOnboardingCategories = exports.selectAdminCategories = exports.selectCategories = exports.selectAllCategoriesAsArray = exports.selectCategoryTileImageUrl = exports.selectCategorySlug = exports.selectCategoryName = exports.selectCategory = exports.selectCategoryCollection = exports.selectPropsCategoryId = undefined;
exports.sortCategories = sortCategories;

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _reselect = require('reselect');

var _get = require('lodash/get');

var _get2 = _interopRequireDefault(_get);

var _startCase = require('lodash/startCase');

var _startCase2 = _interopRequireDefault(_startCase);

var _truncHtml = require('trunc-html');

var _truncHtml2 = _interopRequireDefault(_truncHtml);

var _mapping_types = require('../constants/mapping_types');

var _en = require('../constants/locales/en');

var _pages = require('./pages');

var _params = require('./params');

var _promotions = require('./promotions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function sortCategories(a, b) {
  if (a.get('order') < b.get('order')) {
    return -1;
  } else if (a.get('order') > b.get('order')) {
    return 1;
  }
  return 0;
}

var selectPropsCategoryId = exports.selectPropsCategoryId = function selectPropsCategoryId(state, props) {
  return (0, _get2.default)(props, 'categoryId');
};

// state.json.categories.xxx
var selectCategoryCollection = exports.selectCategoryCollection = function selectCategoryCollection(state) {
  return state.json.get(_mapping_types.CATEGORIES);
};

// Requires `categoryId` to be found in props
var selectCategory = exports.selectCategory = (0, _reselect.createSelector)([selectPropsCategoryId, selectCategoryCollection], function (id, categories) {
  return categories.get(id, _immutable2.default.Map());
});

var selectCategoryName = exports.selectCategoryName = (0, _reselect.createSelector)([selectCategory], function (category) {
  return category.get('name');
});
var selectCategorySlug = exports.selectCategorySlug = (0, _reselect.createSelector)([selectCategory], function (category) {
  return category.get('slug');
});
var selectCategoryTileImageUrl = exports.selectCategoryTileImageUrl = (0, _reselect.createSelector)([selectCategory], function (category) {
  return category.getIn(['tileImage', 'large', 'url']);
});

var selectAllCategoriesAsArray = exports.selectAllCategoriesAsArray = (0, _reselect.createSelector)([selectCategoryCollection, _pages.selectAllCategoriesPage], function (categories, allCategoryPage) {
  if (!categories || !allCategoryPage) {
    return _immutable2.default.List();
  }
  return allCategoryPage.get('ids').map(function (key) {
    return categories.get(key);
  });
});

// Memoized selectors
var selectCategories = exports.selectCategories = (0, _reselect.createSelector)([selectAllCategoriesAsArray], function (allCats) {
  var cats = {};
  // add cats to the correct arrays
  allCats.forEach(function (cat) {
    var level = cat.get('level') ? cat.get('level') : 'other';
    if (!cats[level]) {
      cats[level] = [];
    }
    cats[level].push(cat);
  });
  // sort arrays
  Object.keys(cats).forEach(function (level) {
    cats[level].sort(sortCategories);
  });
  return cats;
});

var selectAdminCategories = exports.selectAdminCategories = (0, _reselect.createSelector)([selectCategoryCollection], function (allCats) {
  var cats = {};
  var defaultCats = allCats || _immutable2.default.Map();
  // add cats to the correct arrays
  defaultCats.map(function (cat) {
    var level = cat.get('level') ? cat.get('level') : 'other';
    if (!cats[level]) {
      cats[level] = [];
    }
    cats[level].push(cat);
    return cat;
  });
  // sort arrays
  Object.keys(cats).forEach(function (level) {
    cats[level].sort(sortCategories);
  });
  return cats;
});

var selectOnboardingCategories = exports.selectOnboardingCategories = (0, _reselect.createSelector)([selectCategories], function (categories) {
  var cats = [];
  ['primary', 'secondary', 'tertiary'].forEach(function (level) {
    var levelArr = categories[level];
    if (levelArr) {
      cats = cats.concat(levelArr);
    }
  });
  return cats;
});

var selectOnboardingCategoriesFiltered = exports.selectOnboardingCategoriesFiltered = (0, _reselect.createSelector)([selectOnboardingCategories], function (categories) {
  return categories.filter(function (category) {
    return category.get('allowInOnboarding');
  });
});

var selectCategoryTabs = exports.selectCategoryTabs = (0, _reselect.createSelector)([selectCategories], function (categories) {
  var meta = categories.meta,
      primary = categories.primary,
      secondary = categories.secondary,
      tertiary = categories.tertiary;

  var tabs = [];
  if (!primary) {
    return tabs;
  }
  [meta, primary, secondary, tertiary].filter(function (arr) {
    return arr;
  }).forEach(function (level) {
    level.forEach(function (category) {
      var tab = {
        label: category.get('name'),
        source: category.getIn(['tileImage', 'small', 'url']),
        to: category.get('slug') === 'featured' ? '/discover' : '/discover/' + category.get('slug')
      };
      if (category.get('slug') === 'featured') {
        tab.activePattern = /^\/(?:discover(\/featured|\/recommended)?)?$/;
      }
      tabs.push(tab);
    });
  });
  return tabs;
});

var selectCategoryPageTitle = exports.selectCategoryPageTitle = (0, _reselect.createSelector)([_params.selectParamsType, selectCategoryCollection], function (paramsType, categories) {
  switch (paramsType) {
    case 'all':
      return null;
    case undefined:
    case 'recommended':
      return 'Featured';
    default:
      {
        var cat = categories && categories.find(function (c) {
          return c.get('slug') === paramsType;
        });
        return cat ? cat.get('name') : (0, _startCase2.default)(paramsType).replace(/\sX\s/, ' x ');
      }
  }
});

var selectDiscoverMetaData = exports.selectDiscoverMetaData = (0, _reselect.createSelector)([_params.selectParamsType, _promotions.selectCategoryData, selectCategoryPageTitle], function (type, categoryData, pageTitle) {
  var titlePrefix = pageTitle ? pageTitle + ' | ' : '';
  var title = titlePrefix + 'Ello';
  var category = categoryData.category,
      promotionals = categoryData.promotionals;

  var image = promotionals.getIn([0, 'image', 'hdpi', 'url'], _en.META.IMAGE);
  var description = '';
  switch (type) {
    case undefined:
    case 'featured':
    case 'recommended':
      description = _en.META.FEATURED_PAGE_DESCRIPTION;
      break;
    case 'recent':
      description = _en.META.RECENT_PAGE_DESCRIPTION;
      break;
    case 'trending':
      description = _en.META.TRENDING_PAGE_DESCRIPTION;
      break;
    case 'all':
      description = _en.META.ALL_PAGE_DESCRIPTION;
      break;
    default:
      {
        description = category && category.get('description') ? (0, _truncHtml2.default)(category.get('description'), 160).text : _en.META.DESCRIPTION;
        break;
      }
  }
  return { description: description, image: image, title: title };
});