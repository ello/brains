'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectParamsUsername = exports.selectParamsType = exports.selectParamsToken = exports.selectParamsInvitationCode = undefined;

var _get = require('lodash/get');

var _get2 = _interopRequireDefault(_get);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// props.params.xxx
var selectParamsInvitationCode = exports.selectParamsInvitationCode = function selectParamsInvitationCode(state, props) {
  return (0, _get2.default)(props, 'params.invitationCode');
}; /* eslint-disable import/prefer-default-export */
var selectParamsToken = exports.selectParamsToken = function selectParamsToken(state, props) {
  var token = (0, _get2.default)(props, 'params.token');
  return token ? token.toLowerCase() : null;
};
var selectParamsType = exports.selectParamsType = function selectParamsType(state, props) {
  return (0, _get2.default)(props, 'params.type');
};
var selectParamsUsername = exports.selectParamsUsername = function selectParamsUsername(state, props) {
  return (0, _get2.default)(props, 'params.username', '').toLowerCase();
};

// Memoized selectors