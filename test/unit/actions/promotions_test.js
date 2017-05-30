import { isFSA } from '../../support/test_helpers'
import * as subject from '../../../src/actions/promotions'

describe('promotion actions', () => {
  context('#fetchAuthenticationPromos', () => {
    const action = subject.fetchAuthenticationPromos()

    it('is an FSA compliant action', () => {
      expect(isFSA(action)).to.be.true
    })

    it('has similar action.name and action.type')
    // it('has similar action.name and action.type', () => {
    //   expect(isFSAName(action, subject.fetchAuthenticationPromos)).to.be.true
    // })

    it('has the correct endpoint in the action', () => {
      expect(action.payload.endpoint.path).to.contain('/authentication.json')
    })
  })
})

