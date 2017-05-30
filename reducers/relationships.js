'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.jsonReducer = exports.default = undefined;

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _action_types = require('../constants/action_types');

var ACTION_TYPES = _interopRequireWildcard(_action_types);

var _mapping_types = require('../constants/mapping_types');

var MAPPING_TYPES = _interopRequireWildcard(_mapping_types);

var _relationship_types = require('../constants/relationship_types');

var _json = require('../reducers/json');

var jsonReducer = _interopRequireWildcard(_json);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var methods = {}; /* eslint-disable no-param-reassign */


methods.removeIdFromDeletedArray = function (state, type, id) {
  var delArr = state.get('deleted_' + type, _immutable2.default.List());
  if (!delArr.isEmpty()) {
    var index = delArr.indexOf('' + id);
    if (index > -1) {
      return state.set('deleted_' + type, delArr.splice(index, 1));
    }
  }
  return state;
};

methods.relationshipUpdateSuccess = function (state, action) {
  var response = action.payload.response;
  var owner = response.owner,
      subject = response.subject;

  if (owner) {
    state = state.setIn([MAPPING_TYPES.USERS, owner.id], _immutable2.default.fromJS(owner));
  }
  if (subject) {
    state = state.setIn([MAPPING_TYPES.USERS, subject.id], _immutable2.default.fromJS(subject));
  }
  return state;
};

methods.addItemsForAuthor = function (state, mappingType, authorId) {
  state.get(mappingType, _immutable2.default.Map()).valueSeq().forEach(function (model) {
    if (model.get('authorId') === authorId) {
      state = methods.removeIdFromDeletedArray(state, mappingType, model.get('id'));
    }
  });
  return state;
};

methods.removeItemsForAuthor = function (state, mappingType, authorId) {
  state.get(mappingType, _immutable2.default.Map()).valueSeq().forEach(function (model) {
    if (model.get('authorId') === authorId) {
      var action = {
        type: '_REQUEST',
        payload: {
          model: state.getIn([mappingType, model.get('id')])
        }
      };
      state = jsonReducer.methods.deleteModel(state, action, mappingType);
    }
  });
  return state;
};

methods.blockUser = function (state, userId) {
  // update blockedCount
  state = jsonReducer.methods.updateUserCount(state, userId, 'blockedCount', 1);
  // delete the user
  var userAction = {
    type: '_REQUEST',
    payload: {
      model: state.getIn([MAPPING_TYPES.USERS, userId])
    }
  };
  state = jsonReducer.methods.deleteModel(state, userAction, MAPPING_TYPES.USERS);
  // delete all of their posts
  state = methods.removeItemsForAuthor(state, MAPPING_TYPES.POSTS, userId);
  // delete all of their comments
  return methods.removeItemsForAuthor(state, MAPPING_TYPES.COMMENTS, userId);
};

methods.unblockUser = function (state, userId) {
  // update blockedCount
  state = jsonReducer.methods.updateUserCount(state, userId, 'blockedCount', -1);
  // remove the user from the deleted user ids array
  state = methods.removeIdFromDeletedArray(state, MAPPING_TYPES.USERS, userId);
  // add back all of their posts
  state = methods.addItemsForAuthor(state, MAPPING_TYPES.POSTS, userId);
  // add back all of their comments
  return methods.addItemsForAuthor(state, MAPPING_TYPES.COMMENTS, userId);
};

methods.updateRelationship = function (state, action) {
  // on success just return the owner subject mapped back on users
  if (action.type === ACTION_TYPES.RELATIONSHIPS.UPDATE_SUCCESS) {
    return methods.relationshipUpdateSuccess(state, action);
  }
  var _action$payload = action.payload,
      userId = _action$payload.userId,
      priority = _action$payload.priority;

  var user = state.getIn([MAPPING_TYPES.USERS, userId]);
  var prevPriority = user.get('relationshipPriority');
  switch (prevPriority) {
    case _relationship_types.RELATIONSHIP_PRIORITY.BLOCK:
      state = methods.unblockUser(state, userId);
      break;
    case _relationship_types.RELATIONSHIP_PRIORITY.MUTE:
      state = jsonReducer.methods.updateUserCount(state, userId, 'mutedCount', -1);
      break;
    case _relationship_types.RELATIONSHIP_PRIORITY.FRIEND:
    case _relationship_types.RELATIONSHIP_PRIORITY.NOISE:
      if (priority !== _relationship_types.RELATIONSHIP_PRIORITY.FRIEND && priority !== _relationship_types.RELATIONSHIP_PRIORITY.NOISE) {
        state = jsonReducer.methods.updateUserCount(state, userId, 'followersCount', -1);
      }
      break;
    default:
      break;
  }
  switch (priority) {
    case _relationship_types.RELATIONSHIP_PRIORITY.FRIEND:
    case _relationship_types.RELATIONSHIP_PRIORITY.NOISE:
      if (prevPriority !== _relationship_types.RELATIONSHIP_PRIORITY.FRIEND && prevPriority !== _relationship_types.RELATIONSHIP_PRIORITY.NOISE) {
        state = jsonReducer.methods.updateUserCount(state, userId, 'followersCount', 1);
      }
      break;
    case _relationship_types.RELATIONSHIP_PRIORITY.BLOCK:
      state = methods.blockUser(state, userId);
      break;
    case _relationship_types.RELATIONSHIP_PRIORITY.MUTE:
      state = jsonReducer.methods.updateUserCount(state, userId, 'mutedCount', 1);
      break;
    default:
      break;
  }
  // update local user
  return jsonReducer.methods.mergeModel(state, MAPPING_TYPES.USERS, {
    id: userId,
    relationshipPriority: priority
  });
};

methods.batchUpdateRelationship = function (state, action) {
  var _action$payload2 = action.payload,
      priority = _action$payload2.priority,
      userIds = _action$payload2.userIds;

  userIds.forEach(function (id) {
    state = jsonReducer.methods.mergeModel(state, MAPPING_TYPES.USERS, {
      id: id,
      relationshipPriority: priority
    });
  });
  return state;
};

exports.default = methods;
exports.jsonReducer = jsonReducer;