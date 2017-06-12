import * as ACTION_TYPES from '../constants/action_types'
import * as MAPPING_TYPES from '../constants/mapping_types'
import * as api from '../networking/api'
import * as StreamFilters from '../components/streams/StreamFilters'

export function getCategories() {
  return {
    type: ACTION_TYPES.LOAD_STREAM,
    payload: { endpoint: api.categories() },
    meta: {
      mappingType: MAPPING_TYPES.CATEGORIES,
      renderStream: {
        asList: api.STREAM_RENDERABLES.categoriesAsGrid,
        asGrid: api.STREAM_RENDERABLES.categoriesAsGrid,
      },
      resultFilter: StreamFilters.sortedCategories,
      resultKey: 'all-categories',
    },
  }
}

export function getPagePromotionals() {
  return {
    type: ACTION_TYPES.LOAD_STREAM,
    payload: { endpoint: api.pagePromotionals() },
    meta: {
      mappingType: MAPPING_TYPES.PAGE_PROMOTIONALS,
      resultKey: '/page_promotionals',
    },
  }
}

export function loadCategoryPosts(type) {
  return {
    type: ACTION_TYPES.LOAD_STREAM,
    payload: { endpoint: api.categoryPosts(type) },
    meta: {
      mappingType: MAPPING_TYPES.POSTS,
      renderStream: {
        asList: api.STREAM_RENDERABLES.postsAsList,
        asGrid: api.STREAM_RENDERABLES.postsAsGrid,
      },
    },
  }
}

export function loadDiscoverPosts(type) {
  return {
    type: ACTION_TYPES.LOAD_STREAM,
    payload: { endpoint: api.discoverPosts(type) },
    meta: {
      mappingType: MAPPING_TYPES.POSTS,
      renderStream: {
        asList: api.STREAM_RENDERABLES.postsAsList,
        asGrid: api.STREAM_RENDERABLES.postsAsGrid,
      },
    },
  }
}

export function loadCommunities() {
  return {
    type: ACTION_TYPES.LOAD_STREAM,
    payload: { endpoint: api.communitiesPath() },
    meta: {
      mappingType: MAPPING_TYPES.USERS,
      renderStream: {
        asList: api.STREAM_RENDERABLES.usersAsGrid,
        asGrid: api.STREAM_RENDERABLES.usersAsGrid,
      },
    },
  }
}

export function loadFeaturedUsers() {
  return {
    type: ACTION_TYPES.LOAD_STREAM,
    payload: { endpoint: api.awesomePeoplePath() },
    meta: {
      mappingType: MAPPING_TYPES.USERS,
      renderStream: {
        asList: api.STREAM_RENDERABLES.usersAsGrid,
        asGrid: api.STREAM_RENDERABLES.usersAsGrid,
      },
    },
  }
}

export function bindDiscoverKey(type) {
  return {
    type: ACTION_TYPES.GUI.BIND_DISCOVER_KEY,
    payload: { type },
  }
}
