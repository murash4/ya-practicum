import React, { useEffect } from 'react'
import { useSelector, useDispatch } from '../../services/store'
import SimpleBar from 'simplebar-react'
import ProfileMenu from '../../components/profile-menu'
import OrderFeed from '../../components/order-feed'
import { WS_ORDERS_CLOSE_CONNECTION, WS_ORDERS_CONNECTION_START } from '../../services/actions/wsOrders'
import styles from './style.module.css'
import { cookie } from '../../utils/cookie'
import { fetchIngredients } from '../../services/actions/ingredients'

const ProfileOrdersPage = () => {
  const dispatch = useDispatch()
  const menuText = 'В этом разделе вы можете просмотреть свою историю заказов'
  const wsOrders = useSelector(state => state.wsOrders)
  const ingredients = useSelector(state => state.ingredients)

  useEffect(() => {
    if (!ingredients.data.length && !ingredients.isLoading) {
      dispatch(fetchIngredients())
    }

    if (!wsOrders.wsConnected) {
      dispatch({
        type: WS_ORDERS_CONNECTION_START,
        accessToken: cookie.get('token')
      })
    }

    return () => {
      if (wsOrders.wsConnected) {
        dispatch({ type: WS_ORDERS_CLOSE_CONNECTION })
      }
    }
  }, [dispatch, wsOrders.wsConnected, ingredients.data.length, ingredients.isLoading])

  return (
    <div className="profile">
      <ProfileMenu text={menuText} />
      <SimpleBar className={`${styles.simplebar} mt-9`}>
        <div className="pr-4">
          {
            wsOrders.orders.map(order => (
              <OrderFeed
                key={order._id}
                order={order}
              />
            ))
          }
        </div>
      </SimpleBar>
    </div>
  )
}

export default ProfileOrdersPage
