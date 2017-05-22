'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectPostFirstImage = exports.selectPostDetailTabs = exports.selectPostShowCommentEditor = exports.selectPostShowEditor = exports.selectPostRepostAuthorWithFallback = exports.selectPostRepostAuthor = exports.selectPostIsWatching = exports.selectPostIsReposting = exports.selectPostIsRepost = exports.selectPostIsOwnOriginal = exports.selectPostIsOwn = exports.selectPostIsGridMode = exports.selectPostIsEmpty = exports.selectPostIsEditing = exports.selectPostIsCommentsRequesting = exports.selectPostDetailPath = exports.selectPostCategorySlug = exports.selectPostCategoryName = exports.selectPostCategory = exports.selectPostCategories = exports.selectPostRepostAuthorId = exports.selectPostHasRelatedButton = exports.selectPostAuthorHasCommentingEnabled = exports.selectPostAuthorUsername = exports.selectPostAuthor = exports.selectPostMetaUrl = exports.selectPostMetaTitle = exports.selectPostMetaRobots = exports.selectPostMetaImages = exports.selectPostMetaEmbeds = exports.selectPostMetaCanonicalUrl = exports.selectPostMetaDescription = exports.selectPostWatching = exports.selectPostViewsCountRounded = exports.selectPostViewsCount = exports.selectPostToken = exports.selectPostSummary = exports.selectPostShowComments = exports.selectPostRepostsCount = exports.selectPostReposted = exports.selectPostRepostId = exports.selectPostRepostContent = exports.selectPostLovesCount = exports.selectPostLoved = exports.selectPostMetaAttributes = exports.selectPostIsAdultContent = exports.selectPostId = exports.selectPostHref = exports.selectPostCreatedAt = exports.selectPostContentWarning = exports.selectPostContent = exports.selectPostCommentsCount = exports.selectPostBody = exports.selectPostAuthorId = exports.addAssetToRegion = exports.selectPost = exports.selectPosts = exports.selectPropsLocationStateFrom = exports.selectPropsPostIsRelated = exports.selectPropsPostId = undefined;

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _reselect = require('reselect');

var _get = require('lodash/get');

var _get2 = _interopRequireDefault(_get);

var _pages = require('./pages');

var _params = require('./params');

var _categories = require('./categories');

var _action_types = require('../constants/action_types');

var _mapping_types = require('../constants/mapping_types');

var _routing = require('./routing');

var _assets = require('./assets');

var _number_to_human = require('../lib/number_to_human');

var _authentication = require('./authentication');

var _gui = require('./gui');

var _profile = require('./profile');

var _stream = require('./stream');

var _user = require('./user');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var countProtector = function countProtector(count) {
  return count < 0 ? 0 : count;
};

var selectPropsPostId = exports.selectPropsPostId = function selectPropsPostId(state, props) {
  return (0, _get2.default)(props, 'postId') || (0, _get2.default)(props, 'post', _immutable2.default.Map()).get('id');
};

var selectPropsPostIsRelated = exports.selectPropsPostIsRelated = function selectPropsPostIsRelated(state, props) {
  return (0, _get2.default)(props, 'isRelatedPost', false);
};
var selectPropsLocationStateFrom = exports.selectPropsLocationStateFrom = function selectPropsLocationStateFrom(state, props) {
  return (0, _get2.default)(props, ['location', 'state', 'from'], null);
};
var selectPosts = exports.selectPosts = function selectPosts(state) {
  return state.json.get(_mapping_types.POSTS, _immutable2.default.Map());
};

// Memoized selectors
// Requires `postId`, `post` or `params.token` to be found in props
var selectPost = exports.selectPost = (0, _reselect.createSelector)([selectPropsPostId, _params.selectParamsToken, selectPosts], function (id, token, posts) {
  if (id) {
    return posts.get(id, _immutable2.default.Map());
  } else if (token) {
    return posts.find(function (post) {
      return post.get('token') === token;
    }) || _immutable2.default.Map();
  }
  return _immutable2.default.Map();
});

