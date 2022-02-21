import {
  Button,
  CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components'
import style from './style.module.css'
import PropTypes from 'prop-types'
import { ingredientType } from '../../../utils/types'

export default function ConstructorFooter (props) {
  /**
   * Возвращает сумму всех ингредиентов
   * @param {array} arr
   * @return {number}
   */
  function getAllSum (arr) {
    return arr.reduce((acc, item) => acc + item.price, 0)
  }

  return (
    <div className={`${style.footer} pl-4 pr-4`}>
      <div className={`${style.price_wrap} mr-10`}>
        <p className={`${style.all_sum} text text_type_digits-medium`}>
          {getAllSum(props.data)}
        </p>
        <CurrencyIcon type="primary" />
      </div>
      <Button
        type="primary"
        size="large"
      >
        Оформить заказ
      </Button>
    </div>
  )
}

ConstructorFooter.propTypes = {
  data: PropTypes.arrayOf(ingredientType.isRequired)
}
