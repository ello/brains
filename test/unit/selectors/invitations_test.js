import Immutable from 'immutable'
import * as selector from '../../../src/selectors/invitations'
import { clearJSON, json, stub, stubInvitation } from '../../support/stubs'

describe('user selectors', () => {
  let unaccepted
  let accepted
  let state
  beforeEach(() => {
    stub('user', { id: '666', username: 'sixes' })
    stub('user', { id: '100', username: 'manny' })
    accepted = stubInvitation({ email: 'satan@example.com' })
    unaccepted = stubInvitation({ id: '99' }, false)
    state = { json }
  })

  afterEach(() => {
    clearJSON()
  })

  context('#selectPropsInvitationId', () => {
    it('returns the correct props invitation id from a invitationId', () => {
      const props = { invitationId: '99' }
      expect(selector.selectPropsInvitationId(state, props)).to.equal('99')
    })

    it('returns the correct props invitation id from a invitation', () => {
      const props = { invitation: unaccepted }
      expect(selector.selectPropsInvitationId(state, props)).to.equal('99')
    })

    it('returns the correct props invitation id from a invitation', () => {
      const props = { invitation: accepted }
      expect(selector.selectPropsInvitationId(state, props)).to.equal('1')
    })
  })

  context('#selectInvitations', () => {
    it('returns invitations model out of json', () => {
      expect(selector.selectInvitations(state)).to.deep.equal(state.json.get('invitations'))
    })
  })

  context('#selectInvitation', () => {
    it('returns a invitation from a invitationId', () => {
      const props = { invitationId: '1' }
      const invitation = selector.selectInvitation(state, props)
      expect(invitation).to.deep.equal(state.json.get('invitations').first())
    })

    it('returns an empty Map if invitationId is not found', () => {
      const props = { invitationId: '166666' }
      const invitation = selector.selectInvitation(state, props)
      expect(invitation).to.deep.equal(Immutable.Map())
    })

    it('returns a post from a invitation.id', () => {
      const props = { invitation: accepted }
      const invitation = selector.selectInvitation(state, props)
      expect(invitation).to.deep.equal(state.json.get('invitations').first())
    })

    it('returns an empty Map if invitation.id is not found', () => {
      const props = { user: stubInvitation({ id: '99999' }, false, false) }
      const invitation = selector.selectInvitation(state, props)
      expect(invitation).to.deep.equal(Immutable.Map())
    })
  })

  context('#selectInvitationAcceptedAt', () => {
    it('returns the invitation.acceptedAt property, (null)', () => {
      const props = { invitationId: '99' }
      const result = selector.selectInvitationAcceptedAt(state, props)
      expect(result).to.equal(null)
    })

    it('returns the invitation.acceptedAt property (with value)', () => {
      const props = { invitationId: '1' }
      const result = selector.selectInvitationAcceptedAt(state, props)
      expect(result).to.equal('invitationAcceptedAt')
    })
  })

  context('#selectInvitationCode', () => {
    it('returns the invitation.code property', () => {
      const props = { invitationId: '1' }
      const result = selector.selectInvitationCode(state, props)
      expect(result).to.equal('invitationCode')
    })
  })

  context('#selectInvitationCreatedAt', () => {
    it('returns the invitation.createdAt property', () => {
      const props = { invitationId: '1' }
      const result = selector.selectInvitationCreatedAt(state, props)
      expect(result).to.equal('invitationCreatedAt')
    })
  })

  context('#selectInvitationEmail', () => {
    it('returns the invitation.email property', () => {
      const props = { invitationId: '1' }
      const result = selector.selectInvitationEmail(state, props)
      expect(result).to.equal('satan@example.com')
    })
  })

  context('#selectInvitationId', () => {
    it('returns the invitation.id property', () => {
      const props = { invitationId: '99' }
      const result = selector.selectInvitationId(state, props)
      expect(result).to.equal('99')
    })
  })

  context('#selectInvitationUserId', () => {
    it('returns the invitation.links.acceptedBy.id property', () => {
      const props = { invitationId: '1' }
      const result = selector.selectInvitationUserId(state, props)
      expect(result).to.equal('100')
    })
  })
})

