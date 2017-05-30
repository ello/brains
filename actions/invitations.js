'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadInvitedUsers = loadInvitedUsers;
exports.inviteUsers = inviteUsers;
exports.getInviteEmail = getInviteEmail;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _action_types = require('../constants/action_types');

var ACTION_TYPES = _interopRequireWildcard(_action_types);

var _mapping_types = require('../constants/mapping_types');

var MAPPING_TYPES = _interopRequireWildcard(_mapping_types);

var _api = require('../networking/api');

var api = _interopRequireWildcard(_api);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function loadInvitedUsers() {
  var ErrorState = api.ERROR_RENDERABLES.ErrorState;

  return {
    type: ACTION_TYPES.LOAD_STREAM,
    payload: { endpoint: api.invite(), vo: {} },
    meta: {
      mappingType: MAPPING_TYPES.INVITATIONS,
      renderStream: {
        asList: api.STREAM_RENDERABLES.usersAsInviteeList,
        asGrid: api.STREAM_RENDERABLES.usersAsInviteeGrid,
        asError: _react2.default.createElement(ErrorState, null)
      }
    }
  };
}

function inviteUsers(emails) {
  return {
    type: ACTION_TYPES.INVITATIONS.INVITE,
    payload: {
      endpoint: api.invite(),
      method: 'POST',
      body: { email: emails }
    },
    meta: {
      mappingType: MAPPING_TYPES.INVITATIONS
    }
  };
}

function getInviteEmail(code) {
  return {
    type: ACTION_TYPES.INVITATIONS.GET_EMAIL,
    payload: {
      endpoint: api.getInviteEmail(code)
    }
  };
}