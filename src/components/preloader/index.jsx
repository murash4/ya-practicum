import styles from './style.module.css'
import PropTypes from 'prop-types'

export default function Preloader (props) {
  return (
    <div
      className={`
        ${styles.preloader}
        ${props.fullPage ? styles.fullPage : ''}
      `}
    >
      <div className={styles.inner}>
        <div className={styles.element} />
      </div>
    </div>
  )
}

Preloader.propTypes = {
  fullPage: PropTypes.bool
}
