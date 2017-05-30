'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isGif = exports.SUPPORTED_IMAGE_TYPES = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.isValidFileType = isValidFileType;
exports.orientImage = orientImage;
exports.getBlobFromBase64 = getBlobFromBase64;
exports.processImage = processImage;
exports.imageGuid = imageGuid;

var _exifJs = require('exif-js');

var _exifJs2 = _interopRequireDefault(_exifJs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SUPPORTED_IMAGE_TYPES = exports.SUPPORTED_IMAGE_TYPES = {
  BMP: 'image/bmp',
  GIF: 'image/gif',
  JPG: 'image/jpg',
  PNG: 'image/png'
};

var isGif = exports.isGif = function isGif(filename) {
  return (/gif$/.test(filename)
  );
};

function isValidFileType(file) {
  return new Promise(function (resolve, reject) {
    var fr = new FileReader();
    var isValid = false;
    var fileType = null;
    var exifData = null;
    fr.onloadend = function (e) {
      var arr = new Uint8Array(e.target.result).subarray(0, 4);
      var header = '';
      arr.forEach(function (value) {
        header += value.toString(16);
      });
      if (/ffd8ff/i.test(header)) {
        isValid = true; // image/jpg
        fileType = SUPPORTED_IMAGE_TYPES.JPG;
      } else if (/424D/i.test(header)) {
        isValid = true; // image/bmp
        fileType = SUPPORTED_IMAGE_TYPES.BMP;
      } else {
        switch (header) {
          case '47494638':
            // image/gif
            isValid = true;
            fileType = SUPPORTED_IMAGE_TYPES.GIF;
            break;
          case '89504e47':
            // image/png
            isValid = true;
            fileType = SUPPORTED_IMAGE_TYPES.PNG;
            break;
          default:
            break;
        }
      }
      if (fileType !== SUPPORTED_IMAGE_TYPES.GIF) {
        exifData = _exifJs2.default.readFromBinaryFile(e.target.result);
      }
      resolve({ isValid: isValid, fileType: fileType, exifData: exifData });
    };
    fr.onerror = function () {
      reject(_extends({}, fr.error));
    };
    fr.readAsArrayBuffer(file);
  });
}

function orientImage(img, maxW, maxH, orientation) {
  var width = img.width;
  var height = img.height;
  var transform = 'none';

  switch (orientation) {
    case 8:
      width = img.height;
      height = img.width;
      transform = 'left';
      break;
    case 6:
      width = img.height;
      height = img.width;
      transform = 'right';
      break;
    case 3:
      transform = 'flip';
      break;
    default:
      break;
  }

  if (width / maxW > height / maxH) {
    if (width > maxW) {
      height *= maxW / width;
      width = maxW;
    }
  } else if (height > maxH) {
    width *= maxH / height;
    height = maxH;
  }
  var canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  var ctx = canvas.getContext('2d');
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  switch (transform) {
    case 'left':
      ctx.setTransform(0, -1, 1, 0, 0, height);
      ctx.drawImage(img, 0, 0, height, width);
      break;
    case 'right':
      ctx.setTransform(0, 1, -1, 0, width, 0);
      ctx.drawImage(img, 0, 0, height, width);
      break;
    case 'flip':
      ctx.setTransform(1, 0, 0, -1, 0, height);
      ctx.translate(width, 0);
      ctx.scale(-1, 1);
      ctx.drawImage(img, 0, 0, width, height);
      break;
    default:
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.drawImage(img, 0, 0, width, height);
      break;
  }
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  return canvas;
}

function getBlobFromBase64(b64Data, contentType, sliceSize) {
  var type = contentType || '';
  var size = sliceSize || 512;
  var byteCharacters = atob(b64Data);
  var byteArrays = [];
  var offset = 0;
  while (offset < byteCharacters.length) {
    var slice = byteCharacters.slice(offset, offset + size);
    var byteNumbers = new Array(slice.length);
    var i = 0;
    while (i < slice.length) {
      byteNumbers[i] = slice.charCodeAt(i);
      i += 1;
    }
    var byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
    offset += size;
  }
  return new Blob(byteArrays, { type: type });
}

function processImage(_ref) {
  var exifData = _ref.exifData,
      file = _ref.file,
      fileType = _ref.fileType,
      _ref$maxWidth = _ref.maxWidth,
      maxWidth = _ref$maxWidth === undefined ? 2560 : _ref$maxWidth,
      _ref$maxHeight = _ref.maxHeight,
      maxHeight = _ref$maxHeight === undefined ? 7680 : _ref$maxHeight;

  return new Promise(function (resolve, reject) {
    var img = new Image();
    img.onload = function () {
      var orientation = exifData.Orientation;
      var canvas = orientImage(img, maxWidth, maxHeight, orientation);
      var src = canvas.toDataURL(fileType || SUPPORTED_IMAGE_TYPES.JPG);
      var blob = getBlobFromBase64(src.split(',')[1], fileType || SUPPORTED_IMAGE_TYPES.PNG);
      var objectURL = URL.createObjectURL(blob);
      resolve({ blob: blob, objectURL: objectURL });
    };
    img.onerror = function () {
      reject({ objectURL: null });
    };
    img.src = file;
  });
}

/* eslint-disable no-bitwise */
function imageGuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0;
    var v = c === 'x' ? r : r & 0x3 | 0x8;
    return v.toString(16);
  });
}
/* eslint-enable no-bitwise */