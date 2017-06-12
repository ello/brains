import React from 'react'
import { LOAD_STREAM } from 'ello-brains/constants/action_types'
import { EDITORIALS, POSTS } from 'ello-brains/constants/mapping_types'
import { editorials as editorialsApi } from '../networking/api'
import { editorials as editorialRenderable, postsAsPostStream } from '../components/streams/StreamRenderables'
import { ErrorStateEditorial } from '../components/errors/Errors'
import { ZeroStateEditorial } from '../components/zeros/Zeros'

export const loadEditorials = isPreview => (
  {
    type: LOAD_STREAM,
    payload: { endpoint: editorialsApi(isPreview) },
    meta: {
      mappingType: EDITORIALS,
      renderStream: {
        asList: editorialRenderable,
        asGrid: editorialRenderable,
      },
    },
  }
)

export const loadPostStream = ({ endpointPath, resultKey, ...props }) => (
  {
    type: LOAD_STREAM,
    payload: { endpoint: { path: endpointPath } },
    meta: {
      mappingType: POSTS,
      renderProps: { ...props },
      renderStream: {
        asList: postsAsPostStream,
        asGrid: postsAsPostStream,
        asZero: <ZeroStateEditorial />,
        asError: <ErrorStateEditorial />,
      },
      resultKey,
    },
  }
)

