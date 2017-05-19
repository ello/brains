'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
// state.authentication.xxx
var selectAccessToken = exports.selectAccessToken = function selectAccessToken(state) {
  return state.authentication.get('accessToken');
};
var selectExpirationDate = exports.selectExpirationDate = function selectExpirationDate(state) {
  return state.authentication.get('expirationDate');
};
var selectIsLoggedIn = exports.selectIsLoggedIn = function selectIsLoggedIn(state) {
  return state.authentication.get('isLoggedIn');
};
var selectRefreshToken = exports.selectRefreshToken = function selectRefreshToken(state) {
  return state.authentication.get('refreshToken');
};

// Memoized selectors
var selectShouldUseAccessToken = exports.selectShouldUseAccessToken = function selectShouldUseAccessToken(state) {
  var accessToken = selectAccessToken(state);
  var expDate = selectExpirationDate(state);
  return accessToken && expDate > new Date();
};

var selectShouldUseRefreshToken = exports.selectShouldUseRefreshToken = function selectShouldUseRefreshToken(state) {
  var accessToken = selectAccessToken(state);
  var expDate = selectExpirationDate(state);
  var isLoggedIn = selectIsLoggedIn(state);
  return isLoggedIn && accessToken && !(expDate > new Date());
};