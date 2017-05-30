import { isFSA } from '../../support/test_helpers'
import * as subject from '../../../src/actions/relationships'

describe('relationship actions', () => {
  context('#batchUpdateRelationship', () => {
    const action = subject.batchUpdateRelationship([10, 666, 23], 'friend')

    it('is an FSA compliant action', () => {
      expect(isFSA(action)).to.be.true
    })

    it('has similar action.name and action.type')
    // it('has similar action.name and action.type', () => {
    //   expect(isFSAName(action, subject.batchUpdateRelationship)).to.be.true
    // })

    it('has the correct userIds in the action', () => {
      expect(action.payload.userIds).to.contain(10)
      expect(action.payload.userIds).to.contain(666)
      expect(action.payload.userIds).to.contain(23)
    })

    it('has the correct relationship priority in the action', () => {
      expect(action.payload.priority).to.contain('friend')
    })
  })

  context('#updateRelationship', () => {
    const action = subject.updateRelationship(5309, 'noise', null)

    it('is an FSA compliant action', () => {
      expect(isFSA(action)).to.be.true
    })

    it('has similar action.name and action.type')
    // it('has similar action.name and action.type', () => {
    //   expect(isFSAName(action, subject.updateRelationship)).to.be.true
    // })

    it('has the correct mapping type in the action', () => {
      expect(action.meta.mappingType).to.equal('relationships')
    })

    it('has the correct api endpoint in the action', () => {
      expect(action.payload.endpoint.path).to.contain('/users/5309/add/noise')
    })

    it('has the correct existing relationship priority in the action', () => {
      expect(action.payload.existing).to.be.null
    })

    it('has the correct relationship priority in the action', () => {
      expect(action.payload.priority).to.contain('noise')
    })

    it('has the correct userId in the action', () => {
      expect(action.payload.userId).to.equal(5309)
    })
  })

  context('#updateRelationship (internal)', () => {
    const action = subject.updateRelationship(667, 'muted', 'inactive', true)

    it('is an FSA compliant action', () => {
      expect(isFSA(action)).to.be.true
    })

    it('has similar action.name and action.type')
    // it('has similar action.name and action.type', () => {
    //   expect(isFSAName(action, subject.updateRelationship)).to.be.true
    // })

    it('has the correct mapping type in the action', () => {
      expect(action.meta.mappingType).to.equal('relationships')
    })

    it('has the correct existing relationship priority in the action', () => {
      expect(action.payload.existing).to.equal('inactive')
    })

    it('has the correct relationship priority in the action', () => {
      expect(action.payload.priority).to.equal('muted')
    })

    it('has the correct userId in the action', () => {
      expect(action.payload.userId).to.equal(667)
    })
  })
})

