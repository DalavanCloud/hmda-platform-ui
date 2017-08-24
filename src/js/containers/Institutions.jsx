import React, { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import fetchInstitutions from '../actions/fetchInstitutions.js'
import fetchSubmission from '../actions/fetchSubmission.js'
import createNewSubmission from '../actions/createNewSubmission.js'
import fetchCSV from '../actions/fetchCSV.js'
import Institutions from '../components/Institutions.jsx'

export class InstitutionContainer extends Component {
  constructor(props) {
      super(props)
  }

  componentDidMount() {
    if(!this.props.institutions || !this.props.filings.fetched) this.props.dispatch(fetchInstitutions())
  }

  render() {
    return <Institutions {...this.props} />
  }
}

export function mapStateToProps(state) {
  const { institutions } = state.app.institutions

  const {
    filings,
    submission,
    error,
    filingPeriod
  } = state.app

  return {
    submission,
    filingPeriod,
    institutions,
    filings,
    error
  }
}

function mapDispatchToProps(dispatch) {
  return {
    makeNewSubmission: (id, filing) => {
      return dispatch(createNewSubmission(id, filing)).then(()=>{
        browserHistory.push(`/${id}/${filing}`)
      })
    },
    // triggered by a click on "Download edit report"
    onDownloadClick: (institutionId, filing, submissionId) => {
      dispatch(fetchCSV(institutionId, filing, submissionId))
    },
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InstitutionContainer)
