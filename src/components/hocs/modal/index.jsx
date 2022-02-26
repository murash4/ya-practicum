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
        <>
          {
            props.title &&
            <h2 className={`${style.modal_title} text text_type_main-large mt-10`}>
              {props.title}
            </h2>
          }
          {props.children}
        </>
      </ModalContent>

      <ModalOverlay close={props.close} />
    </div>,
    modalRoot
  )
}

CustomModal.propTypes = {
  title: PropTypes.string,
  children: PropTypes.element.isRequired,
  close: PropTypes.func.isRequired
}
