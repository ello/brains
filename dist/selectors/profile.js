'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectBioLabel = exports.selectProfileIsFeatured = exports.selectIsOwnPage = exports.selectLinksAsText = exports.selectIsInfoFormBlank = exports.selectIsCoverImageBlank = exports.selectIsAvatarBlank = exports.selectSplit = exports.selectUuid = exports.selectProfileLinksCategories = exports.selectWebOnboardingVersion = exports.selectViewsAdultContent = exports.selectUsername = exports.selectShortBio = exports.selectRegistrationId = exports.selectName = exports.selectMutedCount = exports.selectMarketingVersion = exports.selectLocation = exports.selectProfileIsHireable = exports.selectProfileIsCollaborateable = exports.selectIsCommunity = exports.selectIsStaff = exports.selectIsPublic = exports.selectIsNabaroo = exports.selectId = exports.selectHasCoverImagePresent = exports.selectHasAvatarPresent = exports.selectHasAutoWatchEnabled = exports.selectExternalLinksList = exports.selectEmail = exports.selectCreatedAt = exports.selectCoverImage = exports.selectBundleId = exports.selectBuildVersion = exports.selectBlockedCount = exports.selectAvatar = exports.selectAvailability = exports.selectAnalyticsId = exports.selectAllowsAnalytics = undefined;

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _reselect = require('reselect');

var _routing = require('../selectors/routing');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// state.profile.xxx
var selectAllowsAnalytics = exports.selectAllowsAnalytics = function selectAllowsAnalytics(state) {
  return state.profile.get('allowsAnalytics');
};
var selectAnalyticsId = exports.selectAnalyticsId = function selectAnalyticsId(state) {
  return state.profile.get('analyticsId');
};
var selectAvailability = exports.selectAvailability = function selectAvailability(state) {
  return state.profile.get('availability');
};
var selectAvatar = exports.selectAvatar = function selectAvatar(state) {
  return state.profile.get('avatar');
};
var selectBlockedCount = exports.selectBlockedCount = function selectBlockedCount(state) {
  return state.profile.get('blockedCount');
};
var selectBuildVersion = exports.selectBuildVersion = function selectBuildVersion(state) {
  return state.profile.get('buildVersion');
};
var selectBundleId = exports.selectBundleId = function selectBundleId(state) {
  return state.profile.get('bundleId');
};
var selectCoverImage = exports.selectCoverImage = function selectCoverImage(state) {
  return state.profile.get('coverImage');
};
var selectCreatedAt = exports.selectCreatedAt = function selectCreatedAt(state) {
  return state.profile.get('createdAt');
};
var selectEmail = exports.selectEmail = function selectEmail(state) {
  return state.profile.get('email');
};
var selectExternalLinksList = exports.selectExternalLinksList = function selectExternalLinksList(state) {
  return state.profile.get('externalLinksList', _immutable2.default.List());
};
var selectHasAutoWatchEnabled = exports.selectHasAutoWatchEnabled = function selectHasAutoWatchEnabled(state) {
  return state.profile.get('hasAutoWatchEnabled');
};
var selectHasAvatarPresent = exports.selectHasAvatarPresent = function selectHasAvatarPresent(state) {
  return state.profile.get('hasAvatarPresent', false);
};
var selectHasCoverImagePresent = exports.selectHasCoverImagePresent = function selectHasCoverImagePresent(state) {
  return state.profile.get('hasCoverImagePresent', false);
};
var selectId = exports.selectId = function selectId(state) {
  return state.profile.get('id');
};
var selectIsNabaroo = exports.selectIsNabaroo = function selectIsNabaroo(state) {
  return state.profile.get('isNabaroo', false);
};
var selectIsPublic = exports.selectIsPublic = function selectIsPublic(state) {
  return state.profile.get('isPublic');
};
var selectIsStaff = exports.selectIsStaff = function selectIsStaff(state) {
  return state.profile.get('isStaff', false);
};
var selectIsCommunity = exports.selectIsCommunity = function selectIsCommunity(state) {
  return state.profile.get('isCommunity', false);
};
var selectProfileIsCollaborateable = exports.selectProfileIsCollaborateable = function selectProfileIsCollaborateable(state) {
  return state.profile.get('isCollaborateable', false);
};
var selectProfileIsHireable = exports.selectProfileIsHireable = function selectProfileIsHireable(state) {
  return state.profile.get('isHireable', false);
};
var selectLocation = exports.selectLocation = function selectLocation(state) {
  return state.profile.get('location', '');
};
var selectMarketingVersion = exports.selectMarketingVersion = function selectMarketingVersion(state) {
  return state.profile.get('marketingVersion');
};
var selectMutedCount = exports.selectMutedCount = function selectMutedCount(state) {
  return state.profile.get('mutedCount');
};
var selectName = exports.selectName = function selectName(state) {
  return state.profile.get('name', '');
};
var selectRegistrationId = exports.selectRegistrationId = function selectRegistrationId(state) {
  return state.profile.get('registrationId');
};
var selectShortBio = exports.selectShortBio = function selectShortBio(state) {
  return state.profile.get('shortBio', '');
};
var selectUsername = exports.selectUsername = function selectUsername(state) {
  return state.profile.get('username');
};
var selectViewsAdultContent = exports.selectViewsAdultContent = function selectViewsAdultContent(state) {
  return state.profile.get('viewsAdultContent');
};
var selectWebOnboardingVersion = exports.selectWebOnboardingVersion = function selectWebOnboardingVersion(state) {
  return state.profile.get('webOnboardingVersion');
};
var selectProfileLinksCategories = exports.selectProfileLinksCategories = function selectProfileLinksCategories(state) {
  return state.profile.getIn(['links', 'categories'], _immutable2.default.List());
};
var selectUuid = exports.selectUuid = function selectUuid(state) {
  return state.profile.get('uuid');
};
var selectSplit = exports.selectSplit = function selectSplit(state, props) {
  return state.profile.getIn(['splits', props.splitName]);
};

