import { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import {
  ConstructorElement,
  DragIcon
} from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types'
import { ingredientType } from '../../../../utils/types'
import { useDispatch } from 'react-redux'
import { removeIngredient } from '../../../../services/actions/burgerConstructor'
import style from './style.module.css'

const dragStyle = {
  cursor: 'move'
}

export default function ConstructorListItem (props) {
  const dispatch = useDispatch()
  const removeItem = () => {
    dispatch(removeIngredient(props.item))
  }
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
    return props.position
  }

  const ref = useRef(null)
  const [{ isDragging }, drag] = useDrag({
    type: 'cart',
    item: () => {
      return {
        id: props.item.id,
        index: props.index
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    })
  })
  const opacity = isDragging ? 0 : 1
  const [{ handlerId }, drop] = useDrop({
    accept: 'cart',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId()
      }
    },
    hover(item, monitor) {
      if (!ref.current) {
        return
      }

      const dragIndex = item.index
      const hoverIndex = props.index

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      // Get vertical middle
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      // Determine mouse position
      const clientOffset = monitor.getClientOffset()
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }

      // Time to actually perform the action
      props.moveCard(dragIndex, hoverIndex)
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex
    }
  })

  drag(drop(ref))

  return (
    <div
      ref={ref}
      style={{ ...dragStyle, opacity }}
      data-handler-id={handlerId}
      className={`
        ${style.item}
        pl-4 pr-4 mb-4
        ${isBun() ? 'pointer-none' : ''}
      `}
    >
      <div className={`${style.drag_ic_wrap}`}>
        {!isBun() && <DragIcon type="primary" />}
      </div>

      <ConstructorElement
        className={`${style.item}`}
        type={props.position}
        isLocked={isBun()}
        text={getText(props.item.name, props.position)}
        price={props.item.price}
        thumbnail={props.item.image_mobile}
        handleClose={removeItem}
      />
    </div>
  )
}

ConstructorListItem.propTypes = {
  item: ingredientType.isRequired,
  position: PropTypes.oneOf(['top', 'bottom', undefined])
}
