import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import style from './style.module.css'
import PropTypes from 'prop-types'
import { ingredientType } from '../../../utils/types'

export default function IngredientList (props) {
  return (
    <div className={`${style.list} pt-6 pr-4 pb-2 pl-4`}>
      {props.data.map(item => (
        <div
          key={item._id}
          className={`${style.item} mb-8`}
        >
          <Counter count={1} size="default" />

          <img
            className={`ml-4 mr-4 mb-1`}
            src={item.image}
            alt=""
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
      ))}
    </div>
  )
}

IngredientList.propTypes = {
  data: PropTypes.arrayOf(ingredientType.isRequired)
}
