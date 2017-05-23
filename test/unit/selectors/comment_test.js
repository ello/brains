import Immutable from 'immutable'
import * as selector from '../../../src/selectors/comment'
import {
  clearJSON,
  json,
  stub,
  stubEmbedRegion,
  stubImageRegion,
  stubTextRegion,
} from '../../support/stubs'

describe('comment selectors', () => {
  let state
  beforeEach(() => {
    stub('user', { id: '1' })
    stub('user', { id: '2' })
    stub('user', { id: '88' })
    stub('post', { authorId: '2', id: '999', token: 'token-for-comment-post' })
    stub('post', { authorId: '5', id: '333' })
    stub('comment', { authorId: '1' })
    stub('comment', {
      authorId: '2',
      body: [stubTextRegion(), stubImageRegion(), stubEmbedRegion()],
      content: [stubTextRegion(), stubImageRegion(), stubEmbedRegion()],
      createdAt: 'Today',
      id: '666',
      originalPostId: '333',
      postId: '999',
      repostId: '111',
    })
    state = { json }
  })

  afterEach(() => {
    clearJSON()
  })

  context('#selectPropsCommentId', () => {
    it('returns the correct props comment id from a commentId', () => {
      const props = { commentId: '666' }
      expect(selector.selectPropsCommentId(state, props)).to.equal('666')
    })

    it('returns the correct props comment id from a comment', () => {
      const props = { comment: stub('comment', { id: '101' }) }
      expect(selector.selectPropsCommentId(state, props)).to.equal('101')
    })
  })

  context('#selectComments', () => {
    it('returns comments model out of json', () => {
      state = { json }
      expect(selector.selectComments(state)).to.deep.equal(state.json.get('comments'))
    })
  })

  context('#selectComment', () => {
    it('returns a comment from a commentId', () => {
      const props = { commentId: '1' }
      const comment = selector.selectComment(state, props)
      expect(comment).to.deep.equal(state.json.get('comments').first())
    })

    it('returns an empty Map if commentId is not found', () => {
      state = { json }
      const props = { commentId: '166666' }
      const comment = selector.selectComment(state, props)
      expect(comment).to.deep.equal(Immutable.Map())
    })

    it('returns a comment from a comment.postId', () => {
      state = { json }
      const props = { comment: state.json.get('comments').first() }
      const comment = selector.selectComment(state, props)
      expect(comment).to.deep.equal(state.json.get('comments').first())
    })

    it('returns an empty Map if comment.commentId is not found', () => {
      state = { json }
      const props = { comment: stub('comment', { id: '99999' }) }
      const comment = selector.selectComment(state, props)
      expect(comment).to.deep.equal(Immutable.Map())
    })

    it('returns an empty Map if comment or commentId is not found', () => {
      state = { json }
      const props = {}
      const comment = selector.selectComment(state, props)
      expect(comment).to.deep.equal(Immutable.Map())
    })
  })

  context('#selectCommentAuthorId', () => {
    it('returns the comment authorId', () => {
      state = { json }
      const props = { commentId: '666' }
      const result = selector.selectCommentAuthorId(state, props)
      expect(result).to.deep.equal('2')
    })
  })

  context('#selectCommentBody', () => {
    it('returns the comment body', () => {
      state = { json }
      const props = { commentId: '666' }
      const result = selector.selectCommentBody(state, props)
      expect(result.size).to.equal(3)
    })
  })

  context('#selectCommentContent', () => {
    it('returns the comment content', () => {
      state = { json }
      const props = { commentId: '666' }
      const result = selector.selectCommentBody(state, props)
      expect(result.size).to.equal(3)
    })
  })

  context('#selectCommentCreatedAt', () => {
    it('returns the comment created at', () => {
      state = { json }
      const props = { commentId: '666' }
      const result = selector.selectCommentCreatedAt(state, props)
      expect(result).to.equal('Today')
    })
  })

  context('#selectCommentOriginalPostId', () => {
    it('returns the comment original post id', () => {
      state = { json }
      const props = { commentId: '666' }
      const result = selector.selectCommentOriginalPostId(state, props)
      expect(result).to.equal('333')
    })
  })

  context('#selectCommentPostId', () => {
    it('returns the comment post id', () => {
      state = { json }
      const props = { commentId: '666' }
      const result = selector.selectCommentPostId(state, props)
      expect(result).to.equal('999')
    })
  })

  context('#selectCommentRepostId', () => {
    it('returns the comment repost id', () => {
      state = { json }
      const props = { commentId: '666' }
      const result = selector.selectCommentRepostId(state, props)
      expect(result).to.equal('111')
    })
  })

  context('#selectCommentAuthor', () => {
    it('returns the comment author', () => {
      state = { json }
      const props = { commentId: '666' }
      const result = selector.selectCommentAuthor(state, props)
      expect(result).to.deep.equal(state.json.getIn(['users', '2']))
    })
  })

  context('#selectCommentPost', () => {
    it('returns the comment post', () => {
      state = { json }
      const props = { commentId: '666' }
      const result = selector.selectCommentPost(state, props)
      expect(result).to.deep.equal(state.json.getIn(['posts', '999']))
    })
  })

  context('#selectCommentPostAuthorId', () => {
    it('returns the comment post author id', () => {
      state = { json }
      const props = { commentId: '666' }
      const result = selector.selectCommentPostAuthorId(state, props)
      expect(result).to.equal('2')
    })
  })

  context('#selectCommentPostAuthor', () => {
    it('returns the comment post author', () => {
      state = { json }
      const props = { commentId: '666' }
      const result = selector.selectCommentPostAuthor(state, props)
      expect(result).to.deep.equal(state.json.getIn(['users', '2']))
    })
  })

  context('#selectCommentPostDetailPath', () => {
    it('returns the comment post detail path', () => {
      state = { json }
      const props = { commentId: '666' }
      const result = selector.selectCommentPostDetailPath(state, props)
      expect(result).to.equal('/username/post/token-for-comment-post')
    })
  })

  context('#selectCommentIsEditing', () => {
    it('returns the state of isEditing on the comment', () => {
      state = { json }
      const props = { commentId: '666' }
      const result = selector.selectCommentIsEditing(state, props)
      expect(result).to.equal(false)
    })

    it('returns the state of isEditing on the comment', () => {
      state = { json }
      state = { json: state.json.setIn(['comments', '666', 'isEditing'], true) }
      const props = { commentId: '666' }
      const result = selector.selectCommentIsEditing(state, props)
      expect(result).to.equal(true)
    })
  })

  context('#selectCommentIsOwn', () => {
    it('returns if the comment is the users own', () => {
      state = { json, profile: Immutable.Map({ id: '2' }) }
      const props = { commentId: '666' }
      expect(selector.selectCommentIsOwn(state, props)).to.equal(true)
    })

    it('returns if the comment is not the users own', () => {
      state = { json, profile: Immutable.Map({ id: '777' }) }
      const props = { commentId: '666' }
      expect(selector.selectCommentIsOwn(state, props)).to.equal(false)
    })
  })

  context('#selectCommentIsOwnPost', () => {
    it('returns if the comment post is the users own', () => {
      state = { json, profile: Immutable.Map({ id: '2' }) }
      const props = { commentId: '666' }
      expect(selector.selectCommentIsOwnPost(state, props)).to.equal(true)
    })

    it('returns if the comment post is not the users own', () => {
      state = { json, profile: Immutable.Map({ id: '777' }) }
      const props = { commentId: '666' }
      expect(selector.selectCommentIsOwn(state, props)).to.equal(false)
    })
  })

  context('#selectCommentCanBeDeleted', () => {
    it('returns if the comment can be deleted when it is a repost', () => {
      state = { json, profile: Immutable.Map({ id: '2' }) }
      const props = { commentId: '666' }
      expect(selector.selectCommentCanBeDeleted(state, props)).to.equal(false)
    })

    it('returns if the comment can be deleted when it is a repost, their own post and postId matches the original', () => {
      state = { json, profile: Immutable.Map({ id: '2' }) }
      state = { json: state.json.setIn(['comments', '666', 'originalPostId'], '333'), profile: Immutable.Map({ id: '2' }) }
      const props = { commentId: '666' }
      expect(selector.selectCommentCanBeDeleted(state, props)).to.equal(false)
    })

    it('returns if the comment can be deleted when it is their own post', () => {
      state = { json: state.json.deleteIn(['comments', '666', 'repostId']), profile: Immutable.Map({ id: '2' }) }
      const props = { commentId: '666' }
      expect(selector.selectCommentCanBeDeleted(state, props)).to.equal(true)
    })
  })
})

