'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addDragObject = addDragObject;
exports.removeDragObject = removeDragObject;
var dragObjects = [];
var dragThreshold = 5;
var dragX = 0;
var dragY = 0;
var dragged = false;
var hasListeners = false;
var isDragging = false;
var lastDragX = 0;
var lastDragY = 0;
var lastX = -1;
var lastY = -1;
var target = null;
var totalDrag = 0;
var totalDragX = 0;
var totalDragY = 0;

function reset() {
  dragX = 0;
  dragY = 0;
  dragged = false;
  isDragging = false;
  lastDragX = 0;
  lastDragY = 0;
  lastX = -1;
  lastY = -1;
  target = null;
  totalDrag = 0;
  totalDragX = 0;
  totalDragY = 0;
}

function callMethod(method) {
  var props = {
    dragX: dragX,
    dragY: dragY,
    dragged: dragged,
    lastDragX: lastDragX,
    lastDragY: lastDragY,
    lastX: lastX,
    lastY: lastY,
    target: target,
    totalDrag: totalDrag,
    totalDragX: totalDragX,
    totalDragY: totalDragY
  };
  dragObjects.forEach(function (obj) {
    if (obj.component[method] && target.dataset.dragId === obj.dragId) {
      obj.component[method](props);
    }
  });
}

function dragMove(x, y) {
  lastDragX = dragX;
  lastDragY = dragY;
  dragX += x - lastX;
  dragY += y - lastY;
  totalDragX += Math.abs(x - lastX);
  totalDragY += Math.abs(y - lastY);
  lastX = x;
  lastY = y;
  totalDrag = totalDragX + totalDragY;
  dragged = totalDrag > dragThreshold;
  callMethod('onDragMove');
}

function mouseMove(e) {
  if (!isDragging) return;
  dragMove(e.clientX, e.clientY);
}

function touchMove(e) {
  if (!isDragging) return;
  dragMove(e.touches[0].clientX, e.touches[0].clientY);
}

function dragEnd() {
  if (!isDragging) return;
  callMethod('onDragEnd');
  document.removeEventListener('mousemove', mouseMove);
  document.removeEventListener('touchmove', touchMove);
  document.removeEventListener('mouseup', dragEnd);
  document.removeEventListener('touchend', dragEnd);
  // this gives us enough time to respond on the frame
  // of the mouse/touch event to know if we dragged when it fired.
  requestAnimationFrame(function () {
    reset();
  });
}

function dragStart(x, y, t) {
  reset();
  target = t;
  lastX = x;
  lastY = y;
  isDragging = true;
  callMethod('onDragStart');
  document.addEventListener('mousemove', mouseMove);
  document.addEventListener('touchmove', touchMove);
  document.addEventListener('mouseup', dragEnd);
  document.addEventListener('touchend', dragEnd);
}

function mouseDown(e) {
  // return if not the drag handler || fix android exception
  if (e.target && typeof e.target.className === 'string' && e.target.className.indexOf('DragHandler') === -1 || !e.target.classList) {
    return;
  }
  dragStart(e.clientX, e.clientY, e.target);
}

function touchStart(e) {
  // return if not the drag handler || fix android exception
  if (e.target.className.indexOf('DragHandler') === -1 || !e.target.classList) return;
  dragStart(e.touches[0].clientX, e.touches[0].clientY);
}

function addListeners() {
  document.addEventListener('mousedown', mouseDown);
  document.addEventListener('touchstart', touchStart);
}

function removeListeners() {
  document.removeEventListener('mousedown', mouseDown);
  document.removeEventListener('touchstart', touchStart);
  document.removeEventListener('mousemove', mouseMove);
  document.removeEventListener('touchmove', touchMove);
  document.removeEventListener('mouseup', dragEnd);
  document.removeEventListener('touchend', dragEnd);
}

function addDragObject(obj) {
  if (dragObjects.indexOf(obj) === -1) {
    dragObjects.push(obj);
  }
  if (dragObjects.length === 1 && !hasListeners) {
    hasListeners = true;
    addListeners();
  }
}

function removeDragObject(obj) {
  var index = dragObjects.indexOf(obj);
  if (index > -1) {
    dragObjects.splice(index, 1);
  }
  if (dragObjects.length === 0) {
    hasListeners = false;
    removeListeners();
  }
}