'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectUserBadgeSummary = exports.selectUserProfileCardBadges = exports.selectUserProfileBadges = exports.selectUserTruncatedShortBio = exports.selectUserIsSelf = exports.selectUserIsFeatured = exports.selectUserIsEmpty = exports.selectUserCategories = exports.selectUserMetaTitle = exports.selectUserMetaRobots = exports.selectUserMetaImage = exports.selectUserMetaDescription = exports.selectIsSystemUser = exports.selectUserViewsAdultContent = exports.selectUserUsername = exports.selectUserTotalViewsCount = exports.selectUserRelationshipPriority = exports.selectUserPostsCount = exports.selectUserPostsAdultContent = exports.selectUserName = exports.selectUserMetaAttributes = exports.selectUserLovesCount = exports.selectUserLocation = exports.selectUserIsHireable = exports.selectUserIsCollaborateable = exports.selectUserId = exports.selectUserHref = exports.selectUserHasSharingEnabled = exports.selectUserHasRepostingEnabled = exports.selectUserHasLovesEnabled = exports.selectUserHasCommentingEnabled = exports.selectUserHasAutoWatchEnabled = exports.selectUserFormattedShortBio = exports.selectUserFollowingCount = exports.selectUserFollowersCount = exports.selectUserExternalLinksList = exports.selectUserExperimentalFeatures = exports.selectUserCoverImage = exports.selectUserBadges = exports.selectUserBadForSeo = exports.selectUserAvatar = exports.selectUser = exports.selectUsers = exports.selectPropsUserId = undefined;

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _reselect = require('reselect');

var _get = require('lodash/get');

var _get2 = _interopRequireDefault(_get);

var _truncHtml = require('trunc-html');

var _truncHtml2 = _interopRequireDefault(_truncHtml);

var _json_helper = require('../helpers/json_helper');

var _params = require('./params');

var _store = require('./store');

var _mapping_types = require('../constants/mapping_types');

var _number_to_human = require('../lib/number_to_human');

var _badges = require('./badges');

var _invitations = require('./invitations');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var selectPropsUserId = exports.selectPropsUserId = function selectPropsUserId(state, props) {
  return (0, _get2.default)(props, 'userId') || (0, _get2.default)(props, 'user', _immutable2.default.Map()).get('id');
};

var selectUsers = exports.selectUsers = function selectUsers(state) {
  return state.json.get(_mapping_types.USERS, _immutable2.default.Map());
};

// Memoized selectors

// Requires `userId`, `user` or `params.username` to be found in props
var selectUser = exports.selectUser = (0, _reselect.createSelector)([selectPropsUserId, _invitations.selectInvitationUserId, _params.selectParamsUsername, selectUsers], function (id, invitationUserId, username, users) {
  var userId = id || invitationUserId;
  if (userId) {
    return users.get(userId, _immutable2.default.Map());
  } else if (username) {
    return users.find(function (user) {
      return user.get('username') === username;
    }) || _immutable2.default.Map();
  }
  return _immutable2.default.Map();
});

