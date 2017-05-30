'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.editorMethods = exports.initialState = undefined;

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _constants = require('redux-persist/constants');

var _get = require('lodash/get');

var _get2 = _interopRequireDefault(_get);

var _action_types = require('../constants/action_types');

var _editor_helper = require('../helpers/editor_helper');

var _editor_helper2 = _interopRequireDefault(_editor_helper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var initialState = exports.initialState = _immutable2.default.Map({ completions: _immutable2.default.Map() }); /* eslint-disable no-param-reassign */

exports.default = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  var editorId = (0, _get2.default)(action, 'payload.editorId');
  var editor = void 0;
  if (editorId) {
    editor = _editor_helper2.default.getEditorObject(state.get('' + editorId), action);
    state = state.set('' + editorId, editor);
    if (action.type === _action_types.EDITOR.INITIALIZE) {
      return state.setIn(['' + editorId, 'shouldPersist'], (0, _get2.default)(action, 'payload.shouldPersist', false));
    }
    return state.setIn(['' + editorId, 'hasContent'], _editor_helper2.default.hasContent(editor)).setIn(['' + editorId, 'hasMedia'], _editor_helper2.default.hasMedia(editor)).setIn(['' + editorId, 'hasMention'], _editor_helper2.default.hasMention(editor)).setIn(['' + editorId, 'isLoading'], _editor_helper2.default.isLoading(editor));
  }
  switch (action.type) {
    case _action_types.AUTHENTICATION.LOGOUT_SUCCESS:
    case _action_types.AUTHENTICATION.LOGOUT_FAILURE:
    case _action_types.AUTHENTICATION.REFRESH_FAILURE:
    case _action_types.PROFILE.DELETE_SUCCESS:
      return initialState;
    case _action_types.EDITOR.CLEAR_AUTO_COMPLETERS:
      return state.set('completions', null);
    case _action_types.EDITOR.EMOJI_COMPLETER_SUCCESS:
    case _action_types.EDITOR.USER_COMPLETER_SUCCESS:
    case _action_types.PROFILE.LOCATION_AUTOCOMPLETE_SUCCESS:
      return state.set('completions', _editor_helper2.default.getCompletions(action));
    case _action_types.UPDATE_STATE_FROM_NATIVE:
      {
        if (!action.payload.editor.isEmpty()) {
          return action.payload.editor;
        }
        return state;
      }
    case _constants.REHYDRATE:
      if (action.payload.editor) {
        return _editor_helper2.default.rehydrateEditors(action.payload.editor);
      }
      return state;
    default:
      return state;
  }
};

exports.editorMethods = _editor_helper2.default;