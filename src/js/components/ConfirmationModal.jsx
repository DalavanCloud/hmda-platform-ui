import React from 'react'
import RefileText from './RefileText.jsx'

const ModalConfirm = (props) => {
  const {
    code,
    filing,
    id,
    showing,
    file,
    newFile,
    hideConfirmModal,
    triggerRefile
  } = props

  // get the page
  const page = location.pathname.split('/').slice(-1)[0]

  if(!filing || !id || !hideConfirmModal || !triggerRefile) return null

  return (
    <div className={'confirmation-blurred-blocker'+ (showing ? ' showing-blurred-blocker' : '')}>
      <div className="confirmation-modal">
        <h4>Refile</h4>
        <div className="confirmation-contents">
          <RefileText code={code}/>
          <button onClick={(e)=>{
            e.preventDefault()
            hideConfirmModal()
            triggerRefile(id, filing, page, newFile)
          }}>Yes, I would like to resubmit.</button>
          <button className="usa-button usa-button-secondary"
            onClick={(e)=>{
              e.preventDefault()
              hideConfirmModal()
            }}>No, take me back.</button>
          </div>
      </div>
    </div>
  )
}

ModalConfirm.propTypes = {
  filing: React.PropTypes.string.isRequired,
  id: React.PropTypes.string.isRequired,
  hideConfirmModal: React.PropTypes.func.isRequired,
  triggerRefile: React.PropTypes.func.isRequired,
  showing: React.PropTypes.bool,
  code: React.PropTypes.number,
  file: React.PropTypes.object,
  newFile: React.PropTypes.object
}

ModalConfirm.defaultProps = {
  showing: false,
  code: 0
}

export default ModalConfirm