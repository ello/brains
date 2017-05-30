'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _get = require('lodash/get');

var _get2 = _interopRequireDefault(_get);

var _reactRouterRedux = require('react-router-redux');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var previousPath = typeof document === 'undefined' ? '/' : document.location.pathname;

// Merge our initial state with routerReducer's initial state
var initialState = _immutable2.default.fromJS({
  locationBeforeTransitions: undefined,
  previousPath: previousPath
});

exports.default = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var _ref = arguments[1];
  var type = _ref.type,
      payload = _ref.payload;

  if (type === _reactRouterRedux.LOCATION_CHANGE) {
    return state.merge({
      location: {
        pathname: (0, _get2.default)(payload, 'locationBeforeTransitions.pathname', (0, _get2.default)(payload, 'pathname')),
        state: (0, _get2.default)(payload, 'locationBeforeTransitions.state', (0, _get2.default)(payload, 'state')),
        terms: (0, _get2.default)(payload, 'locationBeforeTransitions.query.terms', (0, _get2.default)(payload, 'query.terms', undefined)),
        preview: (0, _get2.default)(payload, 'locationBeforeTransitions.query.preview', (0, _get2.default)(payload, 'query.preview', undefined))
      },
      locationBeforeTransitions: payload.locationBeforeTransitions || payload,
      previousPath: state.getIn(['location', 'pathname'])
    });
  }
  return state;
};