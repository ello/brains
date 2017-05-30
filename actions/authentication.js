'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clearAuthToken = clearAuthToken;
exports.getUserCredentials = getUserCredentials;
exports.logout = logout;
exports.refreshAuthenticationToken = refreshAuthenticationToken;
exports.sendForgotPasswordRequest = sendForgotPasswordRequest;
exports.signIn = signIn;

var _action_types = require('../constants/action_types');

var _api = require('../networking/api');

function clearAuthToken() {
  return {
    type: _action_types.AUTHENTICATION.CLEAR_AUTH_TOKEN
  };
}

function getUserCredentials(email, password, meta) {
  return {
    type: _action_types.AUTHENTICATION.USER,
    payload: {
      endpoint: (0, _api.loginToken)(),
      method: 'POST',
      body: {
        email: email,
        password: password,
        grant_type: 'password',
        client_id: _api.AUTH_CLIENT_ID
      }
    },
    meta: meta
  };
}

function logout() {
  return {
    type: _action_types.AUTHENTICATION.LOGOUT,
    payload: {
      endpoint: (0, _api.logout)(),
      method: 'DELETE'
    }
  };
}

function refreshAuthenticationToken(refreshToken) {
  return {
    type: _action_types.AUTHENTICATION.REFRESH,
    payload: {
      endpoint: (0, _api.refreshAuthToken)(refreshToken),
      method: 'POST',
      body: {
        refresh_token: refreshToken,
        grant_type: 'refresh_token',
        client_id: _api.AUTH_CLIENT_ID
      }
    }
  };
}

function sendForgotPasswordRequest(email) {
  return {
    type: _action_types.AUTHENTICATION.FORGOT_PASSWORD,
    payload: {
      endpoint: (0, _api.forgotPassword)(),
      method: 'POST',
      body: {
        email: email
      }
    }
  };
}

function signIn(email, password) {
  return {
    type: _action_types.AUTHENTICATION.SIGN_IN,
    payload: {
      method: 'POST',
      email: email,
      password: password
    }
  };
}