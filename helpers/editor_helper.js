'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.methods = exports.initialState = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /* eslint-disable no-param-reassign */


var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _get = require('lodash/get');

var _get2 = _interopRequireDefault(_get);

var _reduce = require('lodash/reduce');

var _reduce2 = _interopRequireDefault(_reduce);

var _action_types = require('../constants/action_types');

var _EmojiSuggester = require('../components/completers/EmojiSuggester');

var _regex = require('../constants/regex');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var methods = {};
var initialState = _immutable2.default.Map({
  collection: _immutable2.default.Map(),
  hasContent: false,
  hasMedia: false,
  hasMention: false,
  isLoading: false,
  isPosting: false,
  order: _immutable2.default.List(),
  postBuyLink: null,
  shouldPersist: false,
  uid: 0
});

methods.getCompletions = function (action) {
  var payload = action.payload;

  if (payload && payload.response) {
    var _payload$type = payload.type,
        type = _payload$type === undefined ? 'user' : _payload$type,
        word = payload.word;

    if (type === 'user' || type === 'location') {
      if (type === 'location' && !document.activeElement.classList.contains('LocationControl')) {
        return null;
      }
      return _immutable2.default.fromJS({ data: payload.response.autocompleteResults, type: type });
    } else if (type === 'emoji') {
      return _immutable2.default.fromJS({ data: (0, _EmojiSuggester.suggestEmoji)(word, payload.response.emojis), type: type });
    }
  }
  return _immutable2.default.Map();
};

methods.rehydrateEditors = function () {
  var persistedEditors = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _immutable2.default.Map();

  var editors = _immutable2.default.Map();
  persistedEditors.keySeq().forEach(function (key) {
    var pe = persistedEditors.get(key);
    if (pe && pe.get('shouldPersist')) {
      // clear out the blobs
      var collection = pe.get('collection');
      collection.keySeq().forEach(function (uid) {
        var block = collection.get(uid);
        if (/image/.test(block.get('kind'))) {
          block.delete('blob');
          pe.setIn(['collection', uid], block);
        }
      });
      pe.set('isLoading', false);
      pe.set('isPosting', false);
      editors = editors.set(key, pe);
    }
  });
  return editors;
};

methods.hasContent = function (state) {
  var order = state.get('order');
  var firstBlock = state.getIn(['collection', '' + order.first()]);
  if (!firstBlock) {
    return false;
  }
  var data = firstBlock.get('data');
  return !!(order.size > 1 || data && data.length && data !== '<br>');
};

methods.hasMedia = function (state) {
  var collection = state.get('collection');
  var order = state.get('order');
  return order.some(function (uid) {
    return (/embed|image/.test(collection.getIn(['' + uid, 'kind']))
    );
  });
};

methods.hasMention = function (state) {
  var collection = state.get('collection');
  var order = state.get('order');
  return order.some(function (uid) {
    var block = collection.get('' + uid);
    return block && /text/.test(block.get('kind')) && _regex.userRegex.test(block.get('data'));
  });
};

methods.isLoading = function (state) {
  var collection = state.get('collection');
  var isLoading = collection.valueSeq().some(function (block) {
    return (/image/.test(block.get('kind')) && block.get('isLoading')
    );
  });
  var dragBlock = state.get('dragBlock');
  if (!isLoading && dragBlock) {
    isLoading = dragBlock.get('isLoading');
  }
  return isLoading;
};

methods.add = function (_ref) {
  var block = _ref.block,
      _ref$shouldCheckForEm = _ref.shouldCheckForEmpty,
      shouldCheckForEmpty = _ref$shouldCheckForEm === undefined ? true : _ref$shouldCheckForEm,
      state = _ref.state;

  var uid = state.get('uid');
  var newBlock = _extends({}, block, { uid: uid });
  var postBuyLink = state.get('postBuyLink');
  if (!postBuyLink && block.linkUrl) {
    postBuyLink = block.linkUrl;
    state = state.set('postBuyLink', postBuyLink);
  } else if (postBuyLink) {
    newBlock.linkUrl = postBuyLink;
  }
  var order = state.get('order', _immutable2.default.List());
  var updatedState = state.setIn(['collection', '' + uid], _immutable2.default.fromJS(newBlock)).set('order', order.push(uid)).set('uid', uid + 1);
  if (shouldCheckForEmpty) {
    return methods.addEmptyTextBlock(updatedState);
  }
  return updatedState;
};

