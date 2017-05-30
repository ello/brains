'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createComment = createComment;
exports.deleteComment = deleteComment;
exports.flagComment = flagComment;
exports.loadEditableComment = loadEditableComment;
exports.toggleEditing = toggleEditing;
exports.updateComment = updateComment;

var _action_types = require('../constants/action_types');

var _mapping_types = require('../constants/mapping_types');

var MAPPING_TYPES = _interopRequireWildcard(_mapping_types);

var _api = require('../networking/api');

var api = _interopRequireWildcard(_api);

var _editor = require('../actions/editor');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function createComment(hasAutoWatchEnabled, body, editorId, postId) {
  return {
    type: _action_types.COMMENT.CREATE,
    payload: {
      body: { body: body },
      editorId: editorId,
      endpoint: api.createComment(postId),
      method: 'POST',
      postId: postId,
      hasAutoWatchEnabled: hasAutoWatchEnabled
    },
    meta: {
      mappingType: MAPPING_TYPES.COMMENTS,
      successAction: (0, _editor.resetEditor)(editorId)
    }
  };
}

function deleteComment(comment) {
  return {
    type: _action_types.COMMENT.DELETE,
    payload: {
      endpoint: api.deleteComment(comment),
      method: 'DELETE',
      model: comment
    },
    meta: {}
  };
}

function flagComment(comment, kind) {
  return {
    type: _action_types.COMMENT.FLAG,
    payload: {
      endpoint: api.flagComment(comment, kind),
      method: 'POST'
    },
    meta: {}
  };
}

function loadEditableComment(comment) {
  return {
    type: _action_types.COMMENT.EDITABLE,
    payload: { endpoint: api.editComment(comment) },
    meta: {
      mappingType: MAPPING_TYPES.COMMENTS,
      updateResult: false
    }
  };
}

function toggleEditing(comment, isEditing) {
  return {
    type: _action_types.COMMENT.TOGGLE_EDITING,
    payload: {
      model: comment,
      isEditing: isEditing
    }
  };
}

function updateComment(comment, body, editorId) {
  return {
    type: _action_types.COMMENT.UPDATE,
    payload: {
      body: { body: body },
      editorId: editorId,
      endpoint: api.editComment(comment),
      method: 'PATCH'
    },
    meta: {
      mappingType: MAPPING_TYPES.COMMENTS
    }
  };
}