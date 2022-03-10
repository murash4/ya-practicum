import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import ModalContent from './modal-content'
import ModalOverlay from './modal-overlay'
import style from './style.module.css'

export default function Modal (props) {
  const modalRoot = document.getElementById('modal')
  const { close } = props

  React.useEffect(() => {
    /**
     * Закрытие модалки при клике на Esc
     * @param {object} e
     */
    function closeByEsc (e) {
      if (e.key === 'Escape') {
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

Modal.propTypes = {
  title: PropTypes.string,
  children: PropTypes.element.isRequired,
  close: PropTypes.func.isRequired
}
