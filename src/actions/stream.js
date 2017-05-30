import React from 'react'
import { LOAD_STREAM } from '../constants/action_types'
import { POSTS } from '../constants/mapping_types'
import { followingStream, STREAM_RENDERABLES, ZERO_RENDERABLES } from '../networking/api'

export function loadFollowing() {
  const { ZeroFollowingStream } = ZERO_RENDERABLES
  return {
    type: LOAD_STREAM,
    payload: { endpoint: followingStream() },
    meta: {
      mappingType: POSTS,
      renderStream: {
        asList: STREAM_RENDERABLES.postsAsList,
        asGrid: STREAM_RENDERABLES.postsAsGrid,
        asZero: <ZeroFollowingStream />,
      },
    },
  }
}

export default loadFollowing
