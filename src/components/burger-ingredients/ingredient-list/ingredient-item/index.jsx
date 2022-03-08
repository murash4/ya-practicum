import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { ingredientType } from '../../../../utils/types'
import { useDrag } from 'react-dnd'
import style from './style.module.css'

export default function IngredientItem ({ item, showDetails }) {
  const [, dragRef] = useDrag({
    type: 'ingredient',
    item
  })

  return (
    <div
      ref={dragRef}
      className={`${style.item} mb-8`}
      onClick={() => {showDetails(item)}}
    >
      <Counter count={1} size="default" />

      <img
        className={`ml-4 mr-4 mb-1`}
        src={item.image}
        alt={item.name}
      />

      <div className={`${style.price_wrap} mb-1`}>
        <div className={`${style.price} text text_type_main-default primary-color`}>
          {item.price}
        </div>
        <CurrencyIcon type="primary" />
      </div>

      <div className={`${style.item_name} text text_type_main-default primary-color`}>
        {item.name}
      </div>
    </div>
  )
}

IngredientItem.propTypes = {
  item: ingredientType.isRequired
}
