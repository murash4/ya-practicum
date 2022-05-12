import React, { useEffect } from 'react'
import { useSelector, useDispatch } from '../../services/store'
import SimpleBar from 'simplebar-react'
import ProfileMenu from '../../components/profile-menu'
import OrderFeed from '../../components/order-feed'
import { WS_USER_ORDERS_CONNECTION_START } from '../../services/actions/wsUserOrders'
import styles from './style.module.css'
import { cookie } from '../../utils/cookie'
import { fetchIngredients } from '../../services/actions/ingredients'

const ProfileOrdersPage = () => {
  const dispatch = useDispatch()
  const menuText = 'В этом разделе вы можете просмотреть свою историю заказов'
  const wsUserOrders = useSelector(state => state.wsUserOrders)
  const ingredients = useSelector(state => state.ingredients)

  useEffect(() => {
    if (!ingredients.data.length && !ingredients.isLoading) {
      dispatch(fetchIngredients())
    }

    if (!wsUserOrders.wsConnected) {
      dispatch({
        type: WS_USER_ORDERS_CONNECTION_START,
        accessToken: cookie.get('token')
      })
    }
  }, [dispatch, wsUserOrders.wsConnected, ingredients.data.length, ingredients.isLoading])

  return (
    <div className="profile">
      <ProfileMenu text={menuText} />
      <SimpleBar className={`${styles.simplebar} mt-9`}>
        <div className="pr-4">
          {
            wsUserOrders.orders.map(order => (
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
