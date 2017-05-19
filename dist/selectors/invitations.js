'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectInvitationUserId = exports.selectInvitationId = exports.selectInvitationEmail = exports.selectInvitationCreatedAt = exports.selectInvitationCode = exports.selectInvitationAcceptedAt = exports.selectInvitation = exports.selectInvitations = exports.selectPropsInvitationId = undefined;

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _reselect = require('reselect');

var _get = require('lodash/get');

var _get2 = _interopRequireDefault(_get);

var _mapping_types = require('../constants/mapping_types');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var selectPropsInvitationId = exports.selectPropsInvitationId = function selectPropsInvitationId(state, props) {
  return (0, _get2.default)(props, 'invitationId') || (0, _get2.default)(props, 'invitation', _immutable2.default.Map()).get('id');
};

var selectInvitations = exports.selectInvitations = function selectInvitations(state) {
  return state.json.get(_mapping_types.INVITATIONS, _immutable2.default.Map());
};

// Memoized selectors

// Requires `invitationId`, or `invitation` to be found in props
var selectInvitation = exports.selectInvitation = (0, _reselect.createSelector)([selectPropsInvitationId, selectInvitations], function (id, invitations) {
  return invitations.get(id, _immutable2.default.Map());
});

// Properties on the invitation reducer
var selectInvitationAcceptedAt = exports.selectInvitationAcceptedAt = (0, _reselect.createSelector)([selectInvitation], function (invitation) {
  return invitation.get('acceptedAt');
});

var selectInvitationCode = exports.selectInvitationCode = (0, _reselect.createSelector)([selectInvitation], function (invitation) {
  return invitation.get('code');
});

var selectInvitationCreatedAt = exports.selectInvitationCreatedAt = (0, _reselect.createSelector)([selectInvitation], function (invitation) {
  return invitation.get('createdAt');
});

var selectInvitationEmail = exports.selectInvitationEmail = (0, _reselect.createSelector)([selectInvitation], function (invitation) {
  return invitation.get('email');
});

var selectInvitationId = exports.selectInvitationId = (0, _reselect.createSelector)([selectInvitation], function (invitation) {
  return invitation.get('id');
});

var selectInvitationUserId = exports.selectInvitationUserId = (0, _reselect.createSelector)([selectInvitation], function (invitation) {
  return invitation.getIn(['links', 'acceptedBy', 'id']);
});