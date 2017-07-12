import {
  selectCategories,
  selectCategory,
  selectCategoryName,
  selectCategoryPageTitle,
  selectCategorySlug,
  selectCategoryTabs,
  selectCategoryTileImageUrl,
  selectCreatorTypeCategories,
  selectOnboardingCategories,
  selectOnboardingCategoriesFiltered,
  selectPropsCategoryId,
  sortCategories,
} from '../../../src/selectors/categories'
import { clearJSON, json, stubJSONStore } from '../../support/stubs'

describe('categories selectors', () => {
  let params
  let location
  let state
  beforeEach(() => {
    stubJSONStore()
    params = { token: 'paramsToken', type: 'paramsType' }
    location = { pathname: '/discover' }
    state = { json }
  })

  afterEach(() => {
    clearJSON()
    params = {}
    location = {}
  })

  context('#selectPropsCategoryId', () => {
    it('returns the correct props category id from a categoryId', () => {
      const props = { categoryId: '666' }
      expect(selectPropsCategoryId(state, props)).to.equal('666')
    })
  })

  context('#selectCategory', () => {
    it('returns a post from a postId', () => {
      state = { json }
      const props = { categoryId: '1' }
      const category = selectCategory(state, props)
      expect(category).to.deep.equal(state.json.get('categories').first())
    })
  })

  context('#selectCategoryName', () => {
    it('returns category name', () => {
      state = { json }
      const props = { categoryId: '1' }
      const categoryName = selectCategoryName(state, props)
      expect(categoryName).to.equal('Featured')
    })
  })

  context('#selectCategorySlug', () => {
    it('returns category slug', () => {
      state = { json }
      const props = { categoryId: '1' }
      const categorySlug = selectCategorySlug(state, props)
      expect(categorySlug).to.equal('featured')
    })
  })

  context('#selectCategoryTileImageUrl', () => {
    it('returns category slug', () => {
      state = { json }
      const props = { categoryId: '1' }
      const categoryTileImageUrl = selectCategoryTileImageUrl(state, props)
      expect(categoryTileImageUrl).to.equal('/tile_image/1/large.png')
    })
  })

  context('#selectCategories', () => {
    it('returns the category object with memoization', () => {
      const props = { params, location }
      const categories = state.json.get('categories')
      const values = categories.valueSeq()
      let meta = []
      let primary = []
      let secondary = []
      let tertiary = []
      values.forEach((category) => {
        switch (category.get('level')) {
          case 'meta':
            meta.push(category)
            break
          case 'primary':
            primary.push(category)
            break
          case 'secondary':
            secondary.push(category)
            break
          case 'tertiary':
            tertiary.push(category)
            break
          default:
            break
        }
      })
      meta = meta.sort(sortCategories)
      primary = primary.sort(sortCategories)
      secondary = secondary.sort(sortCategories)
      tertiary = tertiary.sort(sortCategories)
      const selected = selectCategories(state, props)
      const compare = { meta, primary, secondary, tertiary }
      expect(selected).to.deep.equal(compare)
    })
  })

  context('#selectOnboardingCategories', () => {
    it('the categories as a concatenated array', () => {
      const cats = selectCategories(state)
      const categoryArray = cats.primary.concat(cats.secondary, cats.tertiary)
      expect(selectOnboardingCategories(state)).to.deep.equal(categoryArray)
    })
  })

  context('#selectOnboardingCategoriesFiltered', () => {
    it('the allowInOnboarding categories as a concatenated array', () => {
      const cats = selectCategories(state)
      expect(selectOnboardingCategoriesFiltered(state)).to.deep.equal(cats.primary)
      expect(selectOnboardingCategoriesFiltered(state)).not.to.contain(cats.secondary[0])
    })
  })

  context('#selectCreatorTypeCategories', () => {
    it('the allowInOnboarding categories as a concatenated array', () => {
      const cats = selectCategories(state)
      expect(selectCreatorTypeCategories(state)).to.deep.equal(cats.secondary)
      expect(selectCreatorTypeCategories(state)).not.to.contain(cats.primary[0])
    })
  })

  context('#selectCategoryTabs', () => {
    it('returns the correct stream action for featured and recommended', () => {
      const tabs = selectCategoryTabs(state)
      // meta
      expect(tabs[0]).to.have.property('label', 'Featured')
      expect(tabs[0]).to.have.property('to', '/discover')
      expect(tabs[1]).to.have.property('label', 'Trending')
      expect(tabs[1]).to.have.property('to', '/discover/trending')
      expect(tabs[2]).to.have.property('label', 'Recent')
      expect(tabs[2]).to.have.property('to', '/discover/recent')
      // primary
      expect(tabs[3]).to.have.property('label', 'Metal')
      expect(tabs[3]).to.have.property('to', '/discover/metal')
      expect(tabs[4]).to.have.property('label', 'Art')
      expect(tabs[4]).to.have.property('to', '/discover/art')
      // secondary
      expect(tabs[5]).to.have.property('label', 'Collage')
      expect(tabs[5]).to.have.property('to', '/discover/collage')
      expect(tabs[6]).to.have.property('label', 'Interviews')
      expect(tabs[6]).to.have.property('to', '/discover/interviews')
      // tertiary
      expect(tabs[7]).to.have.property('label', 'Music')
      expect(tabs[7]).to.have.property('to', '/discover/music')
      expect(tabs[8]).to.have.property('label', 'Development')
      expect(tabs[8]).to.have.property('to', '/discover/development')
    })
  })

  context('#selectCategoryPageTitle', () => {
    it('returns the page title related to the /discover page with memoization', () => {
      const props = { params: { token: 'paramsToken', type: 'arktip-x-ello' }, location }
      expect(selectCategoryPageTitle(state, props)).to.equal('Arktip x Ello')
      const nextProps = { ...props, blah: 1 }
      expect(selectCategoryPageTitle(state, nextProps)).to.equal('Arktip x Ello')
      expect(selectCategoryPageTitle.recomputations()).to.equal(1)
      const nextNextProps = { ...nextProps, params: { token: 'paramsToken', type: 'all' } }
      expect(selectCategoryPageTitle(state, nextNextProps)).to.be.null
      const lastProps = { ...nextNextProps, params: { token: 'paramsToken', type: 'recommended' } }
      expect(selectCategoryPageTitle(state, lastProps)).to.equal('Featured')
    })
  })

  context('#selectDiscoverMetaData', () => {
    it('should be tested')
  })
})

