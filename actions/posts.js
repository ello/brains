'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createPost = createPost;
exports.deletePost = deletePost;
exports.flagPost = flagPost;
exports.loadComments = loadComments;
exports.loadEditablePost = loadEditablePost;
exports.loadPostDetail = loadPostDetail;
exports.loadRelatedPosts = loadRelatedPosts;
exports.lovePost = lovePost;
exports.watchPost = watchPost;
exports.toggleComments = toggleComments;
exports.toggleEditing = toggleEditing;
exports.toggleReposting = toggleReposting;
exports.unlovePost = unlovePost;
exports.unwatchPost = unwatchPost;
exports.updatePost = updatePost;

var _action_types = require('../constants/action_types');

var _mapping_types = require('../constants/mapping_types');

var MAPPING_TYPES = _interopRequireWildcard(_mapping_types);

var _api = require('../networking/api');

var api = _interopRequireWildcard(_api);

var _editor = require('../actions/editor');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function createPost(body, editorId, repostId, repostedFromId) {
  return {
    type: _action_types.POST.CREATE,
    payload: {
      body: body.length ? { body: body } : null,
      editorId: editorId,
      endpoint: api.createPost(repostId),
      method: 'POST'
    },
    meta: {
      mappingType: MAPPING_TYPES.POSTS,
      repostId: repostId,
      repostedFromId: repostedFromId,
      successAction: (0, _editor.resetEditor)(editorId)
    }
  };
}

function deletePost(post) {
  return {
    type: _action_types.POST.DELETE,
    payload: {
      endpoint: api.deletePost(post.get('id')),
      method: 'DELETE',
      model: post
    },
    meta: {}
  };
}

function flagPost(post, kind) {
  return {
    type: _action_types.POST.FLAG,
    payload: {
      endpoint: api.flagPost(post.get('id'), kind),
      method: 'POST'
    },
    meta: {}
  };
}

// commentsAsList needs the "parent post" so that the correct editor is referenced when replying to
// a comment.
function loadComments(postId) {
  var addUpdateKey = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

  var obj = {
    type: _action_types.LOAD_STREAM,
    payload: {
      endpoint: api.commentsForPost(postId),
      postIdOrToken: postId
    },
    meta: {
      mappingType: MAPPING_TYPES.COMMENTS,
      mergeResults: true,
      renderStream: {
        asList: api.STREAM_RENDERABLES.commentsAsList,
        asGrid: api.STREAM_RENDERABLES.commentsAsList
      },
      resultKey: '/posts/' + postId + '/comments',
      updateKey: '/posts/' + postId
    }
  };
  if (addUpdateKey) {
    obj.meta.updateKey = '/posts/' + postId + '/';
  }
  return obj;
}

function loadEditablePost(idOrToken) {
  return {
    type: _action_types.POST.EDITABLE,
    payload: { endpoint: api.editPostDetail(idOrToken) },
    meta: {
      mappingType: MAPPING_TYPES.POSTS,
      updateResult: false
    }
  };
}

function loadPostDetail(idOrToken, userIdOrToken) {
  return {
    type: _action_types.POST.DETAIL,
    payload: {
      endpoint: api.postDetail(idOrToken, userIdOrToken),
      postIdOrToken: idOrToken
    },
    meta: {
      mappingType: MAPPING_TYPES.POSTS,
      updateResult: false
    }
  };
}

function loadRelatedPosts(postId, perPage) {
  return {
    type: _action_types.LOAD_STREAM,
    payload: {
      endpoint: api.relatedPosts(postId, perPage),
      postIdOrToken: postId
    },
    meta: {
      mappingType: MAPPING_TYPES.POSTS,
      renderStream: {
        asList: api.STREAM_RENDERABLES.postsAsRelated,
        asGrid: api.STREAM_RENDERABLES.postsAsRelated
      },
      resultKey: '/posts/' + postId + '/related_posts'
    }
  };
}

function lovePost(_ref) {
  var post = _ref.post,
      trackLabel = _ref.trackLabel,
      trackOptions = _ref.trackOptions;

  var postId = post.get('id');
  return {
    type: _action_types.POST.LOVE,
    payload: {
      endpoint: api.lovePost(postId),
      method: 'POST',
      model: post,
      trackLabel: trackLabel,
      trackOptions: trackOptions
    },
    meta: {
      mappingType: MAPPING_TYPES.LOVES,
      resultKey: '/posts/' + postId + '/love',
      updateKey: '/posts/' + postId + '/'
    }
  };
}

function watchPost(post) {
  var postId = post.get('id');
  return {
    type: _action_types.POST.WATCH,
    payload: {
      endpoint: api.watchPost(postId),
      method: 'POST',
      model: post
    },
    meta: {
      mappingType: MAPPING_TYPES.WATCHES,
      resultKey: '/posts/' + postId + '/watch',
      updateKey: '/posts/' + postId + '/'
    }
  };
}

function toggleComments(post, showComments) {
  return {
    type: _action_types.POST.TOGGLE_COMMENTS,
    payload: {
      model: post,
      showComments: showComments
    }
  };
}

function toggleEditing(post, isEditing) {
  return {
    type: _action_types.POST.TOGGLE_EDITING,
    payload: {
      model: post,
      isEditing: isEditing
    }
  };
}

function toggleReposting(post, isReposting) {
  return {
    type: _action_types.POST.TOGGLE_REPOSTING,
    payload: {
      model: post,
      isReposting: isReposting
    }
  };
}

// Currently not tracking unlove's but trying to keep the api similar to the `lovePost` action.
function unlovePost(_ref2) {
  var post = _ref2.post,
      trackLabel = _ref2.trackLabel,
      trackOptions = _ref2.trackOptions;

  var postId = post.get('id');
  return {
    type: _action_types.POST.LOVE,
    payload: {
      endpoint: api.unlovePost(postId),
      method: 'DELETE',
      model: post,
      trackLabel: trackLabel,
      trackOptions: trackOptions
    },
    meta: {
      resultKey: '/posts/' + postId + '/love',
      updateKey: '/posts/' + postId + '/'
    }
  };
}

function unwatchPost(post) {
  var postId = post.get('id');
  return {
    type: _action_types.POST.WATCH,
    payload: {
      endpoint: api.unwatchPost(postId),
      method: 'DELETE',
      model: post
    },
    meta: {
      resultKey: '/posts/' + postId + '/watch',
      updateKey: '/posts/' + postId + '/'
    }
  };
}

function updatePost(post, body, editorId) {
  return {
    type: _action_types.POST.UPDATE,

    payload: {
      body: { body: body },
      editorId: editorId,
      endpoint: api.updatePost(post.get('id')),
      method: 'PATCH',
      model: post
    },
    meta: {
      mappingType: MAPPING_TYPES.POSTS
    }
  };
}