import Immutable from 'immutable'
import { BADGES } from '../../../src/constants/mapping_types'
import * as selector from '../../../src/selectors/badges'
import { clearJSON, json, stubBadges } from '../../support/stubs'

describe('badges selectors', () => {
  let badges
  let state

  beforeEach(() => {
    badges = stubBadges()
    state = { json }
  })

  afterEach(() => {
    clearJSON()
  })

  context('#selectBadges', () => {
    it('returns the state.json.badges', () => {
      const expected = badges
      const expected2 = state.json.get(BADGES)
      const result = selector.selectBadges(state, {})
      expect(result).to.deep.equal(expected)
      expect(result).to.deep.equal(expected2)
    })
  })

  context('#selectBadge', () => {
    it('returns the staff badge from a badgeId', () => {
      const expected = Immutable.Map({
        image: Immutable.Map({ width: 48, height: 48, url: '/assets/badges/staff.png' }),
        learnMoreCaption: 'Meet the Staff',
        learnMoreHref: 'https://ello.co/wtf/about/the-people-of-ello/',
        name: 'Ello Staff Member',
        slug: 'staff',
      })
      const result = selector.selectBadge(state, { badgeId: 'staff' })
      expect(result).to.deep.equal(expected)
    })
  })
})
