jest.unmock('../../src/js/containers/Pagination.jsx')

import React from 'react'
import TestUtils from 'react-addons-test-utils'
import Wrapper from '../Wrapper.js'
import Connected, { PaginationContainer, mapStateToProps, mapDispatchToProps, makePathname } from '../../src/js/containers/Pagination.jsx'

const defaultPagination = {
  parseErrors: null
}

const pageObj = {
  total: 45,
  count: 10,
  _links: {
    self: '?page=1',
    prev: '?page=1',
    last: '?page=5',
    next: '?page=2',
    first: '?page=1',
    href: '/thehref{rel}'
  }
}

describe('Pagination Container', () => {
  it('makes a pathname from pagination object', () => {
    expect(makePathname(pageObj, '?argle')).toEqual('/thehref?argle')
  })

  it('returns undefined without a pagination object', () => {
   expect(makePathname()).toBeUndefined()
  })

  it('renders the unwrapped component', () => {
    const rendered = TestUtils.renderIntoDocument(
      <PaginationContainer
        pagination={null}
        getPage={jest.fn()}
        getPreviousPage={jest.fn()}
        getNextPage={jest.fn()}
      />
    )

    expect(rendered).toBeDefined()
  })

  it('maps state to props with proper defaults', () => {
    expect(mapStateToProps({app:{pagination:defaultPagination}}, {target: 'parseErrors'})).toEqual({pagination: null})
  })

  it('maps state properly when given a pagination object is present', () => {
    expect(mapStateToProps({app:{pagination:{parseErrors:pageObj}}}, {target: 'parseErrors'})).toEqual({pagination:pageObj})
  })

  it('maps state to undefined when given an invalid target', () => {
    expect(mapStateToProps({app:{pagination:{parseErrors:pageObj}}}, {target: 'fake'})).toEqual({pagination:undefined})
  })

  it('maps dispatch appropriately', () => {
    const dispatch = jest.fn()
    const mapped = mapDispatchToProps(dispatch, {})

    expect(Object.keys(mapped)).toEqual(['getPage', 'getNextPage', 'getPreviousPage'])
    expect(dispatch).not.toBeCalled()
  })

  it('makes proper paging fns', () => {
    const dispatch = jest.fn()
    const mapped = mapDispatchToProps(dispatch, {})

    mapped.getPage()
    mapped.getPage(pageObj)
    mapped.getPreviousPage()
    mapped.getNextPage()

    expect(dispatch).not.toBeCalled()

    mapped.getPage(pageObj, 4)
    mapped.getPreviousPage(pageObj)
    mapped.getNextPage(pageObj)

    expect(dispatch).toHaveBeenCalledTimes(3)
  })

  it('renders the connected component', () => {
    const err = console.error
    console.error = jest.fn()
    const pagination = TestUtils.renderIntoDocument(
      <Wrapper store={{app:{pagination:defaultPagination}}}><Connected/></Wrapper>
    )

    expect(pagination).toBeDefined()
    expect(console.error).not.toBeCalled()
    console.error = err
  })

})