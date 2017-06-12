import React from 'react'
import * as ACTION_TYPES from '../constants/action_types'
import * as MAPPING_TYPES from '../constants/mapping_types'
import * as api from '../networking/api'

export function searchForPosts(terms) {
  const { ZeroState } = api.ZERO_RENDERABLES
  return {
    type: ACTION_TYPES.LOAD_STREAM,
    payload: {
      endpoint: api.searchPosts({
        per_page: api.PER_PAGE,
        terms: encodeURIComponent(terms),
      }),
    },
    meta: {
      mappingType: MAPPING_TYPES.POSTS,
      renderStream: {
        asGrid: api.STREAM_RENDERABLES.postsAsGrid,
        asList: api.STREAM_RENDERABLES.postsAsList,
        asZero: <ZeroState />,
      },
      resultKey: '/search/posts',
    },
  }
}

export function searchForUsers(terms) {
  const { ZeroState } = api.ZERO_RENDERABLES
  return {
    type: ACTION_TYPES.LOAD_STREAM,
    payload: {
      endpoint: api.searchUsers({
        per_page: api.PER_PAGE,
        terms: encodeURIComponent(terms),
      }),
    },
    meta: {
      mappingType: MAPPING_TYPES.USERS,
      renderStream: {
        asGrid: api.STREAM_RENDERABLES.usersAsGrid,
        asList: api.STREAM_RENDERABLES.usersAsGrid,
        asZero: <ZeroState />,
      },
      resultKey: '/search/users',
    },
  }
}

