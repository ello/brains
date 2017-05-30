'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.convertStateToImmutable = exports.initialState = exports.findLayoutMode = exports.setLocation = undefined;

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _constants = require('redux-persist/constants');

var _get = require('lodash/get');

var _get2 = _interopRequireDefault(_get);

var _reactRouterRedux = require('react-router-redux');

var _action_types = require('../constants/action_types');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var location = {}; /* eslint-disable no-param-reassign */

var oldDate = new Date();
oldDate.setFullYear(oldDate.getFullYear() - 2);

var HOME_STREAMS_WHITELIST = [/^\/discover/, /^\/following$/];

// this is used for testing in StreamContainer_test
var setLocation = exports.setLocation = function setLocation(loc) {
  location = loc;
};

var findLayoutMode = exports.findLayoutMode = function findLayoutMode(modes) {
  return modes.findIndex(function (mode) {
    var regex = new RegExp(mode.get('regex'));
    return regex.test(location.pathname);
  });
};

var getIsGridMode = function getIsGridMode(state) {
  var index = findLayoutMode(state.get('modes'));
  if (index < 0) {
    return null;
  }
  return state.getIn(['modes', '' + index, 'mode']) === 'grid';
};

var initialNonPersistedState = _immutable2.default.Map({
  hasLaunchedSignupModal: false,
  isCompleterActive: false,
  isNotificationsActive: false,
  isProfileMenuActive: false,
  isTextToolsActive: false,
  notificationScrollPositions: _immutable2.default.Map(),
  saidHelloTo: _immutable2.default.List(),
  textToolsCoordinates: _immutable2.default.Map({ top: -200, left: -666 }),
  textToolsStates: _immutable2.default.Map()
});

var initialPersistedState = _immutable2.default.Map({
  activeNotificationsType: 'all',
  columnCount: 2,
  discoverKeyType: null,
  innerHeight: 0,
  innerWidth: 0,
  isGridMode: true,
  isNavbarHidden: false,
  isNotificationsUnread: false,
  lastAnnouncementSeen: '0',
  lastDiscoverBeaconVersion: '0',
  lastFollowingBeaconVersion: '0',
  lastNotificationCheck: oldDate.toUTCString(),
  // order matters for matching routes
  modes: _immutable2.default.List([_immutable2.default.Map({ label: 'root', mode: 'grid', regex: '^/$' }), _immutable2.default.Map({ label: 'discover', mode: 'grid', regex: '/discover|/explore' }), _immutable2.default.Map({ label: 'following', mode: 'grid', regex: '/following' }), _immutable2.default.Map({ label: 'invitations', mode: 'list', regex: '/invitations' }), _immutable2.default.Map({ label: 'onboarding', mode: 'grid', regex: '/onboarding' }), _immutable2.default.Map({ label: 'notifications', mode: 'list', regex: '/notifications' }), _immutable2.default.Map({ label: 'search', mode: 'grid', regex: '/search|/find' }), _immutable2.default.Map({ label: 'settings', mode: 'list', regex: '/settings' }), _immutable2.default.Map({ label: 'staff', mode: 'list', regex: '/staff' }), _immutable2.default.Map({ label: 'posts', mode: 'list', regex: '/[\\w\\-]+/post/.+' }), _immutable2.default.Map({ label: 'users/following', mode: 'grid', regex: '/[\\w\\-]+/following' }), _immutable2.default.Map({ label: 'users/followers', mode: 'grid', regex: '/[\\w\\-]+/followers' }), _immutable2.default.Map({ label: 'users/loves', mode: 'grid', regex: '/[\\w\\-]+/loves' }), _immutable2.default.Map({ label: 'users', mode: 'grid', regex: '/[\\w\\-]+' })])
});

var initialState = exports.initialState = initialNonPersistedState.merge(initialPersistedState);

var convertStateToImmutable = exports.convertStateToImmutable = function convertStateToImmutable(objectState) {
  return initialState.set('lastDiscoverBeaconVersion', objectState.lastDiscoverBeaconVersion || '0').set('lastFollowingBeaconVersion', objectState.lastFollowingBeaconVersion || '0').set('lastNotificationCheck', objectState.lastNotificationCheck || oldDate.toUTCString()).set('modes', objectState.modes ? _immutable2.default.fromJS(objectState.modes) : initialState.get('modes'));
};

