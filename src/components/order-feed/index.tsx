import {FC} from 'react'
import Price from '../../components/price'
import {
  useLocation,
  useHistory
} from 'react-router-dom'
import styles from './style.module.css'
import { TLocation } from '../../utils/types'

interface IOrderFeed {
  isPublic?: boolean
}

const OrderFeed: FC<IOrderFeed> = ({ isPublic }) => {
  const location = useLocation<TLocation>()
  const history = useHistory()

  const openModal = () => {
    history.push({
      pathname: isPublic ? `/feed/123` : `/profile/orders/3452`,
      state: {
        backgroundLocation: location
      }
    })
  }

  return (
    <div
      className={`${styles.item} pt-6 pr-6 pl-6 pb-7`}
      onClick={openModal}
    >
      <div className={`${styles.header} mb-6`}>
        <div className="text text_type_digits-default">#034535</div>
        <div className="text text_type_main-default text_color_inactive">Сегодня, 16:20 i-GMT+3</div>
      </div>
      <div className="text text_type_main-medium mb-6">Death Star Starship Main бургер</div>
      <div className={`${styles.footer}`}>
        <div className={styles.ingredients}>
          <div className={styles.ingredient}></div>
          <div className={styles.ingredient}></div>
          <div className={styles.ingredient}></div>
          <div className={styles.ingredient}></div>
          <div className={styles.ingredient}></div>
          <div className={styles.ingredient}>+3</div>
        </div>
        <Price text={'800'} />
      </div>
    </div>
  )
}

export default OrderFeed
