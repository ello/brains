'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.numberToHuman = numberToHuman;
var billion = 1000000000.0;
var million = 1000000.0;
var thousand = 1000.0;

function numberToHuman(number) {
  var showZero = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var precision = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

  if (number === 0 && !showZero) {
    return '';
  }
  var roundingFactor = Math.pow(10, precision);
  var num = void 0;
  var suffix = void 0;
  if (number >= billion) {
    num = Math.round(number / billion * roundingFactor) / roundingFactor;
    suffix = 'B';
  } else if (number >= million) {
    num = Math.round(number / million * roundingFactor) / roundingFactor;
    suffix = 'M';
  } else if (number >= thousand) {
    num = Math.round(number / thousand * roundingFactor) / roundingFactor;
    suffix = 'K';
  } else {
    num = Math.round(number * roundingFactor) / roundingFactor;
    suffix = '';
  }
  var strNum = '' + num;
  var strArr = strNum.split('.');
  if (strArr[strArr.length - 1] === '0') {
    strNum = strArr[0];
  }
  return '' + strNum + suffix;
}

exports.default = numberToHuman;