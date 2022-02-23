import style from './style.module.css'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types'


export default function Modal (props) {
  return (
    <div className={`${style.modal} pr-15 pl-15`}>
      <CloseIcon type="primary" />

      <div>
        {props.content}
      </div>
    </div>
  )
}

Modal.propTypes = {
  content: PropTypes.element
}
