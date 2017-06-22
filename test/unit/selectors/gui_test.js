import Immutable from 'immutable'
import * as selector from '../../../src/selectors/gui'

describe('gui selectors', () => {
  context('#selectActiveNotificationScrollPosition', () => {
    it('selects with memoization the device size string', () => {
      let state = { gui: Immutable.fromJS({
        notificationScrollPositions: { all: 666, comments: 420 },
        activeNotificationsType: 'all',
      }) }
      selector.selectActiveNotificationScrollPosition.resetRecomputations()
      expect(selector.selectActiveNotificationScrollPosition(state)).to.equal(666)

      state = { gui: state.gui.set('activeNotificationsType', 'comments') }
      expect(selector.selectActiveNotificationScrollPosition(state)).to.equal(420)
      expect(selector.selectActiveNotificationScrollPosition.recomputations()).to.equal(2)
    })
  })

  context('#selectDeviceSize', () => {
    it('selects with memoization the device size string', () => {
      let state = { gui: Immutable.fromJS({ columnCount: 2, innerWidth: 375, change: false }) }
      selector.selectDeviceSize.resetRecomputations()
      expect(selector.selectDeviceSize(state)).to.equal('mobile')

      state = { gui: state.gui.set('change', true) }
      expect(selector.selectDeviceSize(state)).to.equal('mobile')
      expect(selector.selectDeviceSize.recomputations()).to.equal(1)

      state = { gui: state.gui.set('change', false).set('innerWidth', 800) }
      expect(selector.selectDeviceSize(state)).to.equal('tablet')
      expect(selector.selectDeviceSize.recomputations()).to.equal(2)

      state = { gui: state.gui.set('columnCount', 4).set('innerWidth', 1280) }
      expect(selector.selectDeviceSize(state)).to.equal('desktop')
      expect(selector.selectDeviceSize.recomputations()).to.equal(3)

      state = { gui: state.gui.set('change', true) }
      expect(selector.selectDeviceSize(state)).to.equal('desktop')
      expect(selector.selectDeviceSize.recomputations()).to.equal(3)
    })
  })

  context('#selectIsMobile', () => {
    it('selects with memoization if the gui is a mobile device size or not', () => {
      let state = { gui: Immutable.fromJS({ columnCount: 2, innerWidth: 375, change: false }) }
      selector.selectIsMobile.resetRecomputations()
      expect(selector.selectIsMobile(state)).to.equal(true)

      state = { gui: state.gui.set('change', true) }
      expect(selector.selectIsMobile(state)).to.equal(true)
      expect(selector.selectIsMobile.recomputations()).to.equal(1)

      state = { gui: state.gui.set('change', false).set('innerWidth', 800) }
      expect(selector.selectIsMobile(state)).to.equal(false)
      expect(selector.selectIsMobile.recomputations()).to.equal(2)

      state = { gui: state.gui.set('columnCount', 4).set('innerWidth', 1280) }
      expect(selector.selectIsMobile(state)).to.equal(false)
      expect(selector.selectIsMobile.recomputations()).to.equal(3)

      state = { gui: state.gui.set('change', true) }
      expect(selector.selectIsMobile(state)).to.equal(false)
      expect(selector.selectIsMobile.recomputations()).to.equal(3)
    })
  })

  context('#selectIsMobileGridStream', () => {
    it('selects with memoization if in mobile and is in grid mode', () => {
      let state = {
        gui: Immutable.fromJS({ columnCount: 2, innerWidth: 375, isGridMode: true, change: false }),
      }
      expect(selector.selectIsMobileGridStream(state)).to.equal(true)

      state = { gui: state.gui.set('change', true) }
      expect(selector.selectIsMobileGridStream(state)).to.equal(true)
      expect(selector.selectIsMobileGridStream.recomputations()).to.equal(1)

      state = { gui: state.gui.set('columnCount', 4).set('innerWidth', 1280) }
      expect(selector.selectIsMobileGridStream(state)).to.equal(false)
      expect(selector.selectIsMobileGridStream.recomputations()).to.equal(2)

      state = { gui: state.gui.set('columnCount', 2)
        .set('innerWidth', 375).set('isGridMode', false) }
      expect(selector.selectIsMobileGridStream(state)).to.equal(false)
      expect(selector.selectIsMobileGridStream.recomputations()).to.equal(3)
    })
  })

  context('#selectPaddingOffset', () => {
    it('selects with memoization the padding offset based on the device size', () => {
      let state = { gui: Immutable.fromJS({ columnCount: 2, innerWidth: 375, change: false }) }
      selector.selectPaddingOffset.resetRecomputations()
      expect(selector.selectPaddingOffset(state)).to.equal(10)

      state = { gui: state.gui.set('change', true) }
      expect(selector.selectPaddingOffset(state)).to.equal(10)
      expect(selector.selectPaddingOffset.recomputations()).to.equal(1)

      state = { gui: state.gui.set('change', false).set('innerWidth', 800) }
      expect(selector.selectPaddingOffset(state)).to.equal(20)
      expect(selector.selectPaddingOffset.recomputations()).to.equal(2)

      state = { gui: state.gui.set('columnCount', 4).set('innerWidth', 1280) }
      expect(selector.selectPaddingOffset(state)).to.equal(40)
      expect(selector.selectPaddingOffset.recomputations()).to.equal(3)

      state = { gui: state.gui.set('change', true) }
      expect(selector.selectPaddingOffset(state)).to.equal(40)
      expect(selector.selectPaddingOffset.recomputations()).to.equal(3)
    })
  })

  context('#selectCommentOffset', () => {
    it('selects with memoization the comment offset', () => {
      let state = { gui: Immutable.fromJS({ columnCount: 2, innerWidth: 375, change: false }) }
      expect(selector.selectCommentOffset(state)).to.equal(40)

      state = { gui: state.gui.set('change', true) }
      expect(selector.selectCommentOffset(state)).to.equal(40)
      expect(selector.selectCommentOffset.recomputations()).to.equal(1)

      state = { gui: state.gui.set('columnCount', 4).set('innerWidth', 1280).set('change', false) }
      expect(selector.selectCommentOffset(state)).to.equal(60)
      expect(selector.selectCommentOffset.recomputations()).to.equal(2)
    })
  })

  context('#selectColumnWidth', () => {
    it('selects with memoization the column width', () => {
      let state = { gui: Immutable.fromJS({ columnCount: 2, innerWidth: 375, change: false }) }
      expect(selector.selectColumnWidth(state)).to.equal(173)

      state = { gui: state.gui.set('change', true) }
      expect(selector.selectColumnWidth(state)).to.equal(173)
      expect(selector.selectColumnWidth.recomputations()).to.equal(1)

      state = { gui: state.gui.set('change', false).set('innerWidth', 800).set('columnCount', 3) }
      expect(selector.selectColumnWidth(state)).to.equal(240)
      expect(selector.selectColumnWidth.recomputations()).to.equal(2)

      state = { gui: state.gui.set('innerWidth', 1280).set('columnCount', 4) }
      expect(selector.selectColumnWidth(state)).to.equal(270)
      expect(selector.selectColumnWidth.recomputations()).to.equal(3)

      state = { gui: state.gui.set('change', true) }
      expect(selector.selectColumnWidth(state)).to.equal(270)
      expect(selector.selectColumnWidth.recomputations()).to.equal(3)
    })
  })

  context('#selectContentWidth', () => {
    it('selects with memoization the content width', () => {
      let state = { gui: Immutable.fromJS({ columnCount: 2, innerWidth: 375, change: false }) }
      expect(selector.selectContentWidth(state)).to.equal(355)

      state = { gui: state.gui.set('change', true) }
      expect(selector.selectContentWidth(state)).to.equal(355)
      expect(selector.selectContentWidth.recomputations()).to.equal(1)

      state = { gui: state.gui.set('change', false).set('innerWidth', 640) }
      expect(selector.selectContentWidth(state)).to.equal(600)
      expect(selector.selectContentWidth.recomputations()).to.equal(2)

      state = { gui: state.gui.set('columnCount', 4).set('innerWidth', 1280) }
      expect(selector.selectContentWidth(state)).to.equal(1200)
      expect(selector.selectContentWidth.recomputations()).to.equal(3)

      state = { gui: state.gui.set('change', true) }
      expect(selector.selectContentWidth(state)).to.equal(1200)
      expect(selector.selectContentWidth.recomputations()).to.equal(3)
    })
  })

  context('#selectDPI', () => {
    it('selects with memoization the full screen dpi setting as a string', () => {
      let state = { gui: Immutable.fromJS({ innerWidth: 375, change: false }) }
      selector.selectDPI.resetRecomputations()
      expect(selector.selectDPI(state)).to.equal('hdpi')

      state = { gui: state.gui.set('change', true) }
      expect(selector.selectDPI(state)).to.equal('hdpi')
      expect(selector.selectDPI.recomputations()).to.equal(1)

      state = { gui: state.gui.set('change', false).set('innerWidth', 1280) }
      expect(selector.selectDPI(state)).to.equal('xhdpi')
      expect(selector.selectDPI.recomputations()).to.equal(2)

      state = { gui: state.gui.set('innerWidth', 2560) }
      expect(selector.selectDPI(state)).to.equal('optimized')
      expect(selector.selectDPI.recomputations()).to.equal(3)

      state = { gui: state.gui.set('change', true) }
      expect(selector.selectDPI(state)).to.equal('optimized')
      expect(selector.selectDPI.recomputations()).to.equal(3)
    })
  })

  context('#selectHasSaidHelloTo', () => {
    it('selects whether a user has been said hello to', () => {
      const state = { gui: Immutable.fromJS({ saidHelloTo: ['archer', 'lana'] }) }
      const props = { params: { username: 'archer' } }
      selector.selectHasSaidHelloTo.resetRecomputations()
      expect(selector.selectHasSaidHelloTo(state, props)).to.be.true
      expect(selector.selectHasSaidHelloTo.recomputations()).to.equal(1)
    })
  })

  context('#selectScrollOffset', () => {
    it('selects with memoization the scroll offset', () => {
      let state = { gui: Immutable.fromJS({ innerHeight: 100, change: false }) }
      expect(selector.selectScrollOffset(state)).to.equal(20)

      state = { gui: state.gui.set('change', true).set('innerHeight', 100) }
      expect(selector.selectScrollOffset(state)).to.equal(20)
      expect(selector.selectScrollOffset.recomputations()).to.equal(1)

      state = { gui: state.gui.set('innerHeight', 666) }
      expect(selector.selectScrollOffset(state)).to.equal(586)
      expect(selector.selectScrollOffset.recomputations()).to.equal(2)
    })
  })

  context('#selectIsLayoutToolHidden', () => {
    it('selects with memoization whether the current route has a promotion', () => {
      let state = { routing: Immutable.fromJS({ location: { pathname: '/search', change: false } }) }
      expect(selector.selectIsLayoutToolHidden(state)).to.equal(false)

      state = { routing: state.routing.setIn(['location', 'change'], true) }
      expect(selector.selectIsLayoutToolHidden(state)).to.equal(false)
      expect(selector.selectIsLayoutToolHidden.recomputations()).to.equal(1)

      // User search doesn't show the tools
      const props = { location: { pathname: '/search', query: { type: 'users' } } }
      expect(selector.selectIsLayoutToolHidden(state, props)).to.equal(true)
      expect(selector.selectIsLayoutToolHidden.recomputations()).to.equal(2)

      state = { routing: state.routing.setIn(['location', 'pathname'], '/discover') }
      expect(selector.selectIsLayoutToolHidden(state)).to.equal(false)
      expect(selector.selectIsLayoutToolHidden.recomputations()).to.equal(3)

      state = { routing: state.routing.setIn(['location', 'pathname'], '/discover/stuff') }
      expect(selector.selectIsLayoutToolHidden(state)).to.equal(false)

      const hasLayoutTools = [
        '/following',
        '/invitiations',
        '/mk',
        '/mk/loves',
      ]
      hasLayoutTools.forEach((route) => {
        state = { routing: state.routing.setIn(['location', 'pathname'], route) }
        expect(selector.selectIsLayoutToolHidden(state)).to.equal(false, `${route} should have layout tools.`)
      })

      const noLayoutTools = [
        '/',
        '/settings',
        '/onboarding',
        '/onboarding/settings',
        '/notifications',
        '/mk/post/etlb9br06dh6tleztw4g',
        '/mk/following',
        '/mk/followers',
      ]
      noLayoutTools.forEach((route) => {
        state = { routing: state.routing.setIn(['location', 'pathname'], route) }
        expect(selector.selectIsLayoutToolHidden(state)).to.equal(true, `${route} should not have layout tools.`)
      })
    })
  })
})

