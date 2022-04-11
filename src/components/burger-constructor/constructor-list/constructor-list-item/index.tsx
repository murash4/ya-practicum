import { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import {
  ConstructorElement,
  DragIcon
} from '@ya.praktikum/react-developer-burger-ui-components'
import { IIngredient } from '../../../../utils/types'
import { useDispatch } from 'react-redux'
import { removeIngredient } from '../../../../services/actions/burgerConstructor'
import style from './style.module.css'

const dragStyle = {
  cursor: 'move'
}

interface IProps {
  item: IIngredient
  index?: number
  isBun?: boolean
  position?: 'top' | 'bottom'
  moveCard?: (i1: number, i2: number) => void
}

export default function ConstructorListItem (props: IProps) {
  const dispatch = useDispatch()
  const removeItem = () => {
    dispatch(removeIngredient(props.item))
  }
  /**
   * Дополняем текст для верхней/нижней булки
   * @param {string} startText
   * @param {string} position
   * @param {boolean} isBun
   * @returns {string}
   */
  function getText (startText: string, position: string): string {
    const text = position === 'top' ? ' (верх)' : ' (низ)'

    return (startText + text)
  }

  const ref = useRef<HTMLDivElement>(null)
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

      // @ts-ignore
      const dragIndex = item.index
      const hoverIndex = props.index || 0

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
      let hoverClientY = 0

      if (clientOffset) {
        hoverClientY = clientOffset.y - hoverBoundingRect.top
      }
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
      if (props.moveCard) {
        props.moveCard(dragIndex, hoverIndex)
      }
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      // @ts-ignore
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
        ${props.isBun ? 'pointer-none' : ''}
      `}
    >
      <div className={`${style.drag_ic_wrap}`}>
        {!props.isBun && <DragIcon type="primary" />}
      </div>

      {
        props.isBun && props.position && <ConstructorElement
          type={props.position}
          isLocked={props.isBun}
          text={getText(props.item.name, props.position)}
          price={props.item.price}
          thumbnail={props.item.image_mobile}
          handleClose={removeItem}
        />
      }

      {
        !props.isBun && <ConstructorElement
          isLocked={props.isBun}
          text={props.item.name}
          price={props.item.price}
          thumbnail={props.item.image_mobile}
          handleClose={removeItem}
        />
      }

    </div>
  )
}
