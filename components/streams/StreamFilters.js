'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postsFromLoves = postsFromLoves;
exports.notificationsFromActivities = notificationsFromActivities;
exports.settingsToggles = settingsToggles;
exports.sortedCategories = sortedCategories;
exports.userResults = userResults;

var _mapping_types = require('../../constants/mapping_types');

var MAPPING_TYPES = _interopRequireWildcard(_mapping_types);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

// the export methods need to return an object like:
// { type: posts, ids: [1, 2, 3] }
function postsFromLoves(loves) {
  var result = { type: MAPPING_TYPES.POSTS, ids: [] };
  loves.forEach(function (love) {
    result.ids.push('' + love.postId);
  });
  return result;
}

function notificationsFromActivities(activities) {
  return { type: MAPPING_TYPES.NOTIFICATIONS, ids: activities };
}

function settingsToggles(settings) {
  return { type: MAPPING_TYPES.SETTINGS, ids: settings };
}

function sortCategories(a, b) {
  if (a.order < b.order) {
    return -1;
  } else if (a.order > b.order) {
    return 1;
  }
  return 0;
}

// TODO: move this into a selector?
function sortedCategories(allCats) {
  var result = { type: MAPPING_TYPES.CATEGORIES, ids: [] };
  var categories = {};
  // add categories to the correct arrays
  allCats.forEach(function (cat) {
    var level = cat.level && cat.level.length ? cat.level : 'other';
    if (!categories[level]) {
      categories[level] = [];
    }
    categories[level].push(cat);
  });
  // sort arrays
  Object.keys(categories).forEach(function (level) {
    categories[level].sort(sortCategories);
  });
  var cats = [];
  ['meta', 'primary', 'secondary', 'tertiary'].forEach(function (level) {
    var levelArr = categories[level];
    if (levelArr) {
      cats = cats.concat(levelArr.map(function (c) {
        return c.id;
      }));
    }
  });
  result.ids = cats;
  return result;
}

function userResults(users) {
  var result = { type: MAPPING_TYPES.USERS, ids: [] };
  users.forEach(function (user) {
    result.ids.push('' + user.id);
  });
  return result;
}