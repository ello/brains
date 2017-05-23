import Immutable from 'immutable'
import * as selector from '../../../src/selectors/notifications'
import { clearJSON, json, stubAnnouncementNotification } from '../../support/stubs'

describe('announcement selectors', () => {
  const gui = Immutable.Map({ lastAnnouncementSeen: '333' })
  let announcement
  let state
  beforeEach(() => {
    announcement = stubAnnouncementNotification()
    state = { gui, json }
  })

  afterEach(() => {
    clearJSON()
  })

  context('#selectAnnouncements', () => {
    it('returns announcements model out of json', () => {
      expect(selector.selectAnnouncements(state)).to.deep.equal(state.json.get('announcements'))
    })
  })

  context('#selectAnnouncement', () => {
    it('returns the first announcement in the model', () => {
      expect(selector.selectAnnouncement(state)).to.deep.equal(state.json.getIn(['announcements', '8']))
    })

    it('returns an empty Map if announcements have been read', () => {
      expect(selector.selectAnnouncement({ json: Immutable.Map() })).to.deep.equal(Immutable.Map())
    })
  })

  context('#selectAnnouncementBody', () => {
    it('returns the announcement.body property', () => {
      const result = selector.selectAnnouncementBody(state)
      expect(result).to.equal(announcement.get('body'))
    })
  })

  context('#selectAnnouncementCTACaption', () => {
    it('returns the announcement.ctaCaption property', () => {
      const result = selector.selectAnnouncementCTACaption(state)
      expect(result).to.equal(announcement.get('ctaCaption'))
    })
  })

  context('#selectAnnouncementCTAHref', () => {
    it('returns the announcement.ctaHref property', () => {
      const result = selector.selectAnnouncementCTAHref(state)
      expect(result).to.equal(announcement.get('ctaHref'))
    })
  })

  context('#selectAnnouncementId', () => {
    it('returns the announcement.id property', () => {
      const result = selector.selectAnnouncementId(state)
      expect(result).to.equal(announcement.get('id'))
    })
  })

  context('#selectAnnouncementImage', () => {
    it('returns the announcement.image property', () => {
      const result = selector.selectAnnouncementImage(state)
      expect(result).to.deep.equal(announcement.getIn(['image', 'hdpi', 'url']))
    })
  })

  context('#selectAnnouncementTitle', () => {
    it('returns the announcement.header property', () => {
      const result = selector.selectAnnouncementTitle(state)
      expect(result).to.equal(announcement.get('header'))
    })
  })

  context('#selectAnnouncementIsStaffPreview', () => {
    it('returns if the announcement is staff preview (false)', () => {
      const result = selector.selectAnnouncementIsStaffPreview(state)
      expect(result).to.equal(false)
    })

    it('returns if the announcement is staff preview (true)', () => {
      state.json = state.json.setIn(['announcements', '8', 'isStaffPreview'], true)
      expect(selector.selectAnnouncementIsStaffPreview(state)).to.equal(true)
    })
  })

  context('#selectAnnouncementIsEmpty', () => {
    it('returns if the announcement is empty (false)', () => {
      const result = selector.selectAnnouncementIsEmpty(state)
      expect(result).to.equal(false)
    })

    it('returns if the announcement is empty (true)', () => {
      expect(selector.selectAnnouncementIsEmpty({ json: Immutable.Map() })).to.equal(true)
    })
  })

  context('#selectAnnouncementIsUnread', () => {
    it('returns if the announcements is empty (true)', () => {
      const result = selector.selectAnnouncementIsUnread(state)
      expect(result).to.equal(true)
    })

    it('returns if the announcements is empty (false)', () => {
      expect(selector.selectAnnouncementIsUnread({ json: Immutable.Map() })).to.equal(false)
    })
  })

  context('#selectAnnouncementHasBeenViewed', () => {
    it('returns if the announcements has been viewed (false)', () => {
      const result = selector.selectAnnouncementHasBeenViewed(state)
      expect(result).to.equal(false)
    })

    it('returns if the announcements has been viewed after opening the notifications', () => {
      state = { gui: state.gui.set('lastAnnouncementSeen', '8'), json }
      const result = selector.selectAnnouncementHasBeenViewed(state)
      expect(result).to.equal(true)
    })

    it('returns if the announcements has been viewed after marking read', () => {
      state = {
        gui: state.gui.set('lastAnnouncementSeen', '8'),
        json: state.json.delete('announcements'),
      }
      const result = selector.selectAnnouncementHasBeenViewed(state)
      expect(result).to.equal(true)
    })
  })
})