var addAssetToRegion = exports.addAssetToRegion = function addAssetToRegion(region, assets) {
  if (region.get('kind') === 'image') {
    var assetId = region.getIn(['links', 'assets'], -1);
    if (assetId < 0) {
      var assetMatch = region.getIn(['content', 'url'], '').match(/asset\/attachment\/(\d+)\//);
      if (assetMatch) {
        assetId = '' + assetMatch[1];
      }
    }
    var asset = assets.get(assetId);
    if (asset) {
      return region.set('asset', asset);
    }
  }
  return region;
};

// Properties on the post reducer
var selectPostAuthorId = exports.selectPostAuthorId = (0, _reselect.createSelector)([selectPost], function (post) {
  return post.get('authorId');
});
var selectPostBody = exports.selectPostBody = (0, _reselect.createSelector)([selectPost], function (post) {
  return post.get('body');
});
var selectPostCommentsCount = exports.selectPostCommentsCount = (0, _reselect.createSelector)([selectPost], function (post) {
  return countProtector(post.get('commentsCount'));
});
var selectPostContent = exports.selectPostContent = (0, _reselect.createSelector)([selectPost, _assets.selectAssets], function (post, assets) {
  return post.get('content', _immutable2.default.Map()).map(function (region) {
    return addAssetToRegion(region, assets);
  });
});
var selectPostContentWarning = exports.selectPostContentWarning = (0, _reselect.createSelector)([selectPost], function (post) {
  return post.get('contentWarning');
});
var selectPostCreatedAt = exports.selectPostCreatedAt = (0, _reselect.createSelector)([selectPost], function (post) {
  return post.get('createdAt');
});
var selectPostHref = exports.selectPostHref = (0, _reselect.createSelector)([selectPost], function (post) {
  return post.get('href');
});
var selectPostId = exports.selectPostId = (0, _reselect.createSelector)([selectPost], function (post) {
  return post.get('id');
});
var selectPostIsAdultContent = exports.selectPostIsAdultContent = (0, _reselect.createSelector)([selectPost], function (post) {
  return post.get('isAdultContent');
});
var selectPostMetaAttributes = exports.selectPostMetaAttributes = (0, _reselect.createSelector)([selectPost], function (post) {
  return post.get('metaAttributes', _immutable2.default.Map());
});
var selectPostLoved = exports.selectPostLoved = (0, _reselect.createSelector)([selectPost], function (post) {
  return post.get('loved');
});
var selectPostLovesCount = exports.selectPostLovesCount = (0, _reselect.createSelector)([selectPost], function (post) {
  return countProtector(post.get('lovesCount'));
});
var selectPostRepostContent = exports.selectPostRepostContent = (0, _reselect.createSelector)([selectPost, _assets.selectAssets], function (post, assets) {
  return post.get('repostContent', _immutable2.default.Map()).map(function (region) {
    return addAssetToRegion(region, assets);
  });
});
var selectPostRepostId = exports.selectPostRepostId = (0, _reselect.createSelector)([selectPost], function (post) {
  return post.get('repostId');
});
var selectPostReposted = exports.selectPostReposted = (0, _reselect.createSelector)([selectPost], function (post) {
  return post.get('reposted');
});
var selectPostRepostsCount = exports.selectPostRepostsCount = (0, _reselect.createSelector)([selectPost], function (post) {
  return countProtector(post.get('repostsCount'));
});
var selectPostShowComments = exports.selectPostShowComments = (0, _reselect.createSelector)([selectPost], function (post) {
  return post.get('showComments', false);
});
var selectPostSummary = exports.selectPostSummary = (0, _reselect.createSelector)([selectPost, _assets.selectAssets], function (post, assets) {
  return post.get('summary', _immutable2.default.Map()).map(function (region) {
    return addAssetToRegion(region, assets);
  });
});
var selectPostToken = exports.selectPostToken = (0, _reselect.createSelector)([selectPost], function (post) {
  return post.get('token');
});
var selectPostViewsCount = exports.selectPostViewsCount = (0, _reselect.createSelector)([selectPost], function (post) {
  return countProtector(post.get('viewsCount'));
});
var selectPostViewsCountRounded = exports.selectPostViewsCountRounded = (0, _reselect.createSelector)([selectPostViewsCount], function (count) {
  return (0, _number_to_human.numberToHuman)(count, false);
});
var selectPostWatching = exports.selectPostWatching = (0, _reselect.createSelector)([selectPost], function (post) {
  return post.get('watching');
});

// Nested properties on the post reducer
var selectPostMetaDescription = exports.selectPostMetaDescription = (0, _reselect.createSelector)([selectPostMetaAttributes], function (metaAttributes) {
  return metaAttributes.get('description');
});

var selectPostMetaCanonicalUrl = exports.selectPostMetaCanonicalUrl = (0, _reselect.createSelector)([selectPostMetaAttributes], function (metaAttributes) {
  return metaAttributes.get('canonicalUrl');
});

var selectPostMetaEmbeds = exports.selectPostMetaEmbeds = (0, _reselect.createSelector)([selectPostMetaAttributes], function (metaAttributes) {
  var embeds = (metaAttributes.get('embeds') || _immutable2.default.List()).toArray();
  var openGraphEmbeds = embeds.map(function (embed) {
    return { property: 'og:video', content: embed };
  });
  return { openGraphEmbeds: openGraphEmbeds };
});

var selectPostMetaImages = exports.selectPostMetaImages = (0, _reselect.createSelector)([selectPostMetaAttributes], function (metaAttributes) {
  var images = (metaAttributes.get('images') || _immutable2.default.List()).toArray();
  var openGraphImages = images.map(function (image) {
    return { property: 'og:image', content: image };
  });
  var schemaImages = images.map(function (image) {
    return { name: 'image', itemprop: 'image', content: image };
  });
  return { openGraphImages: openGraphImages, schemaImages: schemaImages };
});

var selectPostMetaRobots = exports.selectPostMetaRobots = (0, _reselect.createSelector)([selectPostMetaAttributes], function (metaAttributes) {
  return metaAttributes.get('robots');
});

var selectPostMetaTitle = exports.selectPostMetaTitle = (0, _reselect.createSelector)([selectPostMetaAttributes], function (metaAttributes) {
  return metaAttributes.get('title');
});

var selectPostMetaUrl = exports.selectPostMetaUrl = (0, _reselect.createSelector)([selectPostMetaAttributes], function (metaAttributes) {
  return metaAttributes.get('url');
});

// Derived or additive properties
var selectPostAuthor = exports.selectPostAuthor = (0, _reselect.createSelector)([_user.selectUsers, selectPostAuthorId], function (users, authorId) {
  return users.get(authorId, _immutable2.default.Map());
});

var selectPostAuthorUsername = exports.selectPostAuthorUsername = (0, _reselect.createSelector)([selectPostAuthor], function (author) {
  return author.get('username');
});

var selectPostAuthorHasCommentingEnabled = exports.selectPostAuthorHasCommentingEnabled = (0, _reselect.createSelector)([selectPostAuthor], function (author) {
  return author.get('hasCommentingEnabled');
});

var selectPostHasRelatedButton = exports.selectPostHasRelatedButton = (0, _reselect.createSelector)([selectPostId, _pages.selectPages, _gui.selectIsMobile], function (postId, pages, isMobile) {
  return !pages.getIn(['/posts/' + postId + '/related_posts', 'ids'], _immutable2.default.List()).isEmpty() && !isMobile;
});

// TODO: Pull other properties out of post.get('links')?
var selectPostRepostAuthorId = exports.selectPostRepostAuthorId = (0, _reselect.createSelector)([selectPost], function (post) {
  return post.getIn(['links', 'repostAuthor', 'id']);
});

var selectPostCategories = exports.selectPostCategories = (0, _reselect.createSelector)([selectPost], function (post) {
  return post.getIn(['links', 'categories'], _immutable2.default.List());
});

var selectPostCategory = exports.selectPostCategory = (0, _reselect.createSelector)([_categories.selectCategoryCollection, selectPostCategories], function (collection, categories) {
  return collection && collection.get(categories ? '' + categories.first() : null);
});

var selectPostCategoryName = exports.selectPostCategoryName = (0, _reselect.createSelector)([selectPostCategory], function (category) {
  return category && category.get('name', null);
});

var selectPostCategorySlug = exports.selectPostCategorySlug = (0, _reselect.createSelector)([selectPostCategory], function (category) {
  return category ? '/discover/' + category.get('slug') : null;
});

var selectPostDetailPath = exports.selectPostDetailPath = (0, _reselect.createSelector)([selectPostAuthorUsername, selectPostToken], function (username, token) {
  return '/' + username + '/post/' + token;
});

var selectPostIsCommentsRequesting = exports.selectPostIsCommentsRequesting = (0, _reselect.createSelector)([_stream.selectStreamType, _stream.selectStreamMappingType, _stream.selectStreamPostIdOrToken, selectPostId, selectPostToken], function (streamType, streamMappingType, streamPostIdOrToken, postId, postToken) {
  return streamType === _action_types.LOAD_STREAM_REQUEST && streamMappingType === _mapping_types.COMMENTS && ('' + streamPostIdOrToken === '' + postId || '' + streamPostIdOrToken === '' + postToken);
});

var selectPostIsEditing = exports.selectPostIsEditing = (0, _reselect.createSelector)([selectPost], function (post) {
  return post.get('isEditing', false);
});

var selectPostIsEmpty = exports.selectPostIsEmpty = (0, _reselect.createSelector)([selectPost], function (post) {
  return post.isEmpty();
});

var selectPostIsGridMode = exports.selectPostIsGridMode = (0, _reselect.createSelector)([_routing.selectIsPostDetail, _gui.selectIsGridMode, selectPropsPostIsRelated], function (isPostDetail, isGridMode, isRelated) {
  return isPostDetail ? isRelated : isGridMode;
});

var selectPostIsOwn = exports.selectPostIsOwn = (0, _reselect.createSelector)([selectPostAuthorId, _profile.selectId], function (authorId, profileId) {
  return '' + authorId === '' + profileId;
});

var selectPostIsOwnOriginal = exports.selectPostIsOwnOriginal = (0, _reselect.createSelector)([selectPostRepostAuthorId, _profile.selectId], function (repostAuthorId, profileId) {
  return '' + repostAuthorId === '' + profileId;
});

var selectPostIsRepost = exports.selectPostIsRepost = (0, _reselect.createSelector)([selectPostRepostContent], function (repostContent) {
  return !!(repostContent && repostContent.size);
});

var selectPostIsReposting = exports.selectPostIsReposting = (0, _reselect.createSelector)([selectPost], function (post) {
  return post.get('isReposting', false);
});

var selectPostIsWatching = exports.selectPostIsWatching = (0, _reselect.createSelector)([_authentication.selectIsLoggedIn, selectPostWatching], function (isLoggedIn, watching) {
  return isLoggedIn && watching;
});

var selectPostRepostAuthor = exports.selectPostRepostAuthor = (0, _reselect.createSelector)([_user.selectUsers, selectPostRepostAuthorId], function (users, repostAuthorId) {
  return users.get(repostAuthorId, _immutable2.default.Map());
});

var selectPostRepostAuthorWithFallback = exports.selectPostRepostAuthorWithFallback = (0, _reselect.createSelector)([selectPostIsRepost, selectPostRepostAuthor, selectPostAuthor], function (isRepost, repostAuthor, author) {
  return isRepost ? repostAuthor.get('id') && repostAuthor || author : null;
});

// Editor and drawer states for a given post
var selectPostShowEditor = exports.selectPostShowEditor = (0, _reselect.createSelector)([selectPostIsEditing, selectPostIsReposting, selectPostBody, selectPropsPostIsRelated], function (isEditing, isReposting, postBody, isRelated) {
  return !!((isEditing || isReposting) && postBody) && !isRelated;
});

var selectPostShowCommentEditor = exports.selectPostShowCommentEditor = (0, _reselect.createSelector)([selectPostShowEditor, selectPostShowComments, _routing.selectIsPostDetail, selectPropsPostIsRelated], function (showEditor, showComments, isPostDetail, isRelated) {
  return !showEditor && !isPostDetail && showComments && !isRelated;
});

var selectPostDetailCommentLabel = (0, _reselect.createSelector)([selectPostCommentsCount, selectPostAuthorHasCommentingEnabled, _authentication.selectIsLoggedIn], function (commentsCount, hasCommentingEnabled, isLoggedIn) {
  if (!hasCommentingEnabled || !isLoggedIn && Number(commentsCount) < 1) {
    return null;
  }
  return Number(commentsCount) > 0 ? (0, _number_to_human.numberToHuman)(commentsCount) + ' Comment' + (commentsCount === 1 ? '' : 's') : 'Comments';
});

var selectPostDetailLovesLabel = (0, _reselect.createSelector)([selectPostLovesCount], function (lovesCount) {
  return Number(lovesCount) > 0 ? (0, _number_to_human.numberToHuman)(lovesCount) + ' Love' + (lovesCount === 1 ? '' : 's') : null;
});

var selectPostDetailRepostsLabel = (0, _reselect.createSelector)([selectPostRepostsCount], function (repostsCount) {
  return Number(repostsCount) > 0 ? (0, _number_to_human.numberToHuman)(repostsCount) + ' Repost' + (repostsCount === 1 ? '' : 's') : null;
});

var selectPostDetailTabs = exports.selectPostDetailTabs = (0, _reselect.createSelector)([selectPostDetailCommentLabel, selectPostDetailLovesLabel, selectPostDetailRepostsLabel], function (commentsLabel, lovesLabel, repostsLabel) {
  return [commentsLabel && { type: 'comments', children: commentsLabel }, lovesLabel && { type: 'loves', children: lovesLabel }, repostsLabel && { type: 'reposts', children: repostsLabel }].filter(function (tab) {
    return tab;
  });
});

var selectPostFirstImage = exports.selectPostFirstImage = (0, _reselect.createSelector)([selectPostSummary], function (blocks) {
  if (blocks.isEmpty()) {
    return _immutable2.default.Map();
  }
  return blocks.filter(function (block) {
    return (/image/.test(block.get('kind')) && block.getIn(['asset', 'attachment'])
    );
  }).map(function (block) {
    return block.getIn(['asset', 'attachment']);
  }).first();
});