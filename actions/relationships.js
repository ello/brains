'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.batchUpdateRelationship = batchUpdateRelationship;
exports.updateRelationship = updateRelationship;

var _action_types = require('../constants/action_types');

var _mapping_types = require('../constants/mapping_types');

var MAPPING_TYPES = _interopRequireWildcard(_mapping_types);

var _api = require('../networking/api');

var api = _interopRequireWildcard(_api);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function batchUpdateRelationship(userIds, priority) {
  return {
    type: _action_types.RELATIONSHIPS.BATCH_UPDATE_INTERNAL,
    payload: { userIds: userIds, priority: priority }
  };
}

function updateRelationship(userId, priority, existing) {
  var internal = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

  var action = internal ? {
    type: _action_types.RELATIONSHIPS.UPDATE_INTERNAL,
    meta: { mappingType: MAPPING_TYPES.RELATIONSHIPS },
    payload: { userId: userId, priority: priority, existing: existing }
  } : {
    type: _action_types.RELATIONSHIPS.UPDATE,
    meta: { mappingType: MAPPING_TYPES.RELATIONSHIPS },
    payload: {
      endpoint: api.relationshipAdd(userId, priority),
      existing: existing,
      method: 'POST',
      priority: priority,
      userId: userId
    }
  };
  return action;
}