/* eslint-disable import/prefer-default-export */
import { LOAD_STREAM } from 'ello-brains/constants/action_types'
import { BADGES } from 'ello-brains/constants/mapping_types'
import { badges } from '../networking/api'

export function loadBadges() {
  return {
    type: LOAD_STREAM,
    payload: { endpoint: badges() },
    meta: {
      mappingType: BADGES,
      resultKey: '/badges',
    },
  }
}

