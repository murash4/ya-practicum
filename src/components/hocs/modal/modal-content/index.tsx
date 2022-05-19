import React, { FC } from 'react'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import style from './style.module.css'

interface IModalContent {
  close: () => void
}

const ModalContent: FC<IModalContent> = (props) => {
  return (
    <div className={`${style.modal_content} pr-15 pl-15`}>
      <div
        className={`${style.close}`}
        data-test="modal-overlay"
      >
        <CloseIcon
          type="primary"
          onClick={props.close}
        />
      </div>

      <div>
        {props.children}
      </div>
    </div>
  )
}

export default ModalContent
