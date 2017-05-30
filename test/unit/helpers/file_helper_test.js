import { isGif } from '../../../src/helpers/file_helper'

describe('file helper', () => {
  context('#isGif', () => {
    it('is a gif', () => {
      expect(isGif('image.gif')).to.be.true
    })

    it('is not a gif', () => {
      expect(isGif('image.png')).to.be.false
    })
  })
})

