import SimpleBar from 'simplebar-react'
import ConstructorListItem from './constructor-list-item'
import style from './style.module.css'
import { useSelector } from 'react-redux'

export default function ConstructorList () {
  const { items, bun } = useSelector(state => state.burgerConstructor)

  return (
    <div className={`${style.list} mb-10`}>
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
        {items.map((item) => (
            <ConstructorListItem
              key={item._id}
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
