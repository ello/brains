'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectAsset = exports.selectAssets = undefined;

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _get = require('lodash/get');

var _get2 = _interopRequireDefault(_get);

var _mapping_types = require('../constants/mapping_types');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// state.json.assets.xxx
var selectAssets = exports.selectAssets = function selectAssets(state) {
  return state.json.get(_mapping_types.ASSETS, _immutable2.default.Map());
};

// Requires `assetId` to be found in props...
var selectAsset = exports.selectAsset = function selectAsset(state, props) {
  return state.json.getIn([_mapping_types.ASSETS, (0, _get2.default)(props, 'assetId')], _immutable2.default.Map());
};

// Memoized selectors