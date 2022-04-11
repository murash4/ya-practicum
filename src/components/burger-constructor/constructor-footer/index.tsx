import React, { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { fetchOrder } from  '../../../services/actions/orderDetails'
import { CLEAR_CONSTRUCTOR } from '../../../services/actions/burgerConstructor/constants'
import {
  Button,
  CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components'
import Modal from '../../hocs/modal'
import OrderDetails from '../../order-details'
import style from './style.module.css'
import { IIngredient } from '../../../utils/types'

export default function ConstructorFooter () {
  // @ts-ignore
  const user = useSelector(state => state.user)
  // @ts-ignore
  const { isLoading, error } = useSelector(state => state.orderDetails)
  // @ts-ignore
  const { items, bun } = useSelector(state => state.burgerConstructor)
  // @ts-ignore
  const order = useSelector(state => state.orderDetails.data)
  const dispatch = useDispatch()
  const history = useHistory()
  const [isVisiblePopup, setVisiblePopup] = React.useState(false)

  /**
   * Возвращает сумму всех ингредиентов
   * @return {number}
   */
  function getAllSum (): number {
    const arr = bun ? [...items, bun, bun] : items

    return arr.reduce((acc: number, item: IIngredient) => {
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
  const hidePopup = (): void => {
    setVisiblePopup(false)
    dispatch({
      type: CLEAR_CONSTRUCTOR
    })
  }

  /**
   * Возвращает массив с id всех ингредиентов
   * @return {array}
   */
  const getAllIds = (): Array<string> => {
    const array = [...items, bun]

    return array.map(item => item._id)
  }

  /**
   * Получает номер заказа с бэкенда
   */
  const getOrderNumber = (): void => {
    const data = JSON.stringify({ ingredients: getAllIds() })

    dispatch(fetchOrder(data))
  }

  /**
   * Обработчик клика на кнопку оформления заказа
   */
  const orderHandler = (): void => {
    user.data ? getOrderNumber() : history.push({ pathname: '/login' })
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
         onClick={orderHandler}
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
