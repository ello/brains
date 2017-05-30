import { isFSA, isFSAName } from '../../support/test_helpers'
import * as subject from '../../../src/actions/authentication'
import { setAuthClientId } from '../../../src/networking/api'

describe('authentication actions', () => {
  let action = null

  beforeEach(() => {
    setAuthClientId('abc123')
  })

  context('#signIn', () => {
    beforeEach(() => {
      action = subject.signIn('vader@ello.co', '12345666')
    })

    it('is an FSA compliant action', () => {
      expect(isFSA(action)).to.be.true
    })

    it('has similar action.name and action.type', () => {
      expect(isFSAName(action, subject.signIn)).to.be.true
    })

    it('has the correct payload in the action', () => {
      expect(action.payload).to.deep.equal({
        method: 'POST',
        email: 'vader@ello.co',
        password: '12345666',
      })
    })
  })

  context('#getUserCredentials', () => {
    beforeEach(() => {
      action = subject.getUserCredentials('vader@ello.co', '12345666')
    })

    it('is an FSA compliant action', () => {
      expect(isFSA(action)).to.be.true
    })

    it('has similar action.name and action.type')
    // it('has similar action.name and action.type', () => {
    //   expect(isFSAName(action, subject.getUserCredentials)).to.be.true
    // })

    it('has the correct method in the action', () => {
      expect(action.payload.method).to.equal('POST')
    })

    it('has the correct api endpoint in the action', () => {
      expect(action.payload.endpoint.path).to.contain('/api/oauth/token')
    })

    it('has the correct body in the action', () => {
      expect(action.payload.body).to.deep.equal({
        client_id: 'abc123',
        email: 'vader@ello.co',
        password: '12345666',
        grant_type: 'password',
      })
    })
  })

  context('#logout', () => {
    beforeEach(() => {
      action = subject.logout()
    })

    it('is an FSA compliant action', () => {
      expect(isFSA(action)).to.be.true
    })

    it('has similar action.name and action.type', () => {
      expect(isFSAName(action, subject.logout)).to.be.true
    })

    it('has the correct method in the action', () => {
      expect(action.payload.method).to.equal('DELETE')
    })

    it('has the correct api endpoint in the action', () => {
      expect(action.payload.endpoint.path).to.contain('/api/oauth/logout')
    })
  })

  context('#refreshAuthenticationToken', () => {
    beforeEach(() => {
      action = subject.refreshAuthenticationToken('22:22')
    })

    it('is an FSA compliant action', () => {
      expect(isFSA(action)).to.be.true
    })

    it('has similar action.name and action.type')
    // it('has similar action.name and action.type', () => {
    //   expect(isFSAName(action, subject.refreshAuthenticationToken)).to.be.true
    // })

    it('has the correct method in the action', () => {
      expect(action.payload.method).to.equal('POST')
    })

    it('has the correct api endpoint in the action', () => {
      expect(action.payload.endpoint.path).to.contain('/api/oauth/token')
    })

    it('has the refresh token in the body of the action', () => {
      expect(action.payload.body.refresh_token).to.equal('22:22')
    })
  })

  context('#sendForgotPasswordRequest', () => {
    beforeEach(() => {
      action = subject.sendForgotPasswordRequest('eddie@ello.co')
    })

    it('is an FSA compliant action', () => {
      expect(isFSA(action)).to.be.true
    })

    it('has similar action.name and action.type')
    // it('has similar action.name and action.type', () => {
    //   expect(isFSAName(action, subject.sendForgotPasswordRequest)).to.be.true
    // })

    it('has the correct method in the action', () => {
      expect(action.payload.method).to.equal('POST')
    })

    it('has the correct api endpoint in the action', () => {
      expect(action.payload.endpoint.path).to.contain('/forgot-password')
    })

    it('has the email in the body of the action', () => {
      expect(action.payload.body.email).to.equal('eddie@ello.co')
    })
  })
})

