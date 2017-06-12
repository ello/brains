import React from 'react'
import { LOAD_STREAM } from 'ello-brains/constants/action_types'
import { POSTS } from 'ello-brains/constants/mapping_types'
import { followingStream } from '../networking/api'
import { postsAsGrid, postsAsList } from '../components/streams/StreamRenderables'
import { ZeroFollowingStream } from '../components/zeros/Zeros'

export function loadFollowing() {
  return {
    type: LOAD_STREAM,
    payload: { endpoint: followingStream() },
    meta: {
      mappingType: POSTS,
      renderStream: {
        asList: postsAsList,
        asGrid: postsAsGrid,
        asZero: <ZeroFollowingStream />,
      },
    },
  }
}

export default loadFollowing

