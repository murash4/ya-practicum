import SimpleBar from 'simplebar-react'
import ConstructorListItem from './constructor-list-item'
import style from './style.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { useDrop } from 'react-dnd'
import { addIngredient } from '../../../services/actions/burgerConstructor'

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
              key={Date.now() + index}
              item={item}
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
