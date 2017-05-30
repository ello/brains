'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addBlock = addBlock;
exports.addDragBlock = addDragBlock;
exports.addEmptyTextBlock = addEmptyTextBlock;
exports.autoCompleteUsers = autoCompleteUsers;
exports.initializeEditor = initializeEditor;
exports.loadEmojis = loadEmojis;
exports.loadReplyAll = loadReplyAll;
exports.postPreviews = postPreviews;
exports.removeBlock = removeBlock;
exports.removeDragBlock = removeDragBlock;
exports.reorderBlocks = reorderBlocks;
exports.replaceText = replaceText;
exports.resetEditor = resetEditor;
exports.saveAsset = saveAsset;
exports.setIsCompleterActive = setIsCompleterActive;
exports.setIsTextToolsActive = setIsTextToolsActive;
exports.setTextToolsCoordinates = setTextToolsCoordinates;
exports.temporaryEditorAssetCreated = temporaryEditorAssetCreated;
exports.updateBuyLink = updateBuyLink;
exports.updateBlock = updateBlock;

var _action_types = require('../constants/action_types');

var _api = require('../networking/api');

var api = _interopRequireWildcard(_api);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function addBlock(block, editorId) {
  var shouldCheckForEmpty = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

  return {
    type: _action_types.EDITOR.ADD_BLOCK,
    payload: {
      block: block,
      editorId: editorId,
      shouldCheckForEmpty: shouldCheckForEmpty
    }
  };
}

function addDragBlock(block, editorId) {
  return {
    type: _action_types.EDITOR.ADD_DRAG_BLOCK,
    payload: {
      block: block,
      editorId: editorId
    }
  };
}

function addEmptyTextBlock(editorId) {
  return {
    type: _action_types.EDITOR.ADD_EMPTY_TEXT_BLOCK,
    payload: {
      editorId: editorId
    }
  };
}

function autoCompleteUsers(type, word) {
  return {
    type: _action_types.EDITOR.USER_COMPLETER,
    payload: {
      endpoint: api.userAutocompleter(word),
      type: type
    }
  };
}

function initializeEditor(editorId, shouldPersist) {
  return {
    type: _action_types.EDITOR.INITIALIZE,
    payload: {
      editorId: editorId,
      shouldPersist: shouldPersist
    }
  };
}

function loadEmojis(type, word) {
  return {
    type: _action_types.EDITOR.EMOJI_COMPLETER,
    payload: {
      endpoint: api.loadEmojis(),
      type: type,
      word: word
    }
  };
}

function loadReplyAll(postId, editorId) {
  return {
    type: _action_types.EDITOR.LOAD_REPLY_ALL,
    payload: {
      endpoint: api.postReplyAll(postId),
      editorId: editorId
    }
  };
}

function postPreviews(embedUrl, editorId, uid) {
  return {
    type: _action_types.EDITOR.POST_PREVIEW,
    payload: {
      body: { body: [{ kind: 'embed', data: { url: embedUrl } }] },
      editorId: editorId,
      endpoint: api.postPreviews(),
      uid: uid,
      method: 'POST'
    }
  };
}

function removeBlock(uid, editorId) {
  return {
    type: _action_types.EDITOR.REMOVE_BLOCK,
    payload: {
      editorId: editorId,
      uid: uid
    }
  };
}

function removeDragBlock(editorId) {
  return {
    type: _action_types.EDITOR.REMOVE_DRAG_BLOCK,
    payload: {
      editorId: editorId
    }
  };
}

function reorderBlocks(uid, delta, editorId) {
  return {
    type: _action_types.EDITOR.REORDER_BLOCKS,
    payload: {
      delta: delta,
      editorId: editorId,
      uid: uid
    }
  };
}

function replaceText(uid, editorId) {
  return {
    type: _action_types.EDITOR.REPLACE_TEXT,
    payload: {
      editorId: editorId,
      uid: uid
    }
  };
}

function resetEditor(editorId) {
  return {
    type: _action_types.EDITOR.RESET,
    payload: {
      editorId: editorId
    }
  };
}

function saveAsset(file, editorId) {
  return {
    type: _action_types.EDITOR.SAVE_ASSET,
    payload: {
      editorId: editorId,
      file: file
    }
  };
}

function setIsCompleterActive(_ref) {
  var isActive = _ref.isActive;

  return {
    type: _action_types.EDITOR.SET_IS_COMPLETER_ACTIVE,
    payload: {
      isCompleterActive: isActive
    }
  };
}

function setIsTextToolsActive(_ref2) {
  var isActive = _ref2.isActive,
      _ref2$textToolsStates = _ref2.textToolsStates,
      textToolsStates = _ref2$textToolsStates === undefined ? {} : _ref2$textToolsStates;

  return {
    type: _action_types.EDITOR.SET_IS_TEXT_TOOLS_ACTIVE,
    payload: {
      isTextToolsActive: isActive,
      textToolsStates: textToolsStates
    }
  };
}

function setTextToolsCoordinates(_ref3) {
  var _ref3$textToolsCoordi = _ref3.textToolsCoordinates,
      textToolsCoordinates = _ref3$textToolsCoordi === undefined ? { top: -200, left: -666 } : _ref3$textToolsCoordi;

  return {
    type: _action_types.EDITOR.SET_TEXT_TOOLS_COORDINATES,
    payload: {
      textToolsCoordinates: textToolsCoordinates
    }
  };
}

function temporaryEditorAssetCreated(objectURL, editorId) {
  return {
    type: _action_types.EDITOR.TMP_IMAGE_CREATED,
    payload: {
      url: objectURL,
      editorId: editorId
    }
  };
}

function updateBuyLink(editorId, link) {
  return {
    type: _action_types.EDITOR.UPDATE_BUY_LINK,
    payload: {
      editorId: editorId,
      link: link
    }
  };
}

function updateBlock(block, uid, editorId) {
  return {
    type: _action_types.EDITOR.UPDATE_BLOCK,
    payload: {
      block: block,
      editorId: editorId,
      uid: uid
    }
  };
}