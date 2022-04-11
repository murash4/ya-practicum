import styles from './style.module.css'

interface IPreloader {
  fullPage?: boolean
}

export default function Preloader (props: IPreloader) {
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
