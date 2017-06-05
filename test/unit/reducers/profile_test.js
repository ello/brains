import Immutable from 'immutable'
import { AUTHENTICATION, INVITATIONS, PROFILE } from '../../../src/constants/action_types'
import { stubAvatar, stubCoverImage, stubUser } from '../../support/stubs'
import reducer from '../../../src/reducers/profile'


describe('profile reducer', () => {
  context('#initialState', () => {
    it('sets up a default initialState', () => {
      expect(reducer({}, {})).to.deep.equal({})
    })
  })

  context('AUTHENTICATION', () => {
    it('AUTHENTICATION.LOGOUT_SUCCESS blows away the reducer except for some android data', () => {
      const action = { type: AUTHENTICATION.LOGOUT_SUCCESS, payload: {} }
      const state = stubUser({
        buildVersion: 'buildVersion',
        bundleId: 'bundleId',
        marketingVersion: 'marketingVersion',
        registrationId: 'registrationId',
        username: 'username',
      })
      const result = reducer(state, {})
      expect(result).to.have.property('username', 'username')
      const nextResult = reducer(result, action)
      expect(nextResult).to.have.keys(
        'buildVersion', 'bundleId', 'marketingVersion', 'registrationId',
      )
      expect(nextResult).not.to.have.property('username')
    })
  })

  context('INVITATIONS', () => {
    it('INVITATIONS.GET_EMAIL_SUCCESS adds the updated email', () => {
      const user = stubUser({ email: 'user@aol.com' })
      const action = {
        type: INVITATIONS.GET_EMAIL_SUCCESS,
        payload: { response: { invitations: { email: 'timmy@aol.com' } } },
      }
      const initial = reducer(user, {})
      expect(initial.get('email')).to.equal('user@aol.com')
      const reduced = reducer(initial, action)
      expect(reduced.get('email')).to.equal('timmy@aol.com')
    })
  })

  context('PROFILE', () => {
    it('PROFILE.AVAILABILITY_SUCCESS adds the availability data to the profile', () => {
      const state = stubUser({ username: 'username' })
      const action = {
        type: PROFILE.AVAILABILITY_SUCCESS,
        meta: { original: 'OG' },
        payload: {
          response: {
            availability: {
              username: false,
              email: true,
              invitation_code: true,
              suggestions: {
                username: [
                  'lanakane32d',
                  'trans_lana',
                  'lanalicious',
                ],
                email: {
                  address: 'lana',
                  domain: 'gmail.com',
                  full: 'lana@gmail.com',
                },
              },
            },
          },
        },
      }
      const reduced = reducer(state, action)
      expect(reduced).have.property('availability')
      expect(reduced.getIn(['availability', 'username'])).to.be.false
      expect(reduced.getIn(['availability', 'original'])).to.equal('OG')
      expect(reduced.getIn(['availability', 'suggestions'])).to.exist
    })

    it('PROFILE.AVAILABILITY_RESET sets availability to null', () => {
      const state = stubUser({ username: 'username', availability: 'availability' })
      state.set('availability', 'something')
      let reduced = reducer(state, {})
      expect(reduced).have.property('availability')
      const action = { type: PROFILE.AVAILABILITY_RESET, payload: {} }
      reduced = reducer(reduced, action)
      expect(reduced).property('availability', null)
    })

    it('PROFILE.EXPORT_SUCCESS adds the dataExport url on a 200', () => {
      const state = stubUser({ username: 'username' })
      const action = {
        type: PROFILE.EXPORT_SUCCESS,
        payload: {
          serverStatus: 200,
          response: { exportUrl: 'ello.co/export' },
        },
      }
      const reduced = reducer(state, action)
      expect(reduced).have.property('dataExport', 'ello.co/export')
    })

    it('PROFILE.EXPORT_SUCCESS does not add the dataExport url on a non 200', () => {
      const state = stubUser({ username: 'username' })
      const action = {
        type: PROFILE.EXPORT_SUCCESS,
        payload: {
          serverStatus: 666,
          response: { exportUrl: 'ello.co/export' },
        },
      }
      const reduced = reducer(state, action)
      expect(reduced).not.have.property('dataExport', 'ello.co/export')
    })

    it('PROFILE.DELETE_SUCCESS blows away the reducer except for some android data', () => {
      const action = { type: PROFILE.DELETE_SUCCESS, payload: {} }
      const state = Immutable.fromJS({
        buildVersion: 'buildVersion',
        bundleId: 'bundleId',
        marketingVersion: 'marketingVersion',
        registrationId: 'registrationId',
        username: 'username',
      })
      const result = reducer(state, {})
      expect(result).to.have.property('username', 'username')
      const nextResult = reducer(result, action)
      expect(nextResult).to.have.keys(
        'buildVersion', 'bundleId', 'marketingVersion', 'registrationId',
      )
      expect(nextResult).not.to.have.property('username')
    })

    it('PROFILE.LOAD_SUCCESS adds the id and user properties', () => {
      const user = stubUser({ id: '666' })
      const action = {
        type: PROFILE.LOAD_SUCCESS,
        payload: { response: { users: user.toJS() } },
      }
      const reduced = reducer(undefined, action)
      expect(reduced.get('id')).to.equal('666')
    })

    it('PROFILE.REQUEST_PUSH_SUBSCRIPTION', () => {
      const state = stubUser()
      const action = {
        type: PROFILE.REQUEST_PUSH_SUBSCRIPTION,
        payload: {
          buildVersion: '1',
          bundleId: '1234',
          marketingVersion: '2',
          registrationId: '5678',
        },
      }
      const reduced = reducer(state, action)
      expect(reduced).to.have.property('buildVersion', '1')
      expect(reduced).to.have.property('bundleId', '1234')
      expect(reduced).to.have.property('marketingVersion', '2')
      expect(reduced).to.have.property('registrationId', '5678')
    })

    it('PROFILE.SAVE_REQUEST removes any errors on the user', () => {
      const state = stubUser({ errors: { code: 667 } })
      const action = { type: PROFILE.SAVE_REQUEST }
      const initial = reducer(state, {})
      expect(initial).to.have.property('errors')
      const reduced = reducer(initial, action)
      expect(reduced).to.have.property('errors', null)
    })

    it('PROFILE.SAVE_SUCCESS adds the id and user properties', () => {
      const user = stubUser({ id: '666', availability: true })
      const action = {
        type: PROFILE.SAVE_SUCCESS,
        payload: { response: { users: { ...user, username: 'timmy' } } },
      }
      const initial = reducer(user, {})
      expect(initial).to.have.property('id', '666')
      expect(initial).to.have.property('availability', true)

      const reduced = reducer(initial, action)
      expect(reduced).to.have.property('username', 'timmy')
      expect(reduced).to.have.property('availability', null)
    })

    it('PROFILE.SAVE_FAILURE adds the errors on the user', () => {
      const state = stubUser()
      const action = {
        type: PROFILE.SAVE_FAILURE,
        payload: { response: { errors: { code: 667 } } },
      }
      const reduced = reducer(state, action)
      expect(reduced).to.have.property('errors')
    })

    it('PROFILE.TMP_AVATAR_CREATED adds a tmp asset on user.avatar', () => {
      const user = stubUser({ id: 'mansfield' })
      const action = {
        type: PROFILE.TMP_AVATAR_CREATED,
        payload: { tmp: { url: 'data:image/png;base64,objectURL...' } },
      }
      const initial = reducer(user, {})
      const reduced = reducer(initial, action)
      expect(reduced).to.have.property('avatar')
      expect(reduced.getIn(['avatar', 'tmp', 'url'])).to.equal('data:image/png;base64,objectURL...')
    })

    it('PROFILE.TMP_COVER_CREATED adds a tmp asset on user.coverImage', () => {
      const user = stubUser({ id: 'mansfield' })
      const action = {
        type: PROFILE.TMP_COVER_CREATED,
        payload: { tmp: { url: 'data:image/png;base64,objectURL...' } },
      }
      const initial = reducer(user, {})
      const reduced = reducer(initial, action)
      expect(reduced).to.have.property('coverImage')
      expect(reduced.getIn(['coverImage', 'tmp', 'url'])).to.equal('data:image/png;base64,objectURL...')
    })

    it('PROFILE.SAVE_AVATAR_SUCCESS updates the user.avatar', () => {
      const user = stubUser({ id: 'mansfield' })
      const result = { ...user.toJS(), avatar: stubAvatar('newAvatar.jpg').toJS() }
      const tmpAction = {
        type: PROFILE.TMP_AVATAR_CREATED,
        payload: { tmp: { url: 'data:image/png;base64,objectURL...' } },
      }
      const saveAction = {
        type: PROFILE.SAVE_AVATAR_SUCCESS,
        payload: { response: { users: { ...result } } },
      }
      const initial = reducer(user, {})
      const tmpReduced = reducer(initial, tmpAction)
      expect(tmpReduced.getIn(['avatar', 'tmp', 'url'])).to.equal('data:image/png;base64,objectURL...')
      const reduced = reducer(tmpReduced, saveAction)
      expect(reduced).to.have.property('avatar')
      expect(reduced.get('avatar')).to.deep.equal(Immutable.fromJS({ ...stubAvatar('newAvatar.jpg').toJS(), ...tmpAction.payload }))
    })

    it('PROFILE.SAVE_COVER_SUCCESS updates the user.avatar', () => {
      const user = stubUser({ id: 'mansfield' })
      const result = { ...user.toJS(), coverImage: stubCoverImage('newCover.jpg').toJS() }
      const tmpAction = {
        type: PROFILE.TMP_COVER_CREATED,
        payload: { tmp: { url: 'data:image/png;base64,...' } },
      }
      const saveAction = {
        type: PROFILE.SAVE_COVER_SUCCESS,
        payload: { response: { users: { ...result } } },
      }

      const initial = reducer(user, {})
      const tmpReduced = reducer(initial, tmpAction)
      expect(tmpReduced.getIn(['coverImage', 'tmp', 'url'])).to.equal('data:image/png;base64,...')
      const reduced = reducer(tmpReduced, saveAction)
      expect(reduced).to.have.property('coverImage')
      expect(reduced.get('coverImage')).to.deep.equal(Immutable.fromJS({
        ...stubCoverImage('newCover.jpg').toJS(),
        ...tmpAction.payload,
      }))
    })
  })
})

