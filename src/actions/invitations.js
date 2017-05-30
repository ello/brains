import React from 'react'
import * as ACTION_TYPES from '../constants/action_types'
import * as MAPPING_TYPES from '../constants/mapping_types'
import * as api from '../networking/api'

export function loadInvitedUsers() {
  const { ErrorState } = api.ERROR_RENDERABLES
  return {
    type: ACTION_TYPES.LOAD_STREAM,
    payload: { endpoint: api.invite(), vo: {} },
    meta: {
      mappingType: MAPPING_TYPES.INVITATIONS,
      renderStream: {
        asList: api.STREAM_RENDERABLES.usersAsInviteeList,
        asGrid: api.STREAM_RENDERABLES.usersAsInviteeGrid,
        asError: <ErrorState />,
      },
    },
  }
}

export function inviteUsers(emails) {
  return {
    type: ACTION_TYPES.INVITATIONS.INVITE,
    payload: {
      endpoint: api.invite(),
      method: 'POST',
      body: { email: emails },
    },
    meta: {
      mappingType: MAPPING_TYPES.INVITATIONS,
    },
  }
}

export function getInviteEmail(code) {
  return {
    type: ACTION_TYPES.INVITATIONS.GET_EMAIL,
    payload: {
      endpoint: api.getInviteEmail(code),
    },
  }
}
