import { isFSA, isFSAName } from '../../support/test_helpers'
import * as subject from '../../../src/actions/invitations'


describe('invitations actions', () => {
  context('#loadInvitedUsers', () => {
    const action = subject.loadInvitedUsers()

    it('is an FSA compliant action', () => {
      expect(isFSA(action)).to.be.true
    })

    it('has a top level action.type', () => {
      expect(isFSAName(action, subject.loadInvitedUsers)).to.be.true
    })

    it('has the correct api endpoint in the action', () => {
      expect(action.payload.endpoint.path).to.contain('/invitations?per_page=100')
    })

    it('has the correct mapping type in the action', () => {
      expect(action.meta.mappingType).to.equal('invitations')
    })

    it('has asList, asGrid and asZero properties on renderStreams in the action', () => {
      expect(action.meta.renderStream.asList()).to.equal('usersAsInviteeList')
      expect(action.meta.renderStream.asGrid()).to.equal('usersAsInviteeGrid')
      expect(action.meta.renderStream.asError).to.exist
    })
  })

  context('#inviteUsers', () => {
    const emails = ['archer@ello.co', 'pam@ello.co', 'lana@ello.co']
    const action = subject.inviteUsers(emails)

    it('is an FSA compliant action', () => {
      expect(isFSA(action)).to.be.true
    })

    it('todo: has similar action.name and action.type (needs to update constant)')
    // it('has similar action.name and action.type', () => {
    //   expect(isFSAName(action, subject.inviteUsers)).to.be.true
    // })

    it('has the correct api endpoint in the action', () => {
      expect(action.payload.endpoint.path).to.contain('/invitations?per_page=100')
    })

    it('has the correct method in the action', () => {
      expect(action.payload.method).to.equal('POST')
    })

    it('has the correct emails in the action', () => {
      expect(action.payload.body.email).to.deep.equal(emails)
    })

    it('has the correct mapping type in the action', () => {
      expect(action.meta.mappingType).to.equal('invitations')
    })
  })

  context('#getInviteEmail', () => {
    const action = subject.getInviteEmail('in-the-house')

    it('is an FSA compliant action', () => {
      expect(isFSA(action)).to.be.true
    })

    it('todo: has similar action.name and action.type (needs to update constant)')
    // it('has similar action.name and action.type', () => {
    //   expect(isFSAName(action, subject.inviteUsers)).to.be.true
    // })

    it('has the correct api endpoint in the action', () => {
      expect(action.payload.endpoint.path).to.contain('/invitations/in-the-house')
    })
  })
})

