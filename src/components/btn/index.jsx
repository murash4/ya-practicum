import styles from './style.module.css'

export default function Btn (props) {
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
