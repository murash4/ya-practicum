import PropTypes from 'prop-types'
import style from './style.module.css'

export default function ModalOverlay (props) {
  return <div
    className={style.overlay}
    onClick={props.close}
  />
}

ModalOverlay.propTypes = {
  close: PropTypes.func.isRequired
}
