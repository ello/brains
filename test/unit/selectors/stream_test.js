import Immutable from 'immutable'
import {
  selectStreamFilteredResult,
  selectStreamMappingType,
  selectStreamPostIdOrToken,
  selectStreamResultPath,
  selectStreamType,
  selectStreamUnfilteredResult,
} from '../../../src/selectors/stream'

describe('stream selectors', () => {
  let state
  beforeEach(() => {
    const json = Immutable.fromJS({
      pages: {
        '/discover': { type: 'posts', ids: ['668', '666', '664'], pagination: {} },
        '/settings': { type: 'posts', ids: ['468', '466', '464'], pagination: {} },
      },
    })
    const routing = Immutable.fromJS({
      location: { pathname: '/discover' },
    })
    const stream = Immutable.fromJS({
      meta: { mappingType: 'stream.meta.mappingType' },
      payload: { postIdOrToken: 'stream.payload.postIdOrToken' },
      type: 'stream.type',
    })
    state = { json, routing, stream }
  })

  afterEach(() => {
    state = null
  })

  context('#selectStreamType', () => {
    it('returns the stream.type', () => {
      expect(selectStreamType(state)).to.equal('stream.type')
    })
  })

  context('#selectStreamMappingType', () => {
    it('returns the stream.meta.mappingType', () => {
      expect(selectStreamMappingType(state)).to.equal('stream.meta.mappingType')
    })
  })

  context('#selectStreamPostIdOrToken', () => {
    it('returns the stream.payload.postIdOrToken', () => {
      expect(selectStreamPostIdOrToken(state)).to.equal('stream.payload.postIdOrToken')
    })
  })

  context('#selectStreamResultPath', () => {
    it('returns the resultKey if one exists', () => {
      const props = { action: { meta: { resultKey: '/settings' } } }
      expect(selectStreamResultPath(state, props)).to.equal('/settings')
    })

    it('returns the pathname if no resultKey exists', () => {
      expect(selectStreamResultPath(state, {})).to.equal('/discover')
    })
  })

  context('#selectStreamUnfilteredResult', () => {
    it('returns the unfiltered result', () => {
      const ids = selectStreamUnfilteredResult(state, {}).get('ids')
      expect(ids.size).to.equal(3)
      expect(ids.first()).to.equal('668')
    })
  })

  context('#selectStreamFilteredResult', () => {
    it('returns the unfiltered result if no deleted ids', () => {
      const ids = selectStreamFilteredResult(state, {}).get('ids')
      expect(ids.size).to.equal(3)
      expect(ids.first()).to.equal('668')
    })

    it('returns the filtered result if deleted ids exist', () => {
      state.json = state.json.set('deleted_posts', Immutable.List(['668']))
      const ids = selectStreamFilteredResult(state, {}).get('ids')
      expect(ids.size).to.equal(2)
      expect(ids.first()).to.equal('666')
    })

    it('returns the unfiltered result if on settings', () => {
      state.json = state.json.set('deleted_posts', Immutable.List(['468']))
      state.routing = state.routing.setIn(['location', 'pathname'], '/settings')
      const ids = selectStreamFilteredResult(state, {}).get('ids')
      expect(ids.size).to.equal(3)
      expect(ids.first()).to.equal('468')
    })
  })
})

