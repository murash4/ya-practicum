import { FC, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Price from '../../components/price'
import OrderInfoIngredient from '../../components/order-info-ingredient'
import SimpleBar from 'simplebar-react'
import { orderDate } from '../../helpers/functions'
import { fetchIngredients } from '../../services/actions/ingredients'
import { WS_ORDERS_CONNECTION_START } from '../../services/actions/wsOrders'
import { useSelector, useDispatch } from '../../services/store'
import styles from './style.module.css'
import { IIngredient } from '../../utils/types'

interface IOrderInfo {
  notInModal?: boolean
  isPrivate?: boolean
}

type TUseParams = {
  id: string
}

const OrderInfoPage: FC<IOrderInfo> = ({ notInModal, isPrivate }) => {
  const { id } = useParams<TUseParams>()
  const dispatch = useDispatch()
  const wsOrders = useSelector(state => state.wsOrders)
  const wsUserOrders = useSelector(state => state.wsUserOrders)
  const ingredients = useSelector(state => state.ingredients)
  const numberClass = notInModal ? styles.center : ''

  const orders = isPrivate ? wsUserOrders : wsOrders

  useEffect(
    () => {
      if (!ingredients.data.length && !ingredients.isLoading) {
        dispatch(fetchIngredients())
      }

      if (!orders.wsConnected && notInModal) {
        dispatch({ type: WS_ORDERS_CONNECTION_START })
      }
    },
    [dispatch, ingredients.data.length, ingredients.isLoading, orders.wsConnected, notInModal]
  )

  const order = orders.orders.filter(order => order._id === id)[0]

  if (!order) {
    return <></>
  }

  const status = order && order.status === 'done' ? 'Выполнен' : 'Готовится'
  const orderIngredients = order && order.ingredients.reduce((acc: Array<IIngredient>, ingredientId) => {
    const ingredient = ingredients.data.find(ingredient => ingredient._id === ingredientId)

    if (ingredient) {
      acc.push(ingredient)
    }

    return acc
  }, [])
  const getOrderSum = orderIngredients ? orderIngredients.reduce((acc, item) => acc + item.price, 0) : 0
  const uniqIngredientsId = Array.from(new Set(order.ingredients))

  return (
    <div className={`${styles.wrap} pt-10 pb-10`}>
      <div className={`${numberClass} text text_type_digits-default pt-6 mb-10`}>#{ order.number }</div>
      <div className="text text_type_main-medium mb-1">{ order.name }</div>
      <div className="text text_type_main-small mb-7 success-color">{ status }</div>
      <div className="text text_type_main-medium mb-6">Состав:</div>
      <SimpleBar className={`${styles.simpleBar} mb-8`}>
        <div className="pr-8">
          {
            uniqIngredientsId.map(ingredientId => (
              <OrderInfoIngredient
                key={ingredientId}
                id={ingredientId}
                ingredeintCount={order.ingredients.join('.').split(ingredientId).length - 1}
              />
            ))
          }
        </div>
      </SimpleBar>
      <div className={styles.footer}>
        <div className="text text_type_main-default text_color_inactive">{ orderDate(order.createdAt) }</div>
        <Price text={getOrderSum.toString()} />
      </div>
    </div>
  )
}

export default OrderInfoPage
