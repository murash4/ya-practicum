import style from './style.module.css'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types'


export default function Modal (props) {
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
