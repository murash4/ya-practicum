import {FC} from 'react'
import Price from '../../components/price'
import {
  useLocation,
  useHistory
} from 'react-router-dom'
import { orderDate } from '../../helpers/functions'
import { TLocation } from '../../utils/types'
import { TWsOrder } from '../../services/reducers/wsOrders'
import { useSelector } from '../../services/store'
import styles from './style.module.css'

interface IOrderFeed {
  isPublic?: boolean
  order: TWsOrder
}

const OrderFeed: FC<IOrderFeed> = ({ isPublic, order }) => {
  const location = useLocation<TLocation>()
  const history = useHistory()
  const ingredients = useSelector(state => state.ingredients.data)

  const getImage = (id: string) => {
    // @ts-ignore
    const result = ingredients.find(ingredient => ingredient._id === id)

    // @ts-ignore
    return result ? result.image_mobile : ''
  }

  const openModal = () => {
    history.push({
      pathname: isPublic ? `/feed/${order._id}` : `/profile/orders/${order._id}`,
      state: {
        backgroundLocation: location
      }
    })
  }

  const lastImage = () => {
    if (order.ingredients.length > 5) {
      return (
        <div className={styles.ingredient}>
          <img
            src={getImage(order.ingredients[5])}
            alt=""
            className={`${styles.ingredientImage} ${styles.ingredientImageLast}`}
          />
          <div className={styles.ingredientNumber}>+{order.ingredients.length - 5}</div>
        </div>
      )
    } else {
      return ''
    }
  }

  const orderIngredients = order.ingredients.reduce((acc, ingredientId) => {
    // @ts-ignore
    const ingredient = ingredients.find(ingredient => ingredient._id === ingredientId)

    if (ingredient) {
      // @ts-ignore
      acc.push(ingredient)
    }

    return acc
  }, [])
  // @ts-ignore
  const getOrderSum = orderIngredients ? orderIngredients.reduce((acc, item) => acc + item.price, 0) : 0

  return (
    <div
      className={`${styles.item} pt-6 pr-6 pl-6 pb-7`}
      onClick={openModal}
    >
      <div className={`${styles.header} mb-6`}>
        <div className="text text_type_digits-default">#{order.number}</div>
        <div className="text text_type_main-default text_color_inactive">{ orderDate(order.createdAt) }</div>
      </div>
      <div className="text text_type_main-medium mb-6">{order.name}</div>
      <div className={`${styles.footer}`}>
        <div className={styles.ingredients}>
          {
            order.ingredients.slice(0, 5).map((id, index) => (
              <div
                key={index}
                className={styles.ingredient}
              >
                <img
                  src={getImage(id)}
                  alt=""
                  className={styles.ingredientImage}
                />
              </div>
            ))
          }
          {
            lastImage()
          }
        </div>
        <Price text={getOrderSum.toString()} />
      </div>
    </div>
  )
}

export default OrderFeed
