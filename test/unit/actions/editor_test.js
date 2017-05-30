import { isFSA, isFSAName } from '../../support/test_helpers'
import * as subject from '../../../src/actions/editor'

describe('editor actions', () => {
  context('#addBlock', () => {
    const block = { kind: 'text', data: 'what?' }
    const action = subject.addBlock(block, 'editorId')

    it('is an FSA compliant action', () => {
      expect(isFSA(action)).to.be.true
    })

    it('has similar action.name and action.type', () => {
      expect(isFSAName(action, subject.addBlock)).to.be.true
    })

    it('sets the appropriate payload', () => {
      expect(action.payload.block).to.deep.equal(block)
      expect(action.payload.editorId).to.equal('editorId')
      expect(action.payload.shouldCheckForEmpty).to.be.true
    })
  })

  context('#addDragBlock', () => {
    const block = { kind: 'text', data: 'what?' }
    const action = subject.addDragBlock(block, 'editorId')

    it('is an FSA compliant action', () => {
      expect(isFSA(action)).to.be.true
    })

    it('has similar action.name and action.type', () => {
      expect(isFSAName(action, subject.addDragBlock)).to.be.true
    })

    it('sets the appropriate payload', () => {
      expect(action.payload.block).to.deep.equal(block)
      expect(action.payload.editorId).to.equal('editorId')
    })
  })

  context('#addEmptyTextBlock', () => {
    const action = subject.addEmptyTextBlock('editorId')

    it('is an FSA compliant action', () => {
      expect(isFSA(action)).to.be.true
    })

    it('has similar action.name and action.type', () => {
      expect(isFSAName(action, subject.addEmptyTextBlock)).to.be.true
    })

    it('sets the appropriate payload', () => {
      expect(action.payload.editorId).to.equal('editorId')
    })
  })

  context('#autoCompleteUsers', () => {
    const action = subject.autoCompleteUsers('user', 'mansf')

    it('is an FSA compliant action', () => {
      expect(isFSA(action)).to.be.true
    })

    it('has similar action.name and action.type')
    // it('has similar action.name and action.type', () => {
    //   expect(isFSAName(action, subject.autoCompleteUsers)).to.be.true
    // })

    it('sets the appropriate payload', () => {
      expect(action.payload.endpoint.path).to.contain('/users/autocomplete?terms=mansf&')
      expect(action.payload.type).to.equal('user')
    })
  })

  context('#initializeEditor', () => {
    const action = subject.initializeEditor('editorId', false)

    it('is an FSA compliant action', () => {
      expect(isFSA(action)).to.be.true
    })

    it('has similar action.name and action.type', () => {
      expect(isFSAName(action, subject.initializeEditor)).to.be.true
    })

    it('sets the appropriate payload', () => {
      expect(action.payload.editorId).to.equal('editorId')
      expect(action.payload.shouldPersist).to.be.false
    })
  })

  context('#loadEmojis', () => {
    const action = subject.loadEmojis('emoji', 'meta')

    it('is an FSA compliant action', () => {
      expect(isFSA(action)).to.be.true
    })

    it('has similar action.name and action.type')
    // it('has similar action.name and action.type', () => {
    //   expect(isFSAName(action, subject.loadEmojis)).to.be.true
    // })

    it('sets the appropriate payload', () => {
      expect(action.payload.endpoint.path).to.contain('/emojis.json')
      expect(action.payload.type).to.equal('emoji')
    })
  })

  context('#loadReplyAll', () => {
    const action = subject.loadReplyAll('postId_666', 'editorId')

    it('is an FSA compliant action', () => {
      expect(isFSA(action)).to.be.true
    })

    it('has similar action.name and action.type', () => {
      expect(isFSAName(action, subject.loadReplyAll)).to.be.true
    })

    it('sets the appropriate payload', () => {
      expect(action.payload.endpoint.path).to.contain('/posts/postId_666/commenters_usernames')
      expect(action.payload.editorId).to.equal('editorId')
    })
  })

  context('#postPreviews', () => {
    const action = subject.postPreviews('https://vimeo.com/40234826', 'editorId', 'uid')

    it('is an FSA compliant action', () => {
      expect(isFSA(action)).to.be.true
    })

    it('has similar action.name and action.type')
    // it('has similar action.name and action.type', () => {
    //   expect(isFSAName(action, subject.postPreviews)).to.be.true
    // })

    it('sets the appropriate payload.body', () => {
      expect(action.payload.body).to.deep.equal({
        body: [{ kind: 'embed', data: { url: 'https://vimeo.com/40234826' } }],
      })
    })

    it('sets the appropriate payload', () => {
      expect(action.payload.editorId).to.equal('editorId')
      expect(action.payload.endpoint.path).to.contain('/post_previews')
      expect(action.payload.uid).to.equal('uid')
      expect(action.payload.method).to.equal('POST')
    })
  })

  context('#removeBlock', () => {
    const action = subject.removeBlock('uid', 'editorId')

    it('is an FSA compliant action', () => {
      expect(isFSA(action)).to.be.true
    })

    it('has similar action.name and action.type', () => {
      expect(isFSAName(action, subject.removeBlock)).to.be.true
    })

    it('sets the appropriate payload', () => {
      expect(action.payload.uid).to.equal('uid')
      expect(action.payload.editorId).to.equal('editorId')
    })
  })

  context('#removeDragBlock', () => {
    const action = subject.removeDragBlock('editorId')

    it('is an FSA compliant action', () => {
      expect(isFSA(action)).to.be.true
    })

    it('has similar action.name and action.type', () => {
      expect(isFSAName(action, subject.removeDragBlock)).to.be.true
    })

    it('sets the appropriate payload', () => {
      expect(action.payload.editorId).to.equal('editorId')
    })
  })

  context('#reorderBlocks', () => {
    const action = subject.reorderBlocks('uid', -1, 'editorId')

    it('is an FSA compliant action', () => {
      expect(isFSA(action)).to.be.true
    })

    it('has similar action.name and action.type', () => {
      expect(isFSAName(action, subject.reorderBlocks)).to.be.true
    })

    it('sets the appropriate payload', () => {
      expect(action.payload.delta).to.equal(-1)
      expect(action.payload.uid).to.equal('uid')
      expect(action.payload.editorId).to.equal('editorId')
    })
  })

  context('#replaceText', () => {
    const action = subject.replaceText('uid', 'editorId')

    it('is an FSA compliant action', () => {
      expect(isFSA(action)).to.be.true
    })

    it('has similar action.name and action.type', () => {
      expect(isFSAName(action, subject.replaceText)).to.be.true
    })

    it('sets the appropriate payload', () => {
      expect(action.payload.uid).to.equal('uid')
      expect(action.payload.editorId).to.equal('editorId')
    })
  })

  context('#resetEditor', () => {
    const action = subject.resetEditor('editorId')

    it('is an FSA compliant action', () => {
      expect(isFSA(action)).to.be.true
    })

    it('has similar action.name and action.type', () => {
      expect(isFSAName(action, subject.resetEditor)).to.be.true
    })

    it('sets the appropriate payload', () => {
      expect(action.payload.editorId).to.equal('editorId')
    })
  })

  context('#saveAsset', () => {
    const file = {
      lastModifiedDate: 'Tue Apr 28 2015 17:43:36 GMT-0600 (MDT)',
      name: 'boom.gif',
      size: 5924227,
      type: 'image/gif',
    }
    const action = subject.saveAsset(file, 'editorId')

    it('is an FSA compliant action', () => {
      expect(isFSA(action)).to.be.true
    })

    it('has similar action.name and action.type', () => {
      expect(isFSAName(action, subject.saveAsset)).to.be.true
    })

    it('sets the appropriate payload', () => {
      expect(action.payload.editorId).to.equal('editorId')
      expect(action.payload.file).to.deep.equal(file)
    })
  })

  context('#setIsCompleterActive', () => {
    const action = subject.setIsCompleterActive({ isActive: true })

    it('is an FSA compliant action', () => {
      expect(isFSA(action)).to.be.true
    })

    it('has similar action.name and action.type', () => {
      expect(isFSAName(action, subject.setIsCompleterActive)).to.be.true
    })

    it('has a payload with the correct keys', () => {
      expect(action.payload).to.have.keys('isCompleterActive')
    })

    it('sets the appropriate payload', () => {
      expect(action.payload.isCompleterActive).to.be.true
    })
  })

  context('#setIsTextToolsActive', () => {
    const action = subject.setIsTextToolsActive({
      isActive: true,
      textToolsStates: { isLinkActive: false, isBoldActive: true, isItalicActive: false },
    })

    it('is an FSA compliant action', () => {
      expect(isFSA(action)).to.be.true
    })

    it('has similar action.name and action.type', () => {
      expect(isFSAName(action, subject.setIsTextToolsActive)).to.be.true
    })

    it('has a payload with the correct keys', () => {
      expect(action.payload).to.have.keys('isTextToolsActive', 'textToolsStates')
    })

    it('sets the appropriate payload for isTextToolsActive', () => {
      expect(action.payload.isTextToolsActive).to.be.true
    })

    it('sets the appropriate payload for textToolsStates', () => {
      expect(action.payload.textToolsStates.isLinkActive).to.be.false
      expect(action.payload.textToolsStates.isBoldActive).to.be.true
      expect(action.payload.textToolsStates.isItalicActive).to.be.false
    })
  })

  context('#setTextToolsCoordinates', () => {
    const action = subject.setTextToolsCoordinates({
      textToolsCoordinates: { top: -867, left: -666 },
    })

    it('is an FSA compliant action', () => {
      expect(isFSA(action)).to.be.true
    })

    it('has similar action.name and action.type', () => {
      expect(isFSAName(action, subject.setTextToolsCoordinates)).to.be.true
    })

    it('sets the appropriate payload for textToolsStates', () => {
      expect(action.payload.textToolsCoordinates.top).to.equal(-867)
      expect(action.payload.textToolsCoordinates.left).to.equal(-666)
    })
  })

  context('#temporaryEditorAssetCreated', () => {
    const objectURL = 'blob:http://ello.co/dae89036-db57-40a7-a622-75cd1991b9d7'
    const action = subject.temporaryEditorAssetCreated(objectURL, 'editorId')

    it('is an FSA compliant action', () => {
      expect(isFSA(action)).to.be.true
    })

    it('has similar action.name and action.type')
    // it('has similar action.name and action.type', () => {
    //   expect(isFSAName(action, subject.temporaryEditorAssetCreated)).to.be.true
    // })

    it('sets the appropriate payload', () => {
      expect(action.payload.editorId).to.equal('editorId')
      expect(action.payload.url).to.equal(objectURL)
    })
  })

  context('#updateBlock', () => {
    const block = { kind: 'text', data: 'what?' }
    const action = subject.updateBlock(block, 'uid', 'editorId')

    it('is an FSA compliant action', () => {
      expect(isFSA(action)).to.be.true
    })

    it('has similar action.name and action.type', () => {
      expect(isFSAName(action, subject.updateBlock)).to.be.true
    })

    it('sets the appropriate payload', () => {
      expect(action.payload.block).to.deep.equal(block)
      expect(action.payload.editorId).to.equal('editorId')
      expect(action.payload.uid).to.equal('uid')
    })
  })
})

