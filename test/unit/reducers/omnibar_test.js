import Immutable from 'immutable'
import { AUTHENTICATION, OMNIBAR, PROFILE } from '../../../src/constants/action_types'
import reducer from '../../../src/reducers/omnibar'

describe('omnibar reducer', () => {
  const initialState = reducer(undefined, {})
  const openOmnibarAction = {
    type: OMNIBAR.OPEN,
    payload: {
      classList: 'OmnibarClassName',
      isActive: true,
    },
  }

  const closeOmnibarAction = {
    type: OMNIBAR.CLOSE,
    payload: {
      classList: null,
      isActive: false,
    },
  }

  context('#initialState', () => {
    it('sets up a default initialState', () => {
      expect(reducer(undefined, {})).to.have.keys('classList', 'isActive')
    })
  })

  context('OMNIBAR', () => {
    it('OMNIBAR.OPEN opens the omnibar', () => {
      const result = reducer(undefined, openOmnibarAction)
      expect(result).to.deep.equal(Immutable.fromJS(openOmnibarAction.payload))
    })

    it('OMNIBAR.CLOSE closes the omnibar', () => {
      const result = reducer(undefined, closeOmnibarAction)
      expect(result).to.deep.equal(Immutable.fromJS(closeOmnibarAction.payload))
    })
  })

  context('AUTHENTICATION', () => {
    it('AUTHENTICATION.LOGOUT_SUCCESS resets the initial state', () => {
      const result = reducer(undefined, openOmnibarAction)
      expect(result).to.deep.equal(Immutable.fromJS(openOmnibarAction.payload))
      const action = { type: AUTHENTICATION.LOGOUT_SUCCESS }
      const nextResult = reducer(result, action)
      expect(nextResult).to.equal(initialState)
    })
  })

  context('PROFILE', () => {
    it('PROFILE.DELETE_SUCCESS resets the initial state', () => {
      const result = reducer(undefined, openOmnibarAction)
      expect(result).to.deep.equal(Immutable.fromJS(openOmnibarAction.payload))
      const action = { type: PROFILE.DELETE_SUCCESS }
      const nextResult = reducer(result, action)
      expect(nextResult).to.equal(initialState)
    })
  })
})

