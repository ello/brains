'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/* eslint-disable import/prefer-default-export */
// state.emoji.xxx
var selectEmojis = exports.selectEmojis = function selectEmojis(state) {
  return state.emoji.get('emojis');
};

// Memoized selectors