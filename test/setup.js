import 'babel-polyfill'
import chai, { expect } from 'chai'
import chaiImmutable from 'chai-immutable'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import {
  setErrorRenderables,
  setStreamRenderables,
  setZeroRenderables,
} from '../src/networking/api'

chai.use(chaiImmutable)
chai.use(sinonChai)

global.chai = chai
global.expect = expect
global.sinon = sinon

// export const setApiDomain = (domain: string) => (API_DOMAIN = domain)
// export const setAuthClientId = (id: string) => (AUTH_CLIENT_ID = id)
// export const setAuthDomain = (domain: string) => (AUTH_DOMAIN = domain)
// export const setErrorRenderables = (renderables: any) => (ERROR_RENDERABLES = renderables)
// export const setPromoHost = (host: string) => (PROMO_HOST = host)
// export const setStreamRenderables = (renderables: any) => (STREAM_RENDERABLES = renderables)
// export const setUseLocalEmoji = (useLocalEmoji: boolean) => (USE_LOCAL_EMOJI = useLocalEmoji)
// export const setZeroRenderables = (renderables: any) => (ZERO_RENDERABLES = renderables)

const MockErrorsRenderables = {
  ErrorState: () => 'errorState</',
}

const MockStreamRenderables = {
  notificationList: () => 'notificationList',
  postsAsGrid: () => 'postsAsGrid',
  postsAsList: () => 'postsAsList',
  profileToggles: () => 'profileToggles',
  usersAsGrid: () => 'usersAsGrid',
  usersAsInviteeGrid: () => 'usersAsInviteeGrid',
  usersAsInviteeList: () => 'usersAsInviteeList',
  usersAsCompact: () => 'usersAsCompact',
}

const MockZeroRenderables = {
  postsAsGrid: () => 'postsAsGrid',
  postsAsList: () => 'postsAsList',
  usersAsGrid: () => 'usersAsGrid',
  usersAsInviteeGrid: () => 'usersAsInviteeGrid',
  usersAsInviteeList: () => 'usersAsInviteeList',
}

setErrorRenderables(MockErrorsRenderables)
setStreamRenderables(MockStreamRenderables)
setZeroRenderables(MockZeroRenderables)