// Memoized selectors
var selectIsAvatarBlank = exports.selectIsAvatarBlank = (0, _reselect.createSelector)([selectHasAvatarPresent, selectAvatar], function (hasAvatarPresent, avatar) {
  // if we have a tmp we have an avatar locally
  if (avatar && avatar.get('tmp')) {
    return false;
  }
  return !hasAvatarPresent || !(avatar && (avatar.get('tmp') || avatar.get('original')));
});

var selectIsCoverImageBlank = exports.selectIsCoverImageBlank = (0, _reselect.createSelector)([selectHasCoverImagePresent, selectCoverImage], function (hasCoverImagePresent, coverImage) {
  // if we have a tmp we have a coverImage locally
  if (coverImage && coverImage.get('tmp')) {
    return false;
  }
  return !hasCoverImagePresent || !(coverImage && (coverImage.get('tmp') || coverImage.get('original')));
});

var selectIsInfoFormBlank = exports.selectIsInfoFormBlank = (0, _reselect.createSelector)([selectExternalLinksList, selectName, selectShortBio], function (externalLinksList, name, shortBio) {
  var hasLinks = externalLinksList && externalLinksList.length;
  var hasName = name && name.length;
  var hasShortBio = shortBio && shortBio.length;
  return !hasLinks && !hasName && !hasShortBio;
});

var selectLinksAsText = exports.selectLinksAsText = (0, _reselect.createSelector)([selectExternalLinksList], function (externalLinksList) {
  var links = externalLinksList.size ? externalLinksList : '';
  if (typeof links === 'string') {
    return links;
  }
  return links.map(function (link) {
    return link.get('text');
  }).join(', ');
});

var selectIsOwnPage = exports.selectIsOwnPage = (0, _reselect.createSelector)([selectUsername, _routing.selectPathname], function (username, pathname) {
  var re = new RegExp('/' + username + '$');
  return re.test(pathname);
});

var selectProfileIsFeatured = exports.selectProfileIsFeatured = (0, _reselect.createSelector)([selectProfileLinksCategories], function (categories) {
  return !categories.isEmpty();
});

var selectBioLabel = exports.selectBioLabel = (0, _reselect.createSelector)([selectIsCommunity], function (isCommunity) {
  return isCommunity ? 'Community Info' : 'Bio';
});