jest.unmock('../../src/js/actions/receiveSignature.js')
jest.unmock('../../src/js/constants')
import * as types from '../../src/js/constants'
import receiveSignature from '../../src/js/actions/receiveSignature.js'
import fs from 'fs'

const signatureObj = JSON.parse(
  fs.readFileSync('./__tests__/json/receipt.json')
)

describe('receiveSignature', () => {
  it('creates an action to signal the signature data has been acquired', () => {
    const data = signatureObj
    expect(receiveSignature(data)).toEqual({
      type: types.RECEIVE_SIGNATURE,
      timestamp: data.timestamp,
      receipt: data.receipt
    })
  })
})
