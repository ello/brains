import Immutable from 'immutable'
import {
  selectAllowsAnalytics,
  selectAnalyticsId,
  selectAvailability,
  selectAvatar,
  selectBioLabel,
  selectBlockedCount,
  selectBuildVersion,
  selectBundleId,
  selectCoverImage,
  selectCreatedAt,
  selectCreatorTypes,
  selectEmail,
  selectExternalLinksList,
  selectHasAvatarPresent,
  selectHasCoverImagePresent,
  selectId,
  selectIsAvatarBlank,
  selectIsCoverImageBlank,
  selectIsInfoFormBlank,
  selectIsNabaroo,
  selectIsPublic,
  selectIsStaff,
  selectProfileIsCollaborateable,
  selectProfileIsHireable,
  selectLinksAsText,
  selectMarketingVersion,
  selectMutedCount,
  selectName,
  selectRegistrationId,
  selectShortBio,
  selectUsername,
  selectWebOnboardingVersion,
  selectProfileIsFeatured,
} from '../../../src/selectors/profile'
import { clearJSON, json, stubUser } from '../../support/stubs'

describe('profile selectors', () => {
  let state
  beforeEach(() => {
    const profile = stubUser({
      allowsAnalytics: true,
      analyticsId: 'analyticsId',
      availability: true,
      blockedCount: 5,
      buildVersion: 'buildVersion',
      bundleId: 'bundleId',
      hasAvatarPresent: true,
      hasCoverImagePresent: true,
      isNabaroo: false,
      isPublic: true,
      isStaff: false,
      isCollaborateable: false,
      isHireable: true,
      marketingVersion: '1',
      mutedCount: 10,
      registrationId: '1234',
      webOnboardingVersion: '1',
    })
    state = { json, profile: Immutable.fromJS(profile) }
  })

  afterEach(() => {
    clearJSON()
  })

  context('#selectAllowsAnalytics', () => {
    it('returns the profile.allowsAnalytics', () => {
      expect(selectAllowsAnalytics(state)).to.equal(true)
    })
  })

  context('#selectAnalyticsId', () => {
    it('returns the profile.analyticsId', () => {
      expect(selectAnalyticsId(state)).to.equal('analyticsId')
    })
  })

  context('#selectAvailability', () => {
    it('returns the profile.availability', () => {
      expect(selectAvailability(state)).to.equal(true)
    })
  })

  context('#selectAvatar', () => {
    it('returns the profile.avatar', () => {
      expect(selectAvatar(state)).to.deep.equal(state.profile.get('avatar'))
    })
  })

  context('#selectBlockedCount', () => {
    it('returns the profile.blockedCount', () => {
      expect(selectBlockedCount(state)).to.deep.equal(state.profile.get('blockedCount'))
    })
  })

  context('#selectBuildVersion', () => {
    it('returns the profile.buildVersion', () => {
      expect(selectBuildVersion(state)).to.deep.equal(state.profile.get('buildVersion'))
    })
  })

  context('#selectBundleId', () => {
    it('returns the profile.bundleId', () => {
      expect(selectBundleId(state)).to.deep.equal(state.profile.get('bundleId'))
    })
  })

  context('#selectCoverImage', () => {
    it('returns the profile.coverImage', () => {
      expect(selectCoverImage(state)).to.deep.equal(state.profile.get('coverImage'))
    })
  })

  context('#selectCreatedAt', () => {
    it('returns the profile.createdAt', () => {
      expect(selectCreatedAt(state)).to.deep.equal(state.profile.get('createdAt'))
    })
  })

  context('#selectCreatorTypes', () => {
    it('returns the profile.creatorTypes', () => {
      expect(selectCreatorTypes(state)).to.deep.equal(state.profile.get('creatorTypes'))
    })
  })

  context('#selectEmail', () => {
    it('returns the profile.email', () => {
      expect(selectEmail(state)).to.deep.equal(state.profile.get('email'))
    })
  })

  context('#selectExternalLinksList', () => {
    it('returns the profile.externalLinksList', () => {
      expect(selectExternalLinksList(state)).to.deep.equal(state.profile.get('externalLinksList'))
    })
  })

  context('#selectHasAvatarPresent', () => {
    it('returns the profile.hasAvatarPresent', () => {
      expect(selectHasAvatarPresent(state)).to.deep.equal(state.profile.get('hasAvatarPresent'))
    })
  })

  context('#selectHasCoverImagePresent', () => {
    it('returns the profile.hasCoverImagePresent', () => {
      expect(selectHasCoverImagePresent(state)).to.deep.equal(state.profile.get('hasCoverImagePresent'))
    })
  })

  context('#selectId', () => {
    it('returns the profile.id', () => {
      expect(selectId(state)).to.deep.equal(state.profile.get('id'))
    })
  })

  context('#selectIsNabaroo', () => {
    it('returns the profile.isNabaroo', () => {
      expect(selectIsNabaroo(state)).to.deep.equal(state.profile.get('isNabaroo'))
    })
  })

  context('#selectIsPublic', () => {
    it('returns the profile.isPublic', () => {
      expect(selectIsPublic(state)).to.deep.equal(state.profile.get('isPublic'))
    })
  })

  context('#selectIsStaff', () => {
    it('returns the profile.isStaff', () => {
      expect(selectIsStaff(state)).to.deep.equal(state.profile.get('isStaff'))
    })
  })

  context('#selectProfileIsCollaborateable', () => {
    it('returns the profile.isCollaborateable property', () => {
      expect(selectProfileIsCollaborateable(state)).to.equal(false)
    })
  })

  context('#selectProfileIsHireable', () => {
    it('returns the profile.isHireable property', () => {
      expect(selectProfileIsHireable(state)).to.equal(true)
    })
  })

  context('#selectMarketingVersion', () => {
    it('returns the profile.marketingVersion', () => {
      expect(selectMarketingVersion(state)).to.deep.equal(state.profile.get('marketingVersion'))
    })
  })

  context('#selectMutedCount', () => {
    it('returns the profile.mutedCount', () => {
      expect(selectMutedCount(state)).to.deep.equal(state.profile.get('mutedCount'))
    })
  })

  context('#selectName', () => {
    it('returns the profile.name', () => {
      expect(selectName(state)).to.equal(state.profile.get('name'))
    })
  })

  context('#selectRegistrationId', () => {
    it('returns the profile.registrationId', () => {
      expect(selectRegistrationId(state)).to.deep.equal(state.profile.get('registrationId'))
    })
  })

  context('#selectShortBio', () => {
    it('returns the profile.shortBio', () => {
      expect(selectShortBio(state)).to.deep.equal(state.profile.get('shortBio'))
    })
  })

  context('#selectUsername', () => {
    it('returns the profile.username', () => {
      expect(selectUsername(state)).to.deep.equal(state.profile.get('username'))
    })
  })

  context('#selectWebOnboardingVersion', () => {
    it('returns the profile.webOnboardingVersion', () => {
      expect(selectWebOnboardingVersion(state)).to.deep.equal(state.profile.get('webOnboardingVersion'))
    })
  })

  context('#selectIsAvatarBlank', () => {
    it('returns a memoized version of a blank avatar', () => {
      expect(selectIsAvatarBlank(state)).to.equal(false)
      state.change = 1
      expect(selectIsAvatarBlank(state)).to.equal(false)
      expect(selectIsAvatarBlank.recomputations()).to.equal(1)
    })
  })

  context('#selectIsCoverImageBlank', () => {
    it('returns a memoized version of a blank coverImage', () => {
      expect(selectIsCoverImageBlank(state)).to.equal(false)
      state.change = 1
      expect(selectIsCoverImageBlank(state)).to.equal(false)
      expect(selectIsCoverImageBlank.recomputations()).to.equal(1)
    })
  })

  context('#selectIsInfoFormBlank', () => {
    it('returns a memoized version of a blank info form', () => {
      expect(selectIsInfoFormBlank(state)).to.equal(false)
      state.change = 1
      expect(selectIsInfoFormBlank(state)).to.equal(false)
      expect(selectIsInfoFormBlank.recomputations()).to.equal(1)
    })
  })

  context('#selectLinksAsText', () => {
    it('returns a memoized version of links text', () => {
      expect(selectLinksAsText(state)).to.deep.equal('google.com')
      state.change = 1
      expect(selectLinksAsText(state)).to.deep.equal('google.com')
      expect(selectLinksAsText.recomputations()).to.equal(1)
    })
  })

  context('#selectProfileIsFeatured', () => {
    it('returns whether the profile isFeatured (false)', () => {
      const result = selectProfileIsFeatured(state)
      expect(result).to.equal(false)
    })

    it('returns whether the profile isFeatured (true)', () => {
      state.profile = state.profile.setIn(['links', 'categories'], Immutable.List('1'))
      const result = selectProfileIsFeatured(state)
      expect(result).to.equal(true)
    })
  })

  context('#selectBioLabel', () => {
    it('returns the label to use for a bio field (Bio)', () => {
      const result = selectBioLabel(state)
      expect(result).to.equal('Bio')
    })

    it('returns the label to use for a bio field (Community)', () => {
      state.profile = state.profile.setIn(['isCommunity'], true)
      const result = selectBioLabel(state)
      expect(result).to.equal('Community Info')
    })
  })
})

