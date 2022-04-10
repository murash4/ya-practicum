import style from './style.module.css'

interface IModalOverlay {
  close: () => void
}

export default function ModalOverlay (props: IModalOverlay) {
  return (
    <div
      className={style.overlay}
      onClick={props.close}
    />
  )
}
