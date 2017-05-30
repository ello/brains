import React from 'react'
import { LOAD_STREAM } from '../constants/action_types'
import { EDITORIALS, POSTS } from '../constants/mapping_types'
import {
  editorials as editorialsApi,
  ERROR_RENDERABLES,
  STREAM_RENDERABLES,
  ZERO_RENDERABLES,
} from '../networking/api'

export const loadEditorials = isPreview => (
  {
    type: LOAD_STREAM,
    payload: { endpoint: editorialsApi(isPreview) },
    meta: {
      mappingType: EDITORIALS,
      renderStream: {
        asList: STREAM_RENDERABLES.editorials,
        asGrid: STREAM_RENDERABLES.editorials,
      },
    },
  }
)

export const loadCuratedPosts = ({ endpointPath, resultKey, ...props }) => {
  const { ErrorStateEditorial } = ERROR_RENDERABLES
  const { ZeroStateEditorial } = ZERO_RENDERABLES
  return {
    type: LOAD_STREAM,
    payload: { endpoint: { path: endpointPath } },
    meta: {
      mappingType: POSTS,
      renderProps: { ...props },
      renderStream: {
        asList: STREAM_RENDERABLES.postsAsCuratedEditorial,
        asGrid: STREAM_RENDERABLES.postsAsCuratedEditorial,
        asZero: <ZeroStateEditorial />,
        asError: <ErrorStateEditorial />,
      },
      resultKey,
    },
  }
}
