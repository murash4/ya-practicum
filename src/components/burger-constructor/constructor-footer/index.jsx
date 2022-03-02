import React from 'react'
import {
  Button,
  CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types'
import { apiUrl } from '../../../utils/api'
import { ingredientType } from '../../../utils/types'
import Modal from '../../hocs/modal'
import OrderDetails from '../../order-details'
import style from './style.module.css'

export default function ConstructorFooter (props) {
  const [isVisiblePopup, setVisiblePopup] = React.useState(false)
  const [order, setOrder] = React.useState({})
  const [isLoading, setIsLoading] = React.useState(false)

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
  const showPopup = () => {
    setVisiblePopup(true)
  }

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
    if (isLoading) {
      return
    }

    const data = JSON.stringify({ ingredients: getAllIds() })

    setIsLoading(true)
    fetch(`${apiUrl}orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: data
    })
      .then(res => {
        if (!res.ok) {
          throw new Error("статус не 'ok'")
        }

        return res.json()
      })
      .then(res => {
        setOrder(res)
        showPopup()
      })
      .catch(e => {
        console.log('Ошибка запроса к api: ', e)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

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
         onClick={getOrderNumber}
       >
         Оформить заказ
       </Button>
     </div>

     {
       isVisiblePopup &&
       <Modal close={hidePopup}>
         <OrderDetails orderNumber={order.order.number} />
       </Modal>
     }
   </>
  )
}

ConstructorFooter.propTypes = {
  data: PropTypes.arrayOf(ingredientType).isRequired
}
