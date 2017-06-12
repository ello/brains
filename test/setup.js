import 'babel-polyfill'
import chai, { expect } from 'chai'
import chaiImmutable from 'chai-immutable'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import chaiSaga from './support/saga_helpers'
import { setStreamRenderables } from '../src/networking/api'

chai.use(chaiSaga)
chai.use(chaiImmutable)
chai.use(sinonChai)

global.chai = chai
global.expect = expect
global.sinon = sinon

const StreamRenderables = {
  postsAsList: () => 'postsAsList',
}

setStreamRenderables(StreamRenderables)

