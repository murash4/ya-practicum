import React, { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchOrder } from  '../../../services/actions/orderDetails'
import {
  Button,
  CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types'
import { ingredientType } from '../../../utils/types'
import Modal from '../../hocs/modal'
import OrderDetails from '../../order-details'
import style from './style.module.css'

export default function ConstructorFooter (props) {
  const { isLoading, error } = useSelector(state => state.orderDetails)
  const order = useSelector(state => state.orderDetails.data)
  const dispatch = useDispatch()
  const [isVisiblePopup, setVisiblePopup] = React.useState(false)

  /**
   * Возвращает сумму всех ингредиентов
   * @param {array} arr
   * @return {number}
   */
  function getAllSum (arr) {
    return arr.reduce((acc, item) => {
      if (item.type === 'bun') {
        return acc + item.price * 2
      }

      return acc + item.price
    }, 0)
  }

  /**
   * Показ модалки с информацией о заказе
   */
  const showPopup = useCallback(() => {
      order && !error && setVisiblePopup(true)
    },
    [order, error, setVisiblePopup],
  )

  /**
   * Скрытие модалки с информацией о заказе
   */
  const hidePopup = () => {
    setVisiblePopup(false)
  }

  /**
   * Возвращает массив с id всех ингредиентов
   * @return {array}
   */
  const getAllIds = () => {
    const array = [...props.data, props.data.find(item => item.type === 'bun')]

    return array.map(item => item._id)
  }

  /**
   * Получает номер заказа с бэкенда
   */
  const getOrderNumber = () => {
    const data = JSON.stringify({ ingredients: getAllIds() })

    dispatch(fetchOrder(data))
  }

  React.useEffect(() => {
    showPopup()
  }, [order, showPopup])

  return (
   <>
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
         disabled={isLoading}
         onClick={getOrderNumber}
       >
         Оформить заказ
       </Button>
     </div>

     {
       isVisiblePopup &&
       <Modal close={hidePopup}>
         <OrderDetails />
       </Modal>
     }
   </>
  )
}

ConstructorFooter.propTypes = {
  data: PropTypes.arrayOf(ingredientType).isRequired
}
