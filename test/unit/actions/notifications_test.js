import { isFSA, isFSAName } from '../../support/test_helpers'
import { notificationsFromActivities } from '../../../src/components/streams/StreamFilters'
import * as subject from '../../../src/actions/notifications'

describe('notifications actions', () => {
  context('#loadNotifications (default)', () => {
    const action = subject.loadNotifications()

    it('is an FSA compliant action', () => {
      expect(isFSA(action)).to.be.true
    })

    it('has a top level action.type', () => {
      expect(isFSAName(action, subject.loadNotifications)).to.be.true
    })

    it('has the correct api endpoint in the action', () => {
      expect(action.payload.endpoint.path).to.contain('/notifications?per_page=25')
    })

    it('has the correct mapping type in the action', () => {
      expect(action.meta.mappingType).to.equal('activities')
    })

    it('has asList, asGrid and asZero properties on renderStreams in the action', () => {
      expect(action.meta.renderStream.asList()).to.equal('notificationList')
      expect(action.meta.renderStream.asGrid()).to.equal('notificationList')
      expect(action.meta.renderStream.asZero).to.exist
    })

    it('has the correct resultFilter in the action', () => {
      expect(action.meta.resultFilter).to.equal(notificationsFromActivities)
    })

    it('has the correct resultKey in the action', () => {
      expect(action.meta.resultKey).to.equal('/notifications')
    })

    it('has the correct updateKey in the action', () => {
      expect(action.meta.updateKey).to.equal('/notifications')
    })
  })

  context('#loadNotifications (with params)', () => {
    const action = subject.loadNotifications({ category: 'comments' })

    it('has the correct api endpoint in the action', () => {
      const path = action.payload.endpoint.path
      expect(path).to.contain('/notifications?per_page=25&category=comments')
    })

    it('has the correct resultKey in the action', () => {
      expect(action.meta.resultKey).to.equal('/notifications/comments')
    })
  })

  context('#checkForNewNotifications', () => {
    const action = subject.checkForNewNotifications()

    it('is an FSA compliant action', () => {
      expect(isFSA(action)).to.be.true
    })

    it('has similar action.name and action.type')
    // it('has similar action.name and action.type', () => {
    //   expect(isFSAName(action, subject.checkForNewNotifications)).to.be.true
    // })

    it('has the correct api endpoint in the action', () => {
      expect(action.payload.endpoint.path).to.contain('/notifications')
    })

    it('has the correct method type in the action', () => {
      expect(action.payload.method).to.equal('HEAD')
    })
  })
})

