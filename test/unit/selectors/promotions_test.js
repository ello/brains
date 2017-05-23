import Immutable from 'immutable'
import {
  selectAuthPromotionals,
  selectLoggedInPagePromotions,
  selectLoggedOutPagePromotions,
} from '../../../src/selectors/promotions'
import { stubAuthPromotion } from '../../support/stubs'

describe('promotions selectors', () => {
  let authentication
  let json
  let promotions
  let state
  beforeEach(() => {
    authentication = Immutable.Map({ isLoggedIn: true })
    json = Immutable.fromJS({
      pagePromotionals: {
        1: { isLoggedIn: false },
        2: { isLoggedIn: false },
        3: { isLoggedIn: true },
        4: { isLoggedIn: true },
        5: { isLoggedIn: true },
      },
    })
    promotions = Immutable.fromJS({
      authentication: stubAuthPromotion(),
    })
    state = { authentication, json, promotions }
  })

  afterEach(() => {
    authentication = Immutable.Map()
    json = Immutable.Map()
    promotions = Immutable.Map()
  })

  context('#selectAuthPromotionals', () => {
    it('returns the promotions.authentication', () => {
      expect(selectAuthPromotionals(state)).to.deep.equal(promotions.get('authentication'))
    })
  })

  describe('#selectLoggedInPagePromotions', () => {
    it('only selects logged in page promos', () => {
      const promos = selectLoggedInPagePromotions(state)
      expect(promos.size).to.equal(3)
      expect(promos.get('1')).to.be.undefined
      expect(promos.get('3')).not.to.be.undefined
    })
  })

  describe('#selectLoggedOutPagePromotions', () => {
    it('only selects logged out page promos', () => {
      const promos = selectLoggedOutPagePromotions(state)
      expect(promos.size).to.equal(2)
      expect(promos.get('1')).not.to.be.undefined
      expect(promos.get('3')).to.be.undefined
    })
  })
})

