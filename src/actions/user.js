import React from 'react'
import * as ACTION_TYPES from '../constants/action_types'
import * as MAPPING_TYPES from '../constants/mapping_types'
import * as api from '../networking/api'
import * as StreamFilters from '../components/streams/StreamFilters'

export function flagUser(username, kind) {
  return {
    type: ACTION_TYPES.USER.FLAG,
    payload: {
      endpoint: api.flagUser(`~${username}`, kind),
      method: 'POST',
    },
    meta: {},
  }
}

export function loadUserDetail(username) {
  return {
    type: ACTION_TYPES.USER.DETAIL,
    payload: { endpoint: api.userDetail(username) },
    meta: {
      mappingType: MAPPING_TYPES.USERS,
      updateResult: false,
    },
  }
}

export function loadUserPosts(username, type) {
  return {
    type: ACTION_TYPES.LOAD_STREAM,
    payload: { endpoint: api.userResources(username, type) },
    meta: {
      mappingType: MAPPING_TYPES.POSTS,
      renderStream: {
        asList: api.STREAM_RENDERABLES.postsAsList,
        asGrid: api.STREAM_RENDERABLES.postsAsGrid,
      },
    },
  }
}

export function loadUserLoves(username, type) {
  return {
    type: ACTION_TYPES.LOAD_STREAM,
    payload: { endpoint: api.userResources(username, type) },
    meta: {
      mappingType: MAPPING_TYPES.LOVES,
      renderStream: {
        asList: api.STREAM_RENDERABLES.postsAsList,
        asGrid: api.STREAM_RENDERABLES.postsAsGrid,
      },
      resultFilter: StreamFilters.postsFromLoves,
    },
  }
}

export function loadUserFollowing(username, priority) {
  const endpoint = api.userFollowing(username, priority)
  return {
    type: ACTION_TYPES.LOAD_STREAM,
    payload: { endpoint },
    meta: {
      mappingType: MAPPING_TYPES.USERS,
      renderStream: {
        asList: api.STREAM_RENDERABLES.usersAsGrid,
        asGrid: api.STREAM_RENDERABLES.usersAsGrid,
      },
      resultKey: `/${username}/following?per_page=10&priority=${priority}`,
    },
  }
}
export function loadUserUsers(username, type) {
  return {
    type: ACTION_TYPES.LOAD_STREAM,
    payload: { endpoint: api.userResources(username, type) },
    meta: {
      mappingType: MAPPING_TYPES.USERS,
      renderStream: {
        asList: api.STREAM_RENDERABLES.usersAsGrid,
        asGrid: api.STREAM_RENDERABLES.usersAsGrid,
      },
    },
  }
}

export function loadUserDrawer(endpoint, postId, resultType) {
  const { ErrorState } = api.ERROR_RENDERABLES
  return {
    type: ACTION_TYPES.LOAD_STREAM,
    payload: { endpoint },
    meta: {
      mappingType: MAPPING_TYPES.USERS,
      mergeResults: true,
      renderStream: {
        asList: api.STREAM_RENDERABLES.usersAsGrid,
        asGrid: api.STREAM_RENDERABLES.usersAsGrid,
        asError: <ErrorState />,
      },
      resultKey: `/posts/${postId}/${resultType}`,
      updateKey: `/posts/${postId}/`,
    },
  }
}

export function collabWithUser(id, message) {
  return {
    type: ACTION_TYPES.USER.COLLAB_WITH,
    payload: {
      body: { body: message },
      endpoint: api.collabWithUser(id),
      method: 'POST',
    },
  }
}

export function hireUser(id, message) {
  return {
    type: ACTION_TYPES.USER.HIRE_ME,
    payload: {
      body: { body: message },
      endpoint: api.hireUser(id),
      method: 'POST',
    },
  }
}

