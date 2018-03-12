jest.unmock('./selectFile.js')
jest.unmock('../constants')
import * as types from '../constants'
import selectFile from './selectFile.js'

import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

const mockStore = configureMockStore([thunk])
const store = mockStore({ app: { institutionId: '123' } })

window.localStorage = {
  setItem: jest.fn()
}

describe('selectFile', () => {
  it('creates a thunk to signal file selection', () => {
    expect(typeof selectFile()).toEqual('function')
  })

  it('suppresses edits if the file is too large', () => {
    const dispatch = jest.fn()
    const getState = jest.fn(() => {
      return {
        app: {
          institutionId: '123'
        }
      }
    })
    selectFile({ size: 5e7 })(dispatch, getState)
    expect(dispatch.mock.calls.length).toBe(2)
  })

  it('creates an action to signal file selection when dispatched', () => {
    const file = { size: 42, name: 'test.txt' }
    store.dispatch(selectFile(file))
    expect(store.getActions()).toEqual([
      { type: types.SELECT_FILE, file, id: '123' }
    ])
  })
})
