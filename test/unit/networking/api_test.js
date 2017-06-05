import * as api from '../../../src/networking/api'
import { stub } from '../../support/stubs'

describe('api.js', () => {
  context('assets', () => {
    it('#s3CredentialsPath', () => {
      expect(api.s3CredentialsPath().path).to.match(/\/assets\/credentials$/)
    })
  })

  context('authentication', () => {
    it('#accessTokens', () => {
      expect(api.accessTokens().path).to.match(/\/oauth\/token/)
    })

    it('#forgotPassword', () => {
      expect(api.forgotPassword().path).to.match(/\/forgot-password$/)
    })
  })

  context('profile', () => {
    it('#profilePath', () => {
      expect(api.profilePath().path).to.match(/\/profile$/)
    })
  })

  context('onboarding', () => {
    it('#awesomePeoplePath', () => {
      expect(api.awesomePeoplePath().path).to.match(/\/discover\/users\/onboarding\?/)
    })

    it('#communitiesPath', () => {
      expect(api.communitiesPath().path).to.match(/\/interest_categories\/members\?/)
    })

    it('#relationshipBatchPath', () => {
      expect(api.relationshipBatchPath().path).to.match(/\/relationships\/batches$/)
    })
  })

  context('streams', () => {
    it('#followingStream', () => {
      expect(api.followingStream().path).to.match(/\/following\/posts\/recent\?/)
    })
  })

  context('posts', () => {
    it('#postDetail', () => {
      expect(api.postDetail('~666').path).to.match(/\/posts\/~666\?/)
    })

    it('#lovePost', () => {
      expect(api.lovePost('666').path).to.match(/\/posts\/666\/loves/)
    })

    it('#unlovePost', () => {
      expect(api.unlovePost('666').path).to.match(/\/posts\/666\/love/)
    })

    it('#deletePost', () => {
      expect(api.deletePost('666').path).to.match(/\/posts\/666$/)
    })

    it('#flagPost', () => {
      expect(api.flagPost('666', 'ants').path).to.match(/\/posts\/666\/flag\/ants$/)
    })

    it('#postReposters', () => {
      expect(api.postReposters('666').path).to.match(/\/posts\/666\/reposters\?per_page=/)
    })

    it('#postLovers', () => {
      expect(api.postLovers('666').path).to.match(/\/posts\/666\/lovers/)
    })

    it('#postLovers', () => {
      expect(api.postReplyAll('666').path).to.match(/\/posts\/666\/commenters_usernames/)
    })
  })

  context('comments', () => {
    it('#commentsForPost', () => {
      expect(api.commentsForPost('what').path).to.match(/\/posts\/what\/comments\?/)
    })

    it('#deleteComment', () => {
      expect(api.deleteComment(stub('comment', {
        id: '42',
        postId: '666',
      })).path).to.match(/\/posts\/666\/comments\/42$/)
    })

    it('#flagComment', () => {
      expect(api.flagComment(stub('comment', {
        id: '42',
        postId: '666',
      }), 'ants').path).to.match(/\/posts\/666\/comments\/42\/flag\/ants$/)
    })
  })

  context('users', () => {
    it('#userDetail', () => {
      expect(api.userDetail('~666').path).to.match(/\/users\/~666\?post_count=false$/)
    })

    it('#userResources', () => {
      expect(api.userResources('~666', 'loves').path).to.match(/\/users\/~666\/loves\?per_page=/)
    })

    it('#flagUser', () => {
      expect(api.flagUser('666', 'ants').path).to.match(/\/users\/666\/flag\/ants$/)
    })
  })

  context('search', () => {
    it('#searchPosts', () => {
      expect(api.searchPosts({ terms: 'blah' }).path).to.match(/\/posts\?terms=blah/)
    })

    it('#searchUsers', () => {
      expect(api.searchUsers({ terms: 'blah' }).path).to.match(/\/users\?terms=blah/)
    })
  })

  context('notifications', () => {
    it('#notifications', () => {
      expect(api.notifications().path).to.match(/\/notifications/)
    })
    it('#notifications?category=mentions', () => {
      expect(api.notifications({ category: 'mentions' }).path)
        .to.match(/\/notifications\?.*\bcategory=mentions/)
    })
    it('#notifications?category=all', () => {
      expect(api.notifications({ category: 'all' }).path).to.match(/\/notifications/)
    })
  })

  context('availability', () => {
    it('#availability', () => {
      expect(api.availability().path).to.match(/\/availability$/)
    })
  })

  context('invitations', () => {
    it('#invite', () => {
      expect(api.invite().path).to.match(/\/invitations/)
    })
  })

  context('relationships', () => {
    it('#relationshipAdd', () => {
      expect(api.relationshipAdd('666', 'buddy').path).to.match(/\/users\/666\/add\/buddy$/)
    })
  })

  context('hireUser', () => {
    it('#hireUser', () => {
      expect(api.hireUser('666', 'subject', 'message body').path).to.match(/\/users\/666\/hire_me$/)
    })
  })
})