exports.default = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { type: '' };
  var payload = action.payload,
      type = action.type;

  switch (type) {
    case _action_types.AUTHENTICATION.LOGOUT_SUCCESS:
    case _action_types.AUTHENTICATION.LOGOUT_FAILURE:
    case _action_types.AUTHENTICATION.REFRESH_FAILURE:
      return state.set('discoverKeyType', null);
    case _action_types.EDITOR.SET_IS_COMPLETER_ACTIVE:
      return state.set('isCompleterActive', payload.isCompleterActive);
    case _action_types.EDITOR.SET_IS_TEXT_TOOLS_ACTIVE:
      return state.set('isTextToolsActive', payload.isTextToolsActive).set('textToolsStates', payload.textToolsStates);
    case _action_types.EDITOR.SET_TEXT_TOOLS_COORDINATES:
      return state.set('textToolsCoordinates', _immutable2.default.fromJS(payload.textToolsCoordinates));
    case _action_types.GUI.BIND_DISCOVER_KEY:
      return state.set('discoverKeyType', payload.type);
    case _action_types.GUI.NOTIFICATIONS_TAB:
      return state.set('activeNotificationsType', payload.activeTabType);
    case _action_types.GUI.SET_IS_NAVBAR_HIDDEN:
      return state.set('isNavbarHidden', (0, _get2.default)(payload, 'isNavbarHidden', state.isNavbarHidden));
    case _action_types.GUI.SET_IS_PROFILE_MENU_ACTIVE:
      return state.set('isProfileMenuActive', payload.isProfileMenuActive);
    case _action_types.GUI.SET_LAST_ANNOUNCEMENT_SEEN:
      return state.set('lastAnnouncementSeen', payload.id);
    case _action_types.GUI.SET_LAST_DISCOVER_BEACON_VERSION:
      return state.set('lastDiscoverBeaconVersion', payload.version);
    case _action_types.GUI.SET_LAST_FOLLOWING_BEACON_VERSION:
      return state.set('lastFollowingBeaconVersion', payload.version);
    case _action_types.GUI.SET_NOTIFICATION_SCROLL_Y:
      return state.setIn(['notificationScrollPositions', payload.category], payload.scrollY);
    case _action_types.GUI.SET_SIGNUP_MODAL_LAUNCHED:
      return state.set('hasLaunchedSignupModal', payload.hasLaunchedSignupModal);
    case _action_types.GUI.SET_VIEWPORT_SIZE_ATTRIBUTES:
      return state.merge(payload);
    case _action_types.GUI.TOGGLE_NOTIFICATIONS:
      return state.set('isNotificationsActive', payload.isNotificationsActive);
    case _action_types.HEAD_FAILURE:
      return state.set('isNotificationsUnread', false);
    case _action_types.HEAD_SUCCESS:
      if (payload.serverStatus === 304) {
        return state.set('isNotificationsUnread', false);
      } else if (payload.serverStatus === 204) {
        return state.set('isNotificationsUnread', true);
      }
      return state;
    case _action_types.LOAD_STREAM_SUCCESS:
      if (action.meta && /\/notifications/.test(action.meta.resultKey)) {
        return state.set('isNotificationsUnread', false).set('lastNotificationCheck', new Date().toUTCString());
      }
      return state;
    case _reactRouterRedux.LOCATION_CHANGE:
      {
        location = payload;
        var pathname = location.pathname;
        if (typeof window !== 'undefined' && window.nonImmutableState && window.nonImmutableState.gui) {
          state = convertStateToImmutable(JSON.parse(window.nonImmutableState.gui));
          delete window.nonImmutableState.gui;
          return state;
        }
        if (HOME_STREAMS_WHITELIST.some(function (re) {
          return re.test(pathname);
        })) {
          return state.withMutations(function (s) {
            s.set('isGridMode', getIsGridMode(state)).set('isNavbarHidden', false);
          });
        }
        return state.withMutations(function (s) {
          s.set('isGridMode', getIsGridMode(state)).set('isNavbarHidden', false);
        });
      }
    case _action_types.PROFILE.DELETE_SUCCESS:
      {
        return initialState.set('columnCount', state.get('columnCount')).set('innerWidth', state.get('innerWidth')).set('innerHeight', state.get('innerHeight'));
      }
    case _constants.REHYDRATE:
      if (typeof window !== 'undefined' && window.nonImmutableState && window.nonImmutableState.gui) {
        state = convertStateToImmutable(JSON.parse(window.nonImmutableState.gui));
        delete window.nonImmutableState.gui;
        return state;
      }
      return state.withMutations(function (s) {
        s.merge(payload.gui || {}).merge(initialNonPersistedState).set('isGridMode', getIsGridMode(s)).set('isNavbarHidden', false);
      });
    case _action_types.SET_LAYOUT_MODE:
      {
        var index = findLayoutMode(state.get('modes'));
        if (index < 0) {
          return state;
        }
        return state.set('isGridMode', payload.mode === 'grid').setIn(['modes', '' + index, 'mode'], payload.mode);
      }
    case _action_types.ZEROS.SAY_HELLO:
      return state.set('saidHelloTo', state.get('saidHelloTo').push(payload.username));
    default:
      return state;
  }
};