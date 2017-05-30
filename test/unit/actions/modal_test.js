import { isFSA, isFSAName } from '../../support/test_helpers'
import * as subject from '../../../src/actions/modals'

describe('modal actions', () => {
  it('needs to be divided from alert')
  it('does not need to pass in things like classList and component')

  context('#openModal', () => {
    const action = subject.openModal()

    it('is an FSA compliant action', () => {
      expect(isFSA(action)).to.be.true
    })

    it('has similar action.name and action.type', () => {
      expect(isFSAName(action, subject.openModal)).to.be.true
    })

    it('has the correct active state in the action', () => {
      expect(action.payload.isActive).to.be.true
    })

    it('has the correct kind in the action', () => {
      expect(action.payload.kind).to.equal('Modal')
    })
  })

  context('#closeModal', () => {
    const action = subject.closeModal()

    it('is an FSA compliant action', () => {
      expect(isFSA(action)).to.be.true
    })

    it('has similar action.name and action.type', () => {
      expect(isFSAName(action, subject.closeModal)).to.be.true
    })

    it('has the correct active state in the action', () => {
      expect(action.payload.isActive).to.be.false
    })

    it('has the correct kind in the action', () => {
      expect(action.payload.kind).to.equal('Modal')
    })
  })

  context('#openAlert', () => {
    const action = subject.openAlert()

    it('is an FSA compliant action', () => {
      expect(isFSA(action)).to.be.true
    })

    it('has similar action.name and action.type', () => {
      expect(isFSAName(action, subject.openAlert)).to.be.true
    })

    it('has the correct active state in the action', () => {
      expect(action.payload.isActive).to.be.true
    })

    it('has the correct kind in the action', () => {
      expect(action.payload.kind).to.equal('Alert')
    })
  })

  context('#closeAlert', () => {
    const action = subject.closeAlert()

    it('is an FSA compliant action', () => {
      expect(isFSA(action)).to.be.true
    })

    it('has similar action.name and action.type', () => {
      expect(isFSAName(action, subject.closeAlert)).to.be.true
    })

    it('has the correct active state in the action', () => {
      expect(action.payload.isActive).to.be.false
    })

    it('has the correct kind in the action', () => {
      expect(action.payload.kind).to.equal('Alert')
    })
  })
})

