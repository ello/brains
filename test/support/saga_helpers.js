/* eslint-disable prefer-rest-params, func-names, prefer-arrow-callback */
import { call, fork, put, select, take } from 'redux-saga/effects'
import chaiGenerator from 'chai-generator'

export default function (chai, utils) {
  chai.use(chaiGenerator)
  const { Assertion } = chai

  /* I stole this from chai-generator */
  function extractNext(obj) {
    if (typeof obj.next === 'function') {
      const generator = obj
      return generator.next()
    } else if ('done' in obj && 'value' in obj) {
      return obj
    }
    throw new Error('Not a generator')
  }

  function compareCalls(fn, ...args) {
    const obj = utils.flag(this, 'yield.call')

    const assertion = new Assertion(obj)
    // transfer flags to new assertion so stuff like negation still works
    utils.transferFlags(this, assertion, true)

    // If we have args, check for a specific call
    if (arguments.length !== 0) {
      assertion.to.deep.yield(call(fn, ...args))
    } else {
      // Otherwise, just look for a call
      assertion.to.have.property('CALL')
    }
  }

  function setCallFlag() {
    const actual = extractNext(utils.flag(this, 'object')).value
    utils.flag(this, 'yield.call', actual)
  }

  Assertion.addChainableMethod('call', compareCalls, setCallFlag)

  Assertion.overwriteMethod('fn', function (/* _super */) {
    return function (fn) {
      const actual = utils.flag(this, 'yield.call')
      if (actual) {
        const assertion = new Assertion(actual)
        utils.transferFlags(this, assertion, false)
        assertion.to.have.deep.property('CALL.fn')
        assertion.to.eq(fn)
      }
    }
  })

  // Assert.overwriteMethod('something', function (_super) {
  //   return function () {
  //     const actual = utils.flag(this, 'yield.call')
  //     if (actual) {

  //     }
  //   }
  // })
  Assertion.overwriteMethod('args', function (/* _super */) {
    return function (...args) {
      const actual = utils.flag(this, 'yield.call')
      if (actual) {
        const assertion = new Assertion(actual).to.have.deep.property('CALL.args')
        args.forEach((arg) => {
          if (arg instanceof RegExp) {
            assertion.to.match(arg)
          } else {
            assertion.to.include(arg)
          }
        })
      }
    }
  })

  // TODO: make this just like the 'call' assertions
  Assertion.overwriteMethod('fork', function (/* _super */) {
    return function (fn, ...args) {
      const actionObj = utils.flag(this, 'object')
      const assertion = new Assertion(actionObj)
      utils.transferFlags(this, assertion)
      assertion.to.deep.yield(fork(fn, ...args))
    }
  })
  Assertion.overwriteMethod('take', function (/* _super */) {
    return function (...actionTypes) {
      const actionObj = utils.flag(this, 'object')
      const assertion = new Assertion(actionObj)
      utils.transferFlags(this, assertion)
      assertion.to.deep.yield(take(...actionTypes))
    }
  })

  Assertion.overwriteMethod('select', function (/* _super */) {
    return function (selector) {
      this.to.deep.yield(select(selector))
    }
  })

  Assertion.overwriteMethod('put', function (/* _super */) {
    return function (action) {
      const actionObj = utils.flag(this, 'object')
      const assertion = new Assertion(actionObj)
      utils.transferFlags(this, assertion)
      assertion.to.deep.yield(put(action))
    }
  })
}