// Properties on the user reducer
// TODO: Supply defaults where applicable
var selectUserAvatar = exports.selectUserAvatar = (0, _reselect.createSelector)([selectUser], function (user) {
  return user.get('avatar');
});
var selectUserBadForSeo = exports.selectUserBadForSeo = (0, _reselect.createSelector)([selectUser], function (user) {
  return user.get('badForSeo');
});
var selectUserBadges = exports.selectUserBadges = (0, _reselect.createSelector)([selectUser], function (user) {
  return user.get('badges', _immutable2.default.List());
});
var selectUserCoverImage = exports.selectUserCoverImage = (0, _reselect.createSelector)([selectUser], function (user) {
  return user.get('coverImage');
});
var selectUserExperimentalFeatures = exports.selectUserExperimentalFeatures = (0, _reselect.createSelector)([selectUser], function (user) {
  return user.get('experimentalFeatures');
});
var selectUserExternalLinksList = exports.selectUserExternalLinksList = (0, _reselect.createSelector)([selectUser], function (user) {
  return user.get('externalLinksList');
});
var selectUserFollowersCount = exports.selectUserFollowersCount = (0, _reselect.createSelector)([selectUser], function (user) {
  return user.get('followersCount', 0);
});
var selectUserFollowingCount = exports.selectUserFollowingCount = (0, _reselect.createSelector)([selectUser], function (user) {
  return user.get('followingCount', 0);
});
var selectUserFormattedShortBio = exports.selectUserFormattedShortBio = (0, _reselect.createSelector)([selectUser], function (user) {
  return user.get('formattedShortBio', '');
});
var selectUserHasAutoWatchEnabled = exports.selectUserHasAutoWatchEnabled = (0, _reselect.createSelector)([selectUser], function (user) {
  return user.get('hasAutoWatchEnabled');
});
var selectUserHasCommentingEnabled = exports.selectUserHasCommentingEnabled = (0, _reselect.createSelector)([selectUser], function (user) {
  return user.get('hasCommentingEnabled');
});
var selectUserHasLovesEnabled = exports.selectUserHasLovesEnabled = (0, _reselect.createSelector)([selectUser], function (user) {
  return user.get('hasLovesEnabled');
});
var selectUserHasRepostingEnabled = exports.selectUserHasRepostingEnabled = (0, _reselect.createSelector)([selectUser], function (user) {
  return user.get('hasRepostingEnabled');
});
var selectUserHasSharingEnabled = exports.selectUserHasSharingEnabled = (0, _reselect.createSelector)([selectUser], function (user) {
  return user.get('hasSharingEnabled');
});
var selectUserHref = exports.selectUserHref = (0, _reselect.createSelector)([selectUser], function (user) {
  return user.get('href');
});
var selectUserId = exports.selectUserId = (0, _reselect.createSelector)([selectUser], function (user) {
  return user.get('id');
});
var selectUserIsCollaborateable = exports.selectUserIsCollaborateable = (0, _reselect.createSelector)([selectUser], function (user) {
  return user.get('isCollaborateable', false);
});
var selectUserIsHireable = exports.selectUserIsHireable = (0, _reselect.createSelector)([selectUser], function (user) {
  return user.get('isHireable', false);
});
// TODO: Pull properties out of user.get('links')? - i.e. links.categories
var selectUserLocation = exports.selectUserLocation = (0, _reselect.createSelector)([selectUser], function (user) {
  return user.get('location');
});
var selectUserLovesCount = exports.selectUserLovesCount = (0, _reselect.createSelector)([selectUser], function (user) {
  return user.get('lovesCount', 0);
});
var selectUserMetaAttributes = exports.selectUserMetaAttributes = (0, _reselect.createSelector)([selectUser], function (user) {
  return user.get('metaAttributes', _immutable2.default.Map());
});
var selectUserName = exports.selectUserName = (0, _reselect.createSelector)([selectUser], function (user) {
  return user.get('name');
});
var selectUserPostsAdultContent = exports.selectUserPostsAdultContent = (0, _reselect.createSelector)([selectUser], function (user) {
  return user.get('postsAdultContent');
});
var selectUserPostsCount = exports.selectUserPostsCount = (0, _reselect.createSelector)([selectUser], function (user) {
  return user.get('postsCount', 0);
});
var selectUserRelationshipPriority = exports.selectUserRelationshipPriority = (0, _reselect.createSelector)([selectUser], function (user) {
  return user.get('relationshipPriority');
});
var selectUserTotalViewsCount = exports.selectUserTotalViewsCount = (0, _reselect.createSelector)([selectUser], function (user) {
  var count = user.get('totalViewsCount');
  return count ? (0, _number_to_human.numberToHuman)(count, false) : undefined;
});
var selectUserUsername = exports.selectUserUsername = (0, _reselect.createSelector)([selectUser], function (user) {
  return user.get('username');
});
var selectUserViewsAdultContent = exports.selectUserViewsAdultContent = (0, _reselect.createSelector)([selectUser], function (user) {
  return user.get('viewsAdultContent');
});
var selectIsSystemUser = exports.selectIsSystemUser = (0, _reselect.createSelector)([selectUserUsername], function (username) {
  return ['ello', 'elloblog'].some(function (un) {
    return un === username;
  });
});

