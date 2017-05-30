'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.setIsNavbarHidden = setIsNavbarHidden;
exports.setIsProfileMenuActive = setIsProfileMenuActive;
exports.setLastAnnouncementSeen = setLastAnnouncementSeen;
exports.setLastDiscoverBeaconVersion = setLastDiscoverBeaconVersion;
exports.setLastFollowingBeaconVersion = setLastFollowingBeaconVersion;
exports.setNotificationScrollY = setNotificationScrollY;
exports.setViewportSizeAttributes = setViewportSizeAttributes;
exports.setSignupModalLaunched = setSignupModalLaunched;
exports.toggleNotifications = toggleNotifications;

var _action_types = require('../constants/action_types');

function setIsNavbarHidden(_ref) {
  var isHidden = _ref.isHidden;

  return {
    type: _action_types.GUI.SET_IS_NAVBAR_HIDDEN,
    payload: {
      isNavbarHidden: isHidden
    }
  };
}

function setIsProfileMenuActive(_ref2) {
  var isActive = _ref2.isActive;

  return {
    type: _action_types.GUI.SET_IS_PROFILE_MENU_ACTIVE,
    payload: {
      isProfileMenuActive: isActive
    }
  };
}

function setLastAnnouncementSeen(_ref3) {
  var id = _ref3.id;

  return {
    type: _action_types.GUI.SET_LAST_ANNOUNCEMENT_SEEN,
    payload: {
      id: id
    }
  };
}

function setLastDiscoverBeaconVersion(_ref4) {
  var version = _ref4.version;

  return {
    type: _action_types.GUI.SET_LAST_DISCOVER_BEACON_VERSION,
    payload: {
      version: version
    }
  };
}

function setLastFollowingBeaconVersion(_ref5) {
  var version = _ref5.version;

  return {
    type: _action_types.GUI.SET_LAST_FOLLOWING_BEACON_VERSION,
    payload: {
      version: version
    }
  };
}

function setNotificationScrollY(category, scrollY) {
  return {
    payload: {
      category: category,
      scrollY: scrollY
    },
    type: _action_types.GUI.SET_NOTIFICATION_SCROLL_Y
  };
}

function setViewportSizeAttributes(resizeAttributes) {
  return {
    type: _action_types.GUI.SET_VIEWPORT_SIZE_ATTRIBUTES,
    payload: _extends({}, resizeAttributes)
  };
}

function setSignupModalLaunched() {
  var launched = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

  return {
    type: _action_types.GUI.SET_SIGNUP_MODAL_LAUNCHED,
    payload: {
      hasLaunchedSignupModal: launched
    }
  };
}

function toggleNotifications(_ref6) {
  var isActive = _ref6.isActive;

  return {
    type: _action_types.GUI.TOGGLE_NOTIFICATIONS,
    payload: {
      isNotificationsActive: isActive
    }
  };
}