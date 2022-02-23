import Modal from './modal'
import ModalOverlay from './modal-overlay'
import style from './style.module.css'
import PropTypes from 'prop-types'

export default function CustomModal (props) {
  return (
    <div className={style.custom_modal}>
      <Modal content={props.content} />
      <ModalOverlay />
    </div>
  )
}

CustomModal.propTypes = {
  content: PropTypes.element
}
