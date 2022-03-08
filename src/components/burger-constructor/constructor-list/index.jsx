import { useCallback } from 'react'
import update from 'immutability-helper'
import SimpleBar from 'simplebar-react'
import ConstructorListItem from './constructor-list-item'
import style from './style.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { useDrop } from 'react-dnd'
import { addIngredient } from '../../../services/actions/burgerConstructor'
import { SET_INGREDIENT } from '../../../services/actions/burgerConstructor/constants'

export default function ConstructorList () {
  const { items, bun } = useSelector(state => state.burgerConstructor)
  const dispatch = useDispatch()
  const [{ isHover }, dropTarget] = useDrop({
    accept: 'ingredient',
    drop(item) {
      dispatch(addIngredient(item))
    },
    collect: monitor => ({
      isHover: monitor.isOver()
    })
  })

  const moveCard = useCallback((dragIndex, hoverIndex) => {
    const data = update(items, {
      $splice: [
        [dragIndex, 1],
        [hoverIndex, 0, items[dragIndex]],
      ]
    })
    dispatch({
      type: SET_INGREDIENT,
      data
    })
  }, [dispatch, items])

  return (
    <div
      ref={dropTarget}
      className={`
        ${style.list} mb-10
        ${isHover ? style.draging : ''}
      `}
    >
      {bun &&
        <ConstructorListItem
          item={bun}
          position="top"
        />
      }

      <SimpleBar
        className={
          `${style.simplebar}
          ${!bun ? style.simplebarNotBun : ''}
          mb-4`
        }
      >
        {items.map((item, index) => (
            <ConstructorListItem
              key={item.id}
              item={item}
              index={index}
              moveCard={moveCard}
            />
          ))}
      </SimpleBar>

      {
        bun && <ConstructorListItem
          item={bun}
          position="bottom"
        />
      }
    </div>
  )
}
