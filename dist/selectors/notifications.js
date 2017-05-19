'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectAnnouncementHasBeenViewed = exports.selectAnnouncementIsUnread = exports.selectAnnouncementIsEmpty = exports.selectAnnouncementIsStaffPreview = exports.selectAnnouncementTitle = exports.selectAnnouncementImage = exports.selectAnnouncementId = exports.selectAnnouncementCTAHref = exports.selectAnnouncementCTACaption = exports.selectAnnouncementBody = exports.selectAnnouncement = exports.selectAnnouncements = undefined;

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _reselect = require('reselect');

var _mapping_types = require('../constants/mapping_types');

var _gui = require('./gui');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var selectAnnouncements = exports.selectAnnouncements = function selectAnnouncements(state) {
  return state.json.get(_mapping_types.ANNOUNCEMENTS, _immutable2.default.Map());
};

// Memoized selectors
var selectAnnouncement = exports.selectAnnouncement = (0, _reselect.createSelector)([selectAnnouncements], function (announcements) {
  return announcements.size && announcements.first() || _immutable2.default.Map();
});

// Properties on the announcement
var selectAnnouncementBody = exports.selectAnnouncementBody = (0, _reselect.createSelector)([selectAnnouncement], function (announcement) {
  return announcement.get('body');
});

var selectAnnouncementCTACaption = exports.selectAnnouncementCTACaption = (0, _reselect.createSelector)([selectAnnouncement], function (announcement) {
  return announcement.get('ctaCaption', 'Learn More');
});

var selectAnnouncementCTAHref = exports.selectAnnouncementCTAHref = (0, _reselect.createSelector)([selectAnnouncement], function (announcement) {
  return announcement.get('ctaHref');
});

var selectAnnouncementId = exports.selectAnnouncementId = (0, _reselect.createSelector)([selectAnnouncement], function (announcement) {
  return announcement.get('id');
});

var selectAnnouncementImage = exports.selectAnnouncementImage = (0, _reselect.createSelector)([selectAnnouncement], function (announcement) {
  return announcement.getIn(['image', 'hdpi', 'url']);
});

var selectAnnouncementTitle = exports.selectAnnouncementTitle = (0, _reselect.createSelector)([selectAnnouncement], function (announcement) {
  return announcement.get('header');
});

var selectAnnouncementIsStaffPreview = exports.selectAnnouncementIsStaffPreview = (0, _reselect.createSelector)([selectAnnouncement], function (announcement) {
  return announcement.get('isStaffPreview', false);
});

// Derived or additive properties
var selectAnnouncementIsEmpty = exports.selectAnnouncementIsEmpty = (0, _reselect.createSelector)([selectAnnouncement], function (announcement) {
  return announcement.isEmpty();
});

var selectAnnouncementIsUnread = exports.selectAnnouncementIsUnread = (0, _reselect.createSelector)([selectAnnouncements], function (announcements) {
  return !!(announcements && announcements.size);
});

var selectAnnouncementHasBeenViewed = exports.selectAnnouncementHasBeenViewed = (0, _reselect.createSelector)([selectAnnouncementId, selectAnnouncementIsUnread, _gui.selectLastAnnouncementSeen], function (announcementId, isUnread, lastAnnouncementSeen) {
  return !isUnread || announcementId === lastAnnouncementSeen;
});