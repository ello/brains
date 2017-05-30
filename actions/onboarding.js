'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.relationshipBatchSave = relationshipBatchSave;

var _action_types = require('../constants/action_types');

var ACTION_TYPES = _interopRequireWildcard(_action_types);

var _mapping_types = require('../constants/mapping_types');

var MAPPING_TYPES = _interopRequireWildcard(_mapping_types);

var _api = require('../networking/api');

var api = _interopRequireWildcard(_api);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

// TODO: Update the `body` and `user_ids`
function relationshipBatchSave(ids) {
  var priority = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'friend';

  return {
    type: ACTION_TYPES.POST_JSON,
    meta: { mappingType: MAPPING_TYPES.RELATIONSHIPS },
    payload: {
      method: 'POST',
      endpoint: api.relationshipBatchPath(),
      body: { user_ids: ids, priority: priority }
    }
  };
}

exports.default = relationshipBatchSave;