import ReactDOM from 'react-dom'
import Modal from './modal'
import ModalOverlay from './modal-overlay'
import style from './style.module.css'
import PropTypes from 'prop-types'

export default function CustomModal (props) {
  const modalRoot = document.getElementById('custom-modal')

  return ReactDOM.createPortal(
    <div className={style.custom_modal}>
      <Modal
        content={props.content}
        close={props.close}
      />

      <ModalOverlay close={props.close} />
    </div>,
    modalRoot
  )
}

CustomModal.propTypes = {
  content: PropTypes.element,
  close: PropTypes.func.isRequired
}
