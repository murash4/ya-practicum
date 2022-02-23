import React from 'react'
import style from './style.module.css'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types'

export default function Modal (props) {
  /**
   * Закрытие модалки при клике на Esc
   * @param {object} e
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

  return (
    <div className={`${style.modal} pr-15 pl-15`}>
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

Modal.propTypes = {
  children: PropTypes.element
}
