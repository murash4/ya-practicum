import React from 'react'
import style from './style.module.css'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types'

export default function ModalContent (props) {
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

ModalContent.propTypes = {
  close: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired
}
