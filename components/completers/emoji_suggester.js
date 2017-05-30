'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.suggestEmoji = suggestEmoji;
var emojis = [];

function shuffleArray(arr) {
  var array = arr;
  var m = array.length;
  while (m) {
    m -= 1;
    var i = Math.floor(Math.random() * m);
    var t = array[m];
    array[m] = array[i];
    array[i] = t;
  }
  return array;
}

function sortEmojis(e) {
  var allEmoji = e.slice();
  var topEmoji = allEmoji.splice(0, 2);
  var popEmoji = shuffleArray(allEmoji.splice(0, 14));
  emojis = topEmoji.concat(popEmoji).concat(allEmoji);
}

function suggestEmoji(word, e) {
  sortEmojis(e);
  var partial = word.substring(word.lastIndexOf(':') + 1, word.length).toLowerCase();
  var suggestions = emojis.filter(function (emoji) {
    return emoji.name.indexOf(partial) !== -1;
  });
  suggestions = suggestions.sort(function (emoji, otherEmoji) {
    if (emoji.name.indexOf(partial) > otherEmoji.name.indexOf(partial)) return 1;
    if (emoji.name.indexOf(partial) < otherEmoji.name.indexOf(partial)) return -1;
    if (emoji.name.length > otherEmoji.name.length) return 1;
    if (emoji.name.length < otherEmoji.name.length) return -1;
    return 0;
  });
  return suggestions;
}

exports.default = suggestEmoji;