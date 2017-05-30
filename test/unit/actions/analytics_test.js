import { isFSA } from '../../support/test_helpers'
import * as subject from '../../../src/actions/analytics'

describe('analytics actions', () => {
  context('#trackEvent', () => {
    const action = subject.trackEvent('event-to-track', { sentAt: 'today' })

    it('is an FSA compliant action', () => {
      expect(isFSA(action)).to.be.true
    })

    it('has similar action.name and action.type')

    // it('has similar action.name and action.type', () => {
    //   expect(isFSAName(action, subject.trackEvent)).to.be.true
    // })

    it('has the correct label in the action', () => {
      expect(action.payload.label).to.contain('event-to-track')
    })

    it('has a sentAt options in the action', () => {
      expect(action.payload.options.sentAt).to.contain('today')
    })
  })
})

