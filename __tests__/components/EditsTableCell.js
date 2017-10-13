jest.unmock('../../src/js/components/EditsTableCell.jsx')

import EditsTableCell from '../../src/js/components/EditsTableCell.jsx'
import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'

describe('Edits Table Cell', () => {
  const editsTableCell = TestUtils.renderIntoDocument(
    <table>
      <tbody>
        <tr>
          <EditsTableCell cell="content" type="syntactical" />
        </tr>
      </tbody>
    </table>
  )
  const tableNode = ReactDOM.findDOMNode(editsTableCell)

  it('renders the table', () => {
    expect(tableNode).toBeDefined()
  })

  it('renders emphasized blank when missing data', () => {
    const missingCell = EditsTableCell({ cell: '' })
    expect(missingCell.props.children.type).toBe('em')
  })
})
