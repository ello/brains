'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectIsLayoutToolHidden = exports.selectScrollOffset = exports.selectHasSaidHelloTo = exports.selectDPI = exports.selectContentWidth = exports.selectColumnWidth = exports.selectCommentOffset = exports.selectPaddingOffset = exports.selectIsMobileGridStream = exports.selectIsMobile = exports.selectDeviceSize = exports.selectActiveNotificationScrollPosition = exports.selectTextToolsStates = exports.selectTextToolsCoordinates = exports.selectSaidHelloTo = exports.selectNotificationScrollPositions = exports.selectLastNotificationCheck = exports.selectLastFollowingBeaconVersion = exports.selectLastDiscoverBeaconVersion = exports.selectLastAnnouncementSeen = exports.selectIsTextToolsActive = exports.selectIsProfileMenuActive = exports.selectIsNotificationsUnread = exports.selectIsNotificationsActive = exports.selectIsNavbarHidden = exports.selectIsGridMode = exports.selectIsCompleterActive = exports.selectInnerWidth = exports.selectInnerHeight = exports.selectHomeStream = exports.selectHasLaunchedSignupModal = exports.selectDiscoverKeyType = exports.selectColumnCount = exports.selectActiveNotificationsType = undefined;

var _reselect = require('reselect');

var _params = require('./params');

var _routing = require('./routing');

// state.gui.xxx
var selectActiveNotificationsType = exports.selectActiveNotificationsType = function selectActiveNotificationsType(state) {
  return state.gui.get('activeNotificationsType');
};
var selectColumnCount = exports.selectColumnCount = function selectColumnCount(state) {
  return state.gui.get('columnCount');
};
var selectDiscoverKeyType = exports.selectDiscoverKeyType = function selectDiscoverKeyType(state) {
  return state.gui.get('discoverKeyType');
};
var selectHasLaunchedSignupModal = exports.selectHasLaunchedSignupModal = function selectHasLaunchedSignupModal(state) {
  return state.gui.get('hasLaunchedSignupModal');
};
var selectHomeStream = exports.selectHomeStream = function selectHomeStream(state) {
  return state.gui.get('homeStream');
};
var selectInnerHeight = exports.selectInnerHeight = function selectInnerHeight(state) {
  return state.gui.get('innerHeight');
};
var selectInnerWidth = exports.selectInnerWidth = function selectInnerWidth(state) {
  return state.gui.get('innerWidth');
};
var selectIsCompleterActive = exports.selectIsCompleterActive = function selectIsCompleterActive(state) {
  return state.gui.get('isCompleterActive');
};
var selectIsGridMode = exports.selectIsGridMode = function selectIsGridMode(state) {
  return state.gui.get('isGridMode');
};
var selectIsNavbarHidden = exports.selectIsNavbarHidden = function selectIsNavbarHidden(state) {
  return state.gui.get('isNavbarHidden');
};
var selectIsNotificationsActive = exports.selectIsNotificationsActive = function selectIsNotificationsActive(state) {
  return state.gui.get('isNotificationsActive');
};
var selectIsNotificationsUnread = exports.selectIsNotificationsUnread = function selectIsNotificationsUnread(state) {
  return state.gui.get('isNotificationsUnread');
};
var selectIsProfileMenuActive = exports.selectIsProfileMenuActive = function selectIsProfileMenuActive(state) {
  return state.gui.get('isProfileMenuActive');
};
var selectIsTextToolsActive = exports.selectIsTextToolsActive = function selectIsTextToolsActive(state) {
  return state.gui.get('isTextToolsActive');
};
var selectLastAnnouncementSeen = exports.selectLastAnnouncementSeen = function selectLastAnnouncementSeen(state) {
  return state.gui.get('lastAnnouncementSeen');
};
var selectLastDiscoverBeaconVersion = exports.selectLastDiscoverBeaconVersion = function selectLastDiscoverBeaconVersion(state) {
  return state.gui.get('lastDiscoverBeaconVersion');
}; // eslint-disable-line
var selectLastFollowingBeaconVersion = exports.selectLastFollowingBeaconVersion = function selectLastFollowingBeaconVersion(state) {
  return state.gui.get('lastFollowingBeaconVersion');
}; // eslint-disable-line
var selectLastNotificationCheck = exports.selectLastNotificationCheck = function selectLastNotificationCheck(state) {
  return state.gui.get('lastNotificationCheck');
};
var selectNotificationScrollPositions = exports.selectNotificationScrollPositions = function selectNotificationScrollPositions(state) {
  return state.gui.get('notificationScrollPositions');
};
var selectSaidHelloTo = exports.selectSaidHelloTo = function selectSaidHelloTo(state) {
  return state.gui.get('saidHelloTo');
};
var selectTextToolsCoordinates = exports.selectTextToolsCoordinates = function selectTextToolsCoordinates(state) {
  return state.gui.get('textToolsCoordinates');
};
var selectTextToolsStates = exports.selectTextToolsStates = function selectTextToolsStates(state) {
  return state.gui.get('textToolsStates');
};

