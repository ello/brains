import 'babel-polyfill'
import chai, { expect } from 'chai'
import chaiImmutable from 'chai-immutable'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'

chai.use(chaiImmutable)
chai.use(sinonChai)

global.chai = chai
global.expect = expect
global.sinon = sinon
