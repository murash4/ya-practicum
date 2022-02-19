import style from './style.module.css'
import {
  ConstructorElement,
  DragIcon
} from '@ya.praktikum/react-developer-burger-ui-components'

export default function ConstructorListItem (props) {
  return (
    <div className={`${style.item} pl-4 pr-4 mb-4`}>
      <div className={`${style.drag_ic_wrap}`}>
        {!props.postision && <DragIcon type="primary" />}
      </div>

      <ConstructorElement
        className={`${style.item}`}
        type={props.postision}
        isLocked={props.postision}
        text={props.item.name}
        price={props.item.price}
        thumbnail={props.item.image_mobile}
      />
    </div>
  )
}
