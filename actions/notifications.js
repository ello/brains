'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.markAnnouncementRead = exports.loadAnnouncements = undefined;
exports.loadNotifications = loadNotifications;
exports.checkForNewNotifications = checkForNewNotifications;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _action_types = require('../constants/action_types');

var ACTION_TYPES = _interopRequireWildcard(_action_types);

var _mapping_types = require('../constants/mapping_types');

var MAPPING_TYPES = _interopRequireWildcard(_mapping_types);

var _api = require('../networking/api');

var api = _interopRequireWildcard(_api);

var _StreamFilters = require('../components/streams/StreamFilters');

var StreamFilters = _interopRequireWildcard(_StreamFilters);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function loadNotifications() {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var categoryResult = params.category && params.category !== 'all' ? '/' + params.category : '';
  var ZeroState = api.ZERO_RENDERABLES.ZeroState;

  return {
    type: ACTION_TYPES.LOAD_STREAM,
    payload: { endpoint: api.notifications(params) },
    meta: {
      mappingType: MAPPING_TYPES.ACTIVITIES,
      renderStream: {
        asList: api.STREAM_RENDERABLES.notificationList,
        asGrid: api.STREAM_RENDERABLES.notificationList,
        asZero: _react2.default.createElement(
          ZeroState,
          null,
          'Sorry, no notifications found.'
        )
      },
      resultFilter: StreamFilters.notificationsFromActivities,
      resultKey: '/notifications' + categoryResult,
      updateKey: '/notifications'
    }
  };
}

function checkForNewNotifications() {
  return {
    type: ACTION_TYPES.HEAD,
    payload: {
      endpoint: api.newNotifications(),
      method: 'HEAD'
    }
  };
}

var loadAnnouncements = exports.loadAnnouncements = function loadAnnouncements() {
  return {
    type: ACTION_TYPES.LOAD_STREAM,
    payload: {
      endpoint: api.announcements()
    },
    meta: {
      mappingType: MAPPING_TYPES.ANNOUNCEMENTS,
      resultKey: '/announcements',
      updateKey: '/announcements'
    }
  };
};

var markAnnouncementRead = exports.markAnnouncementRead = function markAnnouncementRead() {
  return {
    type: ACTION_TYPES.NOTIFICATIONS.MARK_ANNOUNCEMENT_READ,
    payload: {
      endpoint: api.markAnnouncementRead(),
      method: 'PATCH'
    }
  };
};