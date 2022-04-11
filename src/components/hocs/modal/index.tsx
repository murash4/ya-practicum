import React, { FC } from 'react'
import ReactDOM from 'react-dom'
import ModalContent from './modal-content'
import ModalOverlay from './modal-overlay'
import style from './style.module.css'

interface IModal {
  close: () => void
  title?: string
}

const Modal: FC<IModal> = (props) => {
  const modalRoot: HTMLElement | null = document.getElementById('modal')
  const { close } = props

  React.useEffect(() => {
    /**
     * Закрытие модалки при клике на Esc
     * @param {object} e
     */
    function closeByEsc (e: KeyboardEvent) {
      if (e.key === 'Escape') {
        close()
      }
    }

    document.addEventListener('keydown', closeByEsc)

    return () => {
      document.removeEventListener('keydown', closeByEsc)
    }
  }, [close])

  if (!modalRoot) {
    return <div />
  }

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

export default Modal