// Memoized selectors
var selectActiveNotificationScrollPosition = exports.selectActiveNotificationScrollPosition = (0, _reselect.createSelector)([selectActiveNotificationsType, selectNotificationScrollPositions], function (type, positions) {
  return positions.get(type, 0);
});

var selectDeviceSize = exports.selectDeviceSize = (0, _reselect.createSelector)([selectColumnCount, selectInnerWidth], function (columnCount, innerWidth) {
  // deviceSize could be anything: baby, momma, poppa bear would work too.
  if (columnCount >= 4) {
    return 'desktop';
  } else if (columnCount >= 2 && innerWidth >= 640) {
    return 'tablet';
  }
  return 'mobile';
});

var selectIsMobile = exports.selectIsMobile = (0, _reselect.createSelector)([selectDeviceSize], function (deviceSize) {
  return deviceSize === 'mobile';
});

var selectIsMobileGridStream = exports.selectIsMobileGridStream = (0, _reselect.createSelector)([selectDeviceSize, selectIsGridMode], function (deviceSize, isGridMode) {
  return deviceSize === 'mobile' && isGridMode;
});

var selectPaddingOffset = exports.selectPaddingOffset = (0, _reselect.createSelector)([selectDeviceSize, selectColumnCount], function (deviceSize, columnCount) {
  if (deviceSize === 'mobile') {
    return 10;
  }
  return columnCount >= 4 ? 40 : 20;
});

var selectCommentOffset = exports.selectCommentOffset = (0, _reselect.createSelector)([selectDeviceSize], function (deviceSize) {
  return deviceSize === 'mobile' ? 40 : 60;
});

var selectColumnWidth = exports.selectColumnWidth = (0, _reselect.createSelector)([selectColumnCount, selectInnerWidth, selectPaddingOffset], function (columnCount, innerWidth, padding) {
  return Math.round((innerWidth - (columnCount + 1) * padding) / columnCount);
});

var selectContentWidth = exports.selectContentWidth = (0, _reselect.createSelector)([selectInnerWidth, selectPaddingOffset], function (innerWidth, padding) {
  return Math.round(innerWidth - padding * 2);
});

// This is very rudimentary. needs things like 1x, 2x calculating the set
// Primarily used for background images in Heros
var selectDPI = exports.selectDPI = (0, _reselect.createSelector)([selectInnerWidth], function (innerWidth) {
  if (innerWidth < 750) {
    return 'hdpi';
  } else if (innerWidth >= 750 && innerWidth < 1920) {
    return 'xhdpi';
  }
  return 'optimized';
});

var selectHasSaidHelloTo = exports.selectHasSaidHelloTo = (0, _reselect.createSelector)([selectSaidHelloTo, _params.selectParamsUsername], function (saidHelloTo, username) {
  return saidHelloTo.includes(username);
});

var selectScrollOffset = exports.selectScrollOffset = (0, _reselect.createSelector)([selectInnerHeight], function (innerHeight) {
  return Math.round(innerHeight - 80);
});

var NO_LAYOUT_TOOLS = [/^\/[\w-]+\/post\/.+/, /^\/discover\/all\b/, /^\/notifications\b/, /^\/settings\b/, /^\/onboarding\b/, /^\/[\w-]+\/following\b/, /^\/[\w-]+\/followers\b/];

var selectIsLayoutToolHidden = exports.selectIsLayoutToolHidden = (0, _reselect.createSelector)([_routing.selectPathname, _routing.selectPropsQueryType], function (pathname, queryType) {
  var isUserSearch = queryType === 'users' && /^\/search\b/.test(pathname);
  return isUserSearch || NO_LAYOUT_TOOLS.some(function (pagex) {
    return pagex.test(pathname);
  });
});