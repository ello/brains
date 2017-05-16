'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findBy = findBy;
exports.findModel = findModel;
exports.getLinkObject = getLinkObject;
exports.getLinkArray = getLinkArray;
// TODO: test these as they are data related
function findBy(params, collection, json) {
  var models = json ? json.get(collection) : null;
  if (!models) {
    return null;
  }
  return models.find(function (model) {
    return Object.keys(params).every(function (key) {
      return model.get(key) === params[key];
    });
  });
}

function findModel(json, initModel) {
  if (!initModel || !initModel.findObj || !initModel.collection) {
    return null;
  }
  return findBy(initModel.findObj, initModel.collection, json);
}

function getLinkObject(model, identifier, json) {
  var link = model.getIn(['links', identifier]);
  if (!link) {
    return null;
  }
  var key = link.get('id', link);
  var mappingType = link.get('type', identifier);
  var deletedCollection = json['deleted_' + mappingType];
  if (!deletedCollection || deletedCollection.indexOf(key) === -1) {
    return json.getIn([mappingType, key]);
  }
  return null;
}

function getLinkArray(model, identifier, json) {
  if (!model) {
    return null;
  }
  var link = model.getIn(['links', identifier]);
  if (!link) {
    return null;
  }
  var keys = link.get('ids', link);
  var mappingType = link.get('type', identifier);
  var collection = json.get(mappingType);
  var deletedCollection = json.get('deleted_' + mappingType);
  if (keys.size && collection) {
    // filter they keys so that models that don't exist
    // aren't added to the link object mainly used for
    // when a model gets deleted ie: post or comment
    var filteredKeys = keys.filter(function (key) {
      return collection.get(key) && (!deletedCollection || deletedCollection.includes(key));
    });
    return filteredKeys.map(function (key) {
      return collection.get(key);
    });
  }
  return null;
}