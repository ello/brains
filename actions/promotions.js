'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchAuthenticationPromos = undefined;

var _action_types = require('../constants/action_types');

var _api = require('../networking/api');

var fetchAuthenticationPromos = exports.fetchAuthenticationPromos = function fetchAuthenticationPromos() {
  return {
    type: _action_types.PROMOTIONS.AUTHENTICATION,
    payload: {
      endpoint: (0, _api.authenticationPromo)()
    }
  };
};

exports.default = fetchAuthenticationPromos;