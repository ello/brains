import { isFSA, isFSAName } from '../../support/test_helpers'
import * as subject from '../../../src/actions/stream'

describe('stream actions', () => {
  context('#loadFollowing', () => {
    const action = subject.loadFollowing()

    it('is an FSA compliant action', () => {
      expect(isFSA(action)).to.be.true
    })

    it('has a top level action.type', () => {
      expect(isFSAName(action, subject.loadFollowing)).to.be.true
    })

    it('has the correct api endpoint in the action', () => {
      expect(action.payload.endpoint.path).to.contain('/following/posts/recent?per_page=25')
    })

    it('has the correct mapping type in the action', () => {
      expect(action.meta.mappingType).to.equal('posts')
    })

    it('has asList, asGrid and asZero properties on renderStreams in the action', () => {
      expect(action.meta.renderStream.asList()).to.equal('postsAsList')
      expect(action.meta.renderStream.asGrid()).to.equal('postsAsGrid')
      expect(action.meta.renderStream.asZero).to.exist
    })
  })
})

