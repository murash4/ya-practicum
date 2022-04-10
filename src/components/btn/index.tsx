import styles from './style.module.css'
import { ReactElement } from 'react'

interface IBtn {
  icon: HTMLOrSVGImageElement | ReactElement
  color: string
  text: string
}

export default function Btn (props: IBtn) {
  return (
    <button className={`${styles.btn} pt-4 pr-5 pb-4 pl-5 mr-2`}>
      <span className={`${styles.icon_wrap} mr-2`}>
        {props.icon}
      </span>
      <span className={`text text_type_main-default ${props.color}-color`}>
        {props.text}
      </span>
    </button>
  )
}
