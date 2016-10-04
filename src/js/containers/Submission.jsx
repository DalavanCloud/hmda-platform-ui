import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchSubmission } from '../actions'
import UploadForm from './UploadForm.jsx'
import ValidationProgress from './ValidationProgress.jsx'
import Edits from './Edits.jsx'
import IRSReport from './IRSReport.jsx'
import Signature from './Signature.jsx'
import Summary from './Summary.jsx'
import RefileWarning from './RefileWarning.jsx'
/*
import EditsContainer from './EditsContainer.jsx'
*/

class SubmissionContainer extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.dispatch(fetchSubmission())
  }

  render() {
    let uploadForm = <UploadForm />
    let progress = null
    let refileWarning = null
    let editsContainer = null
    let summary = null
    let irs = null
    let sign = null

    const status = this.props.status
    const code = status.code
    console.log('current status code, from submission container', code)

    // status codes can be found at https://github.com/cfpb/hmda-platform/blob/master/Documents/submission-status.md
    if (code === -1) {
      return (
      <div className="SubmissionContainer">
        <p>{status.message}</p>
      </div>
      )
    }

    if (code > 2) progress = <ValidationProgress/>

    if (code > 7) {
      editsContainer = <Edits/>
      refileWarning = <RefileWarning />
      irs =  <IRSReport />
      sign = <Signature />
      summary = <Summary />
    }

    return (
    <div className="SubmissionContainer container">
      {uploadForm}
      <div className="third">
        {progress}
      </div>
      <div className="two-third">
        {refileWarning}
        {editsContainer}
        {irs}
        {summary}
        {sign}
      </div>
    </div>
    )
  }
}

function mapStateToProps(state) {
  const {
    isFetching,
    status,
    id
  } = state.app.submission || {
    isFetching: true,
    id: 1,
    status: {
      code: 1,
      message: ''
    }
  }

  return {
    isFetching,
    status,
    id
  }
}

SubmissionContainer.propTypes = {
  params: PropTypes.object,
  dispatch: PropTypes.func.isRequired
}

export default connect(mapStateToProps)(SubmissionContainer)
