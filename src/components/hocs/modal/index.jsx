import ReactDOM from 'react-dom'
import ModalContent from './modal-content'
import ModalOverlay from './modal-overlay'
import style from './style.module.css'
import PropTypes from 'prop-types'
import React from "react";

export default function CustomModal (props) {
  const modalRoot = document.getElementById('modal')
  const { close } = props

  React.useEffect(() => {
    /**
     * Закрытие модалки при клике на Esc
     * @param {object} e
     */
    function closeByEsc (e) {
      if (e.keyCode === 27) {
        close()
      }
    }

    document.addEventListener('keydown', closeByEsc)

    return () => {
      document.removeEventListener('keydown', closeByEsc)
    }
  }, [close])

  return ReactDOM.createPortal(
    <div className={style.modal}>
      <ModalContent close={props.close}>
        {props.children}
      </ModalContent>

      <ModalOverlay close={props.close} />
    </div>,
    modalRoot
  )
}

CustomModal.propTypes = {
  children: PropTypes.element.isRequired,
  close: PropTypes.func.isRequired
}
