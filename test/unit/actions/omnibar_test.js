import { isFSA, isFSAName } from '../../support/test_helpers'
import * as subject from '../../../src/actions/omnibar'

describe('omnibar actions', () => {
  context('#openOmnibar', () => {
    const action = subject.openOmnibar()

    it('is an FSA compliant action', () => {
      expect(isFSA(action)).to.be.true
    })

    it('has similar action.name and action.type', () => {
      expect(isFSAName(action, subject.openOmnibar)).to.be.true
    })

    it('has the correct active state in the action', () => {
      expect(action.payload.isActive).to.be.true
    })
  })

  context('#closeOmnibar', () => {
    const action = subject.closeOmnibar()

    it('is an FSA compliant action', () => {
      expect(isFSA(action)).to.be.true
    })

    it('has similar action.name and action.type', () => {
      expect(isFSAName(action, subject.closeOmnibar)).to.be.true
    })

    it('has the correct active state in the action', () => {
      expect(action.payload.isActive).to.be.false
    })
  })
})

