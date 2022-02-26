import style from './style.module.css'
import PropTypes from 'prop-types'

export default function ModalOverlay (props) {
  return <div
    className={style.overlay}
    onClick={props.close}
  />
}

ModalOverlay.propTypes = {
  close: PropTypes.func.isRequired
}