// Nested properties on the post reducer
var selectUserMetaDescription = exports.selectUserMetaDescription = (0, _reselect.createSelector)([selectUserMetaAttributes], function (metaAttributes) {
  return metaAttributes.get('description');
});

var selectUserMetaImage = exports.selectUserMetaImage = (0, _reselect.createSelector)([selectUserMetaAttributes], function (metaAttributes) {
  return metaAttributes.get('image');
});

var selectUserMetaRobots = exports.selectUserMetaRobots = (0, _reselect.createSelector)([selectUserMetaAttributes], function (metaAttributes) {
  return metaAttributes.get('robots');
});

var selectUserMetaTitle = exports.selectUserMetaTitle = (0, _reselect.createSelector)([selectUserMetaAttributes], function (metaAttributes) {
  return metaAttributes.get('title');
});

// Derived or additive properties
var selectUserCategories = exports.selectUserCategories = (0, _reselect.createSelector)([selectUser, _store.selectJson], function (user, json) {
  return (0, _json_helper.getLinkArray)(user, 'categories', json) || _immutable2.default.List();
});

var selectUserIsEmpty = exports.selectUserIsEmpty = (0, _reselect.createSelector)([selectUser], function (user) {
  return user.isEmpty();
});

var selectUserIsFeatured = exports.selectUserIsFeatured = (0, _reselect.createSelector)([selectUserCategories], function (categories) {
  return !categories.isEmpty();
});

// TODO: Evaluate against profile.id and user.id instead?
var selectUserIsSelf = exports.selectUserIsSelf = (0, _reselect.createSelector)([selectUserRelationshipPriority], function (relationshipPriority) {
  return relationshipPriority === 'self';
});

var selectUserTruncatedShortBio = exports.selectUserTruncatedShortBio = (0, _reselect.createSelector)([selectUser], function (user) {
  return (0, _truncHtml2.default)(user.get('formattedShortBio', ''), 160, { sanitizer: { allowedAttributes: { img: ['align', 'alt', 'class', 'height', 'src', 'width'] } } });
});

var selectUserProfileBadges = exports.selectUserProfileBadges = (0, _reselect.createSelector)([selectUserBadges, _badges.selectBadges], function (userBadges, storeBadges) {
  return userBadges.take(3).map(function (userBadge) {
    var badge = storeBadges.find(function (storeBadge) {
      return storeBadge.get('slug') === userBadge;
    }) || _immutable2.default.Map();
    return _immutable2.default.Map({
      name: badge.get('name'),
      image: badge.getIn(['image', 'url']),
      slug: badge.get('slug')
    });
  });
});

var selectUserProfileCardBadges = exports.selectUserProfileCardBadges = (0, _reselect.createSelector)([selectUserProfileBadges], function (badges) {
  return badges.take(1);
});

var selectUserBadgeSummary = exports.selectUserBadgeSummary = (0, _reselect.createSelector)([selectUserBadges, _badges.selectBadges, selectUserCategories], function (userBadges, storeBadges, categories) {
  return userBadges.map(function (userBadge) {
    var badge = storeBadges.find(function (storeBadge) {
      return storeBadge.get('slug') === userBadge;
    });
    if (badge && userBadge === 'featured') {
      var cats = categories.map(function (category) {
        return _immutable2.default.Map({ slug: category.get('slug'), name: category.get('name') });
      });
      badge = badge.set('featuredIn', cats);
    }
    return badge;
  });
});