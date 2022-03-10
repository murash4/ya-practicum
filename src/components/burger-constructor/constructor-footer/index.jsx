import React, { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchOrder } from  '../../../services/actions/orderDetails'
import {
  Button,
  CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components'
import Modal from '../../hocs/modal'
import OrderDetails from '../../order-details'
import style from './style.module.css'

export default function ConstructorFooter () {
  const { isLoading, error } = useSelector(state => state.orderDetails)
  const { items, bun } = useSelector(state => state.burgerConstructor)
  const order = useSelector(state => state.orderDetails.data)
  const dispatch = useDispatch()
  const [isVisiblePopup, setVisiblePopup] = React.useState(false)

  /**
   * Возвращает сумму всех ингредиентов
   * @return {number}
   */
  function getAllSum () {
    const arr = bun ? [...items, bun, bun] : items

    return arr.reduce((acc, item) => {
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
    const array = [...items, bun]

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
           {getAllSum()}
         </p>
         <CurrencyIcon type="primary" />
       </div>
       <Button
         type="primary"
         size="large"
         disabled={isLoading || !bun}
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
