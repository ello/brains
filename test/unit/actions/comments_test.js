import { isFSA, isFSAName } from '../../support/test_helpers'
import { stub } from '../../support/stubs'
import { resetEditor } from '../../../src/actions/editor'
import * as subject from '../../../src/actions/comments'

describe('comments actions', () => {
  context('#createComment', () => {
    const body = [{ kind: 'text', data: 'what?' }, { kind: 'image', data: 'image.jpg' }]
    const action = subject.createComment(true, body, 'commentEditor_1', 'postId_1')

    it('is an FSA compliant action', () => {
      expect(isFSA(action)).to.be.true
    })

    it('has similar action.name and action.type', () => {
      expect(isFSAName(action, subject.createComment)).to.be.true
    })

    it('has the correct method in the action', () => {
      expect(action.payload.method).to.equal('POST')
    })

    it('has the correct api endpoint in the action', () => {
      expect(action.payload.endpoint.path).to.contain('/posts/postId_1/comments')
    })

    it('has the correct body in the action', () => {
      expect(action.payload.body).to.deep.equal({ body })
    })

    it('has the correct editorId in the action', () => {
      expect(action.payload.editorId).to.equal('commentEditor_1')
    })

    it('has the correct postId in the action', () => {
      expect(action.payload.postId).to.equal('postId_1')
    })

    it('has the correct mapping type in the action', () => {
      expect(action.meta.mappingType).to.equal('comments')
    })

    it('has the results of resetEditor for the successAction', () => {
      expect(action.meta.successAction).to.deep.equal(resetEditor('commentEditor_1'))
    })
  })

  context('#deleteComment', () => {
    const comment = stub('comment')
    const action = subject.deleteComment(comment)

    it('is an FSA compliant action', () => {
      expect(isFSA(action)).to.be.true
    })

    it('has similar action.name and action.type', () => {
      expect(isFSAName(action, subject.deleteComment)).to.be.true
    })

    it('has the correct method in the action', () => {
      expect(action.payload.method).to.equal('DELETE')
    })

    it('has the correct api endpoint in the action', () => {
      expect(action.payload.endpoint.path).to.contain('/posts/1/comments/1')
    })

    it('has the correct body in the action', () => {
      expect(action.payload.model).to.deep.equal(comment)
    })
  })

  context('#flagComment', () => {
    const comment = stub('comment')
    const action = subject.flagComment(comment, 'spam')

    it('is an FSA compliant action', () => {
      expect(isFSA(action)).to.be.true
    })

    it('has similar action.name and action.type', () => {
      expect(isFSAName(action, subject.flagComment)).to.be.true
    })

    it('has the correct method in the action', () => {
      expect(action.payload.method).to.equal('POST')
    })

    it('has the correct api endpoint in the action', () => {
      expect(action.payload.endpoint.path).to.contain('/posts/1/comments/1/flag')
    })
  })

  context('#loadEditableComment', () => {
    const comment = stub('comment')
    const action = subject.loadEditableComment(comment)

    it('is an FSA compliant action', () => {
      expect(isFSA(action)).to.be.true
    })

    it('has similar action.name and action.type')
    // it('has similar action.name and action.type', () => {
    //   expect(isFSAName(action, subject.loadEditableComment)).to.be.true
    // })

    it('has the correct api endpoint in the action', () => {
      expect(action.payload.endpoint.path).to.contain('/posts/1/comments/1')
    })

    it('has the correct mapping type in the action', () => {
      expect(action.meta.mappingType).to.equal('comments')
    })

    it('has updateResult set to false in the action', () => {
      expect(action.meta.updateResult).to.be.false
    })
  })

  context('#toggleEditing', () => {
    const comment = stub('comment')
    const action = subject.toggleEditing(comment, false)

    it('is an FSA compliant action', () => {
      expect(isFSA(action)).to.be.true
    })

    it('has similar action.name and action.type', () => {
      expect(isFSAName(action, subject.toggleEditing)).to.be.true
    })

    it('has the correct body in the action', () => {
      expect(action.payload.model).to.deep.equal(comment)
    })

    it('has set the isEditing property', () => {
      expect(action.payload.isEditing).to.be.false
    })
  })

  context('#updateComment', () => {
    const comment = stub('comment')
    const body = [{ kind: 'text', data: 'what?' }, { kind: 'image', data: 'image.jpg' }]
    const action = subject.updateComment(comment, body, 'commentEditor_1')

    it('is an FSA compliant action', () => {
      expect(isFSA(action)).to.be.true
    })

    it('has similar action.name and action.type', () => {
      expect(isFSAName(action, subject.updateComment)).to.be.true
    })

    it('has the correct body in the action', () => {
      expect(action.payload.body.body).to.deep.equal(body)
    })

    it('has the correct api endpoint in the action', () => {
      expect(action.payload.endpoint.path).to.contain('/posts/1/comments/1')
    })

    it('has the correct method in the action', () => {
      expect(action.payload.method).to.equal('PATCH')
    })

    it('has the correct editorId in the action', () => {
      expect(action.payload.editorId).to.equal('commentEditor_1')
    })

    it('has the correct mapping type in the action', () => {
      expect(action.meta.mappingType).to.equal('comments')
    })
  })
})

