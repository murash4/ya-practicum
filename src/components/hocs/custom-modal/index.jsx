import React from 'react'
import ReactDOM from 'react-dom'
import Modal from './modal'
import ModalOverlay from './modal-overlay'
import style from './style.module.css'
import PropTypes from 'prop-types'

export default function CustomModal (props) {
  const modalRoot = document.getElementById('custom-modal')

  /**
   * Закрытие модалки при клике на Esc
   * @param e
   */
  function closeByEsc (e) {
    if (e.keyCode === 27) {
      props.close()
    }
  }

  React.useEffect(() => {
    document.addEventListener('keydown', closeByEsc)

    return () => {
      document.removeEventListener('keydown', closeByEsc)
    }
  }, [])

  return ReactDOM.createPortal(
    <div className={style.custom_modal}>
      <Modal close={props.close}>
        {props.children}
      </Modal>

      <ModalOverlay close={props.close} />
    </div>,
    modalRoot
  )
}

CustomModal.propTypes = {
  children: PropTypes.element,
  close: PropTypes.func.isRequired
}