methods.addEmptyTextBlock = function (state) {
  var shouldCheckForEmpty = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  var order = state.get('order', _immutable2.default.List());
  var last = state.getIn(['collection', '' + order.last()]);
  if (order.size > 1) {
    var secondToLast = state.getIn(['collection', '' + order.get(-2)]);
    if (/text/.test(secondToLast.get('kind')) && /text/.test(last.get('kind')) && !last.get('data').length) {
      return methods.remove({ shouldCheckForEmpty: shouldCheckForEmpty, state: state, uid: last.get('uid') });
    }
  }
  if (!order.size || !/text/.test(last.get('kind'))) {
    return methods.add({ block: { data: '', kind: 'text' }, state: state });
  }
  return state;
};

methods.remove = function (_ref2) {
  var _ref2$shouldCheckForE = _ref2.shouldCheckForEmpty,
      shouldCheckForEmpty = _ref2$shouldCheckForE === undefined ? true : _ref2$shouldCheckForE,
      state = _ref2.state,
      uid = _ref2.uid;

  var order = state.get('order');
  var updatedState = state.deleteIn(['collection', '' + uid]).deleteIn(['order', '' + order.indexOf(uid)]);
  if (shouldCheckForEmpty) {
    return methods.addEmptyTextBlock(updatedState);
  }
  return updatedState;
};

methods.removeEmptyTextBlock = function (state) {
  var order = state.get('order');
  if (order.size > 0) {
    var last = state.getIn(['collection', '' + order.last()]);
    if (last && /text/.test(last.get('kind')) && !last.get('data').length) {
      return state.deleteIn(['collection', '' + last.get('uid')]).deleteIn(['order', '' + order.indexOf(last.get('uid'))]);
    }
  }
  return state;
};

methods.updateBlock = function (state, action) {
  var _action$payload = action.payload,
      block = _action$payload.block,
      uid = _action$payload.uid;

  return state.setIn(['collection', '' + uid], _immutable2.default.fromJS(block));
};

methods.reorderBlocks = function (state, action) {
  var order = state.get('order');
  var _action$payload2 = action.payload,
      delta = _action$payload2.delta,
      uid = _action$payload2.uid;

  var index = order.indexOf(uid);
  // remove from old spot and add to new spot
  return state.set('order', order.splice(index, 1).splice(index + delta, 0, uid));
};

methods.appendText = function (state, text) {
  var order = state.get('order');
  var textBlocks = order.filter(function (uid) {
    return (/text/.test(state.getIn(['collection', '' + uid, 'kind']))
    );
  });
  var lastTextBlock = state.getIn(['collection', '' + textBlocks.last()]);
  if (lastTextBlock) {
    return state.setIn(['collection', '' + lastTextBlock.get('uid'), 'data'], lastTextBlock.get('data') + text);
  }
  return state;
};

methods.appendUsernames = function (state, usernames) {
  var order = state.get('order');
  var textBlocks = order.filter(function (uid) {
    return (/text/.test(state.getIn(['collection', '' + uid, 'kind']))
    );
  });
  var lastTextBlock = state.getIn(['collection', '' + textBlocks.last()]);
  var text = (0, _reduce2.default)(usernames, function (memo, _ref3) {
    var username = _ref3.username;
    return memo + '@' + username + ' ';
  }, '');
  if (lastTextBlock && !lastTextBlock.get('data').includes(text)) {
    return state.setIn(['collection', '' + lastTextBlock.get('uid'), 'data'], lastTextBlock.get('data') + text);
  }
  return state;
};

methods.replaceText = function (state, action) {
  var _action$payload3 = action.payload,
      editorId = _action$payload3.editorId,
      uid = _action$payload3.uid;

  var kind = state.getIn(['collection', '' + uid, 'kind']);
  if (/text/.test(kind)) {
    var selector = '[data-editor-id="' + editorId + '"][data-collection-id="' + uid + '"]';
    var elem = document.querySelector(selector);
    if (elem && elem.firstChild) {
      return state.setIn(['collection', '' + uid, 'data'], elem.firstChild.innerHTML);
    }
  }
  return state;
};

