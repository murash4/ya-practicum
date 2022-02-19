import {
  Button,
  CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components'
import style from './style.module.css'
import PropTypes from 'prop-types';

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

const ingredientType = PropTypes.shape({
  _id: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  proteins: PropTypes.number,
  fat: PropTypes.number,
  carbohydrates: PropTypes.number,
  calories: PropTypes.number,
  price: PropTypes.number,
  image: PropTypes.string,
  image_mobile: PropTypes.string,
  image_large: PropTypes.string,
  __v: PropTypes.number,
})

ConstructorFooter.propTypes = {
  data: PropTypes.arrayOf(ingredientType.isRequired)
}
