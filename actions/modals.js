'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.openModal = openModal;
exports.closeModal = closeModal;
exports.openAlert = openAlert;
exports.closeAlert = closeAlert;

var _action_types = require('../constants/action_types');

function openModal(component) {
  var classList = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var trackLabel = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  var trackOptions = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;

  return {
    type: _action_types.MODAL.OPEN,
    payload: {
      classList: classList,
      component: component,
      isActive: true,
      kind: 'Modal',
      trackLabel: trackLabel,
      trackOptions: trackOptions,
      type: type
    }
  };
}

function closeModal() {
  return {
    type: _action_types.MODAL.CLOSE,
    payload: {
      classList: null,
      component: null,
      isActive: false,
      kind: 'Modal',
      type: null
    }
  };
}

function openAlert(component) {
  var classList = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var trackLabel = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  var trackOptions = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;

  return {
    type: _action_types.ALERT.OPEN,
    payload: {
      classList: classList,
      component: component,
      isActive: true,
      kind: 'Alert',
      trackLabel: trackLabel,
      trackOptions: trackOptions,
      type: type
    }
  };
}

function closeAlert() {
  return {
    type: _action_types.ALERT.CLOSE,
    payload: {
      classList: null,
      component: null,
      isActive: false,
      kind: 'Alert',
      type: null
    }
  };
}