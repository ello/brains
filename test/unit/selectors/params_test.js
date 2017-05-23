import {
  selectParamsInvitationCode,
  selectParamsToken,
  selectParamsType,
  selectParamsUsername,
} from '../../../src/selectors/params'
import { stubJSONStore } from '../../support/stubs'


describe('params selectors', () => {
  let json
  let params
  let location
  beforeEach(() => {
    json = stubJSONStore()
    params = { token: 'paramsToken', type: 'paramsType', invitationCode: '8675309' }
    location = { pathname: '/discover' }
  })

  afterEach(() => {
    json = {}
    params = {}
    location = {}
  })

  context('#selectParamsToken', () => {
    it('returns the params token as lower case', () => {
      const state = { json }
      const props = { params, location }
      expect(selectParamsToken(state, props)).to.equal('paramstoken')
    })
  })

  context('#selectParamsType', () => {
    it('returns the params type', () => {
      const state = { json }
      const props = { params, location }
      expect(selectParamsType(state, props)).to.equal('paramsType')
    })
  })

  context('#selectParamsUsername', () => {
    const state = { json }
    const props = { params, location }

    it('returns the params username as empty string', () => {
      expect(selectParamsUsername(state, props)).to.equal('')
    })

    it('returns the correct params username', () => {
      const nextProps = { params: { ...params, username: 'username' }, location }
      expect(selectParamsUsername(state, nextProps)).to.equal('username')
    })

    it('returns the correct params username when username is uppercase', () => {
      const nextProps = { params: { ...params, username: 'USERNAME' }, location }
      expect(selectParamsUsername(state, nextProps)).to.equal('username')
    })
  })

  context('#selectParamsInvitationCode', () => {
    it('returns the params invitationCode', () => {
      const state = { json }
      const props = { params, location }
      expect(selectParamsInvitationCode(state, props)).to.equal('8675309')
    })
  })
})

