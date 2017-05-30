import React from 'react'
import * as ACTION_TYPES from '../constants/action_types'
import * as MAPPING_TYPES from '../constants/mapping_types'
import * as api from '../networking/api'
import * as StreamFilters from '../components/streams/StreamFilters'

export function loadNotifications(params = {}) {
  const categoryResult = params.category && params.category !== 'all' ? `/${params.category}` : ''
  const { ZeroState } = api.ZERO_RENDERABLES
  return {
    type: ACTION_TYPES.LOAD_STREAM,
    payload: { endpoint: api.notifications(params) },
    meta: {
      mappingType: MAPPING_TYPES.ACTIVITIES,
      renderStream: {
        asList: api.STREAM_RENDERABLES.notificationList,
        asGrid: api.STREAM_RENDERABLES.notificationList,
        asZero: <ZeroState>Sorry, no notifications found.</ZeroState>,
      },
      resultFilter: StreamFilters.notificationsFromActivities,
      resultKey: `/notifications${categoryResult}`,
      updateKey: '/notifications',
    },
  }
}

export function checkForNewNotifications() {
  return {
    type: ACTION_TYPES.HEAD,
    payload: {
      endpoint: api.newNotifications(),
      method: 'HEAD',
    },
  }
}

export const loadAnnouncements = () =>
  ({
    type: ACTION_TYPES.LOAD_STREAM,
    payload: {
      endpoint: api.announcements(),
    },
    meta: {
      mappingType: MAPPING_TYPES.ANNOUNCEMENTS,
      resultKey: '/announcements',
      updateKey: '/announcements',
    },
  })

export const markAnnouncementRead = () =>
  ({
    type: ACTION_TYPES.NOTIFICATIONS.MARK_ANNOUNCEMENT_READ,
    payload: {
      endpoint: api.markAnnouncementRead(),
      method: 'PATCH',
    },
  })