methods.updateBuyLink = function (state, action) {
  var link = action.payload.link;
  // once individual blocks can get their own links
  // we can rip out this overall property on editor

  var order = state.get('order');
  state.set('postBuyLink', link);
  var updatedState = state;
  order.forEach(function (uid) {
    if (link && link.length) {
      updatedState = updatedState.setIn(['collection', '' + uid, 'linkUrl'], link);
    } else {
      updatedState = updatedState.deleteIn(['collection', '' + uid, 'linkUrl']);
    }
  });
  return updatedState;
};

methods.getEditorObject = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  switch (action.type) {
    case _action_types.EDITOR.ADD_BLOCK:
      return methods.add({
        block: action.payload.block,
        state: state,
        shouldCheckForEmpty: action.payload.shouldCheckForEmpty
      });
    case _action_types.EDITOR.ADD_DRAG_BLOCK:
      return state.set('dragBlock', action.payload.block);
    case _action_types.EDITOR.ADD_EMPTY_TEXT_BLOCK:
      return methods.addEmptyTextBlock(state);
    case _action_types.EDITOR.APPEND_TEXT:
      return methods.appendText(state, action.payload.text);
    case _action_types.EDITOR.INITIALIZE:
      if (state.get('shouldPersist')) {
        return state;
      }
      return initialState;
    case _action_types.EDITOR.POST_PREVIEW_SUCCESS:
      state = methods.removeEmptyTextBlock(state);
      state = methods.add({
        block: _extends({}, action.payload.response.postPreviews.body[0]),
        state: state
      });
      return state;
    case _action_types.EDITOR.REMOVE_BLOCK:
      return methods.remove({ state: state, uid: action.payload.uid });
    case _action_types.EDITOR.REMOVE_DRAG_BLOCK:
      return state.delete('dragBlock');
    case _action_types.EDITOR.REORDER_BLOCKS:
      return methods.reorderBlocks(state, action);
    case _action_types.EDITOR.REPLACE_TEXT:
      return methods.replaceText(state, action);
    case _action_types.COMMENT.CREATE_REQUEST:
    case _action_types.COMMENT.UPDATE_REQUEST:
    case _action_types.POST.CREATE_REQUEST:
    case _action_types.POST.UPDATE_REQUEST:
      return state.set('isPosting', true);
    case _action_types.COMMENT.CREATE_SUCCESS:
    case _action_types.COMMENT.UPDATE_SUCCESS:
    case _action_types.EDITOR.RESET:
    case _action_types.POST.CREATE_SUCCESS:
    case _action_types.POST.UPDATE_SUCCESS:
      return methods.addEmptyTextBlock(initialState.set('uid', state.get('uid')));
    case _action_types.COMMENT.CREATE_FAILURE:
    case _action_types.COMMENT.UPDATE_FAILURE:
    case _action_types.POST.CREATE_FAILURE:
    case _action_types.POST.UPDATE_FAILURE:
      return state.set('isPosting', false);
    case _action_types.EDITOR.LOAD_REPLY_ALL_SUCCESS:
      return methods.appendUsernames(state, (0, _get2.default)(action, 'payload.response.usernames', []));
    case _action_types.EDITOR.SAVE_ASSET_SUCCESS:
      if (state.getIn(['dragBlock', 'uid']) === action.payload.uid) {
        state = state.setIn(['dragBlock', 'data', 'url'], action.payload.response.url).setIn(['dragBlock', 'isLoading'], false);
      } else {
        state = state.setIn(['collection', '' + action.payload.uid, 'data', 'url'], action.payload.response.url).setIn(['collection', '' + action.payload.uid, 'isLoading'], false);
      }
      return state.set('isPosting', false);
    case _action_types.EDITOR.TMP_IMAGE_CREATED:
      return methods.add({
        block: {
          blob: action.payload.url,
          kind: 'image',
          data: {},
          isLoading: true
        },
        state: methods.removeEmptyTextBlock(state)
      });
    case _action_types.EDITOR.UPDATE_BUY_LINK:
      return methods.updateBuyLink(state, action);
    case _action_types.EDITOR.UPDATE_BLOCK:
      return methods.updateBlock(state, action).set('isPosting', false);
    default:
      return state;
  }
};

exports.default = methods;
exports.initialState = initialState;
exports.methods = methods;