import style from './style.module.css'
import {
  DragIcon,
  ConstructorElement
} from '@ya.praktikum/react-developer-burger-ui-components'

export default function ConstructorList (props) {
  /**
   * Возвращает тип карточки (первая/средняя/последняя)
   * @param {number} index
   * @param {number} length
   * @return {string}
   */
  function getTypeByIndex (index, length) {
    if (index === 0) {
      return 'top'
    }

    if (index === length - 1) {
      return 'bottom'
    }

    return ''
  }

  return (
    <div className={`${style.list} mb-10`}>
      {props.data.map((item, index) => (
        <div
          key={item._id}
          className={`${style.item} mb-4`}
        >
          <div className={`${style.drag_ic_wrap}`}>
            {!getTypeByIndex(index, props.data.length) && <DragIcon type="primary" />}
          </div>

          <ConstructorElement
            className={`${style.item}`}
            type={getTypeByIndex(index, props.data.length)}
            isLocked={true}
            text={item.name}
            price={item.price}
            thumbnail={item.image_mobile}
          />
        </div>
      ))}
    </div>
  )
}
