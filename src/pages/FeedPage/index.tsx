import React, { useEffect } from 'react'
import { useSelector, useDispatch } from '../../services/store'
import OrderFeed from '../../components/order-feed'
import mainStyles from '../IngredientsConstructorPage/style.module.css'
import SimpleBar from 'simplebar-react'
import styles from './style.module.css'
import { WS_ORDERS_CLOSE_CONNECTION, WS_ORDERS_CONNECTION_START } from '../../services/actions/wsOrders'
import { fetchIngredients } from '../../services/actions/ingredients'
import { TWsOrder } from '../../services/reducers/wsOrders'

const FeedPage = () => {
  const dispatch = useDispatch()
  const wsOrders = useSelector(state => state.wsOrders)
  const ingredients = useSelector(state => state.ingredients)

  useEffect(
    () => {
      if (!ingredients.data.length && !ingredients.isLoading) {
        dispatch(fetchIngredients())
      }

      if (!wsOrders.wsConnected) {
        dispatch({ type: WS_ORDERS_CONNECTION_START })
      }

      return () => {
        if (wsOrders.wsConnected) {
          dispatch({ type: WS_ORDERS_CLOSE_CONNECTION })
        }
      }
    },
    [dispatch, ingredients.data.length, ingredients.isLoading, wsOrders.wsConnected]
  )

  const createOrdersArray = (source: Array<TWsOrder>): Array<Array<number>> => {
    const result: Array<Array<number>> = []
    let minArray: Array<number> = []

    source.forEach((item, index) => {
      minArray.push(item.number)

      if (minArray.length === 10) {
        result.push(minArray)
        minArray = []
      }

      if (index === source.length - 1 && minArray.length) {
        result.push(minArray)
      }
    })

    return result
  }

  const doneOrders = wsOrders.orders.filter(item => item.status === 'done')
  const pendingOrders = wsOrders.orders.filter(item => item.status === 'pending')
  const doneOrdersNums = createOrdersArray(doneOrders)
  const pendingOrdersNums = createOrdersArray(pendingOrders)

  return (
    <main className={`${mainStyles.main_container} pt-10`}>
      <p className={`${mainStyles.main_container_title} text text_type_main-large mb-5`}>
        Лента заказов
      </p>
      <div className={`${styles.cols}`}>
        <SimpleBar className={`${styles.col} mr-5`}>
          <div className="pr-4">
            {
              wsOrders.orders.map(order => (
                <OrderFeed
                  key={order._id}
                  order={order}
                  isPublic={true}
                />
              ))
            }
          </div>
        </SimpleBar>
        <SimpleBar className={`${styles.col} ml-5`}>
          <div className={`${styles.ordersStatusCols} mb-8`}>
            {
              doneOrdersNums.map((group, index) => (
                <div
                  key={index}
                  className={`${styles.ordersStatusCol} mb-2`}
                >
                  <div className="text text_type_main-medium mb-4">Готовы:</div>
                  {
                    group.map((number, index2) => (
                      <div
                        key={index2}
                        className="text text_type_digits-default mb-1 success-color"
                      >{ number }</div>
                    ))
                  }
                </div>
              ))
            }
            {
              pendingOrdersNums.map((group, index) => (
                <div
                  key={index}
                  className={`${styles.ordersStatusCol} mb-2`}
                >
                  <div className="text text_type_main-medium mb-4">В работе:</div>
                  {
                    group.map((number, index2) => (
                      <div
                        key={index2}
                        className="text text_type_digits-default mb-1"
                      >{ number }</div>
                    ))
                  }
                </div>
              ))
            }
          </div>
          <div className="text text_type_main-medium">Выполнено за все время:</div>
          <div className="text text_type_digits-large mb-10">{ wsOrders.total }</div>
          <div className="text text_type_main-medium">Выполнено за сегодня:</div>
          <div className="text text_type_digits-large">{ wsOrders.totalToday }</div>
        </SimpleBar>
      </div>
    </main>
  )
}

export default FeedPage
