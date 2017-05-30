import { isFSA, isFSAName } from '../../support/test_helpers'
import * as subject from '../../../src/actions/zeros'

describe('zeros actions', () => {
  context('#sayHello', () => {
    const action = subject.sayHello({ username: 'timmy' })

    it('is an FSA compliant action', () => {
      expect(isFSA(action)).to.be.true
    })

    it('has similar action.name and action.type', () => {
      expect(isFSAName(action, subject.sayHello)).to.be.true
    })

    it('has the correct username in the action', () => {
      expect(action.payload.username).to.equal('timmy')
    })
  })
})

