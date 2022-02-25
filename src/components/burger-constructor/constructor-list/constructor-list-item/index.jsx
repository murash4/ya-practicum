import style from './style.module.css'
import {
  ConstructorElement,
  DragIcon
} from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types'
import { ingredientType } from '../../../../utils/types'

export default function ConstructorListItem (props) {
  /**
   * Дополняем текст для верхней/нижней булки
   * @param {string} startText
   * @param {string} position
   * @returns {string}
   */
  function getText (startText, position) {
    let text = ''

    if (position === 'top') {
      text = ' (верх)'
    } else if (position === 'bottom') {
      text = ' (низ)'
    }

    return (startText + text)
  }

  /**
   * Возвращает флаг, что ингредиент не находится в скролящемся блоке (булка)
   * @return {boolean}
   */
  function isBun () {
    return !props.position
  }


  return (
    <div className={`${style.item} pl-4 pr-4 mb-4`}>
      <div className={`${style.drag_ic_wrap}`}>
        {isBun() && <DragIcon type="primary" />}
      </div>

      <ConstructorElement
        className={`${style.item}`}
        type={props.position}
        isLocked={!isBun()}
        text={getText(props.item.name, props.position)}
        price={props.item.price}
        thumbnail={props.item.image_mobile}
      />
    </div>
  )
}

ConstructorListItem.propTypes = {
  item: ingredientType.isRequired,
  position: PropTypes.oneOf(['top', 'bottom', undefined])
}
