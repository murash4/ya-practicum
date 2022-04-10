import React, { FC } from 'react'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import style from './style.module.css'

interface IModalContent {
  close: () => void
}

const ModalContent: FC<IModalContent> = (props) => {
  return (
    <div className={`${style.modal_content} pr-15 pl-15`}>
      <CloseIcon
        onClick={props.close}
        type="primary"
      />

      <div>
        {props.children}
      </div>
    </div>
  )
}

export default ModalContent
