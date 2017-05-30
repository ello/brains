'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateQueryParams = updateQueryParams;
exports.getQueryParamValue = getQueryParamValue;
exports.getPagingQueryParams = getPagingQueryParams;
function updateQueryParams(params) {
  // store current query in an object
  var search = document.location.search.replace('?', '');
  var queryObj = {};
  if (search.length) {
    var searchArr = search.split('&');
    searchArr.forEach(function (str) {
      var keyValueArr = str.split('=');
      queryObj[keyValueArr[0]] = keyValueArr[1];
    });
  }
  // set/delete params
  Object.keys(params).forEach(function (param) {
    if (params[param] !== null) {
      queryObj[param] = encodeURIComponent(params[param]);
    } else {
      delete queryObj[param];
    }
  });
  // create query array
  var queryArr = [];
  Object.keys(queryObj).forEach(function (key) {
    if (queryObj[key] !== null) {
      queryArr.push(key + '=' + queryObj[key]);
    }
  });
  // re-assemble the query string
  var query = '';
  if (queryArr.length) {
    query = '?' + queryArr.join('&');
  }
  return query;
}

function getQueryParamValue(param, uri) {
  var search = uri.split('?')[1];
  if (search) {
    var searchArr = search.split('&');
    var found = searchArr.find(function (keyVal) {
      var keyValArr = keyVal.split('=');
      return keyValArr[0] === param;
    });
    if (found && found.length) {
      return found.split('=')[1];
    }
  }
  return null;
}

var paramWhitelist = ['before', 'per_page'];
function getPagingQueryParams() {
  var uri = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '?';

  var search = uri.split('?')[1];
  var obj = {};
  if (search && search.length) {
    var searchArr = search.split('&');
    searchArr.forEach(function (keyVal) {
      var keyValArr = keyVal.split('=');
      var key = keyValArr[0];
      if (paramWhitelist.indexOf(key) !== -1) {
        obj[key] = keyValArr[1];
      }
    });
  }
  return obj;
}