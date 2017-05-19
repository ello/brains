"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var selectJson = exports.selectJson = function selectJson(state) {
  return state.json;
};
var selectOmnibar = exports.selectOmnibar = function selectOmnibar(state) {
  return state.omnibar;
};
var selectStream = exports.selectStream = function selectStream(state) {
  return state.stream;
};