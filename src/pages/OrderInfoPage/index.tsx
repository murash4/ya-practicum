import { FC } from 'react'
import Price from '../../components/price'
import OrderInfoIngredient from '../../components/order-info-ingredient'
import SimpleBar from 'simplebar-react'
import styles from './style.module.css'

interface IOrderInfo {
  notInModal?: boolean
}

const OrderInfoPage: FC<IOrderInfo> = ({ notInModal }) => {
  const numberClass = notInModal ? styles.center : ''

  return (
    <div className={`${styles.wrap} pt-10 pb-10`}>
      <div className={`${numberClass} text text_type_digits-default pt-6 mb-10`}>#034533</div>
      <div className="text text_type_main-medium mb-1">Black Hole Singularity острый бургер</div>
      <div className="text text_type_main-small mb-7 success-color">Выполнен</div>
      <div className="text text_type_main-medium mb-6">Состав:</div>
      <SimpleBar className={`${styles.simpleBar} mb-8`}>
        <div className="pr-8">
          <OrderInfoIngredient />
          <OrderInfoIngredient />
          <OrderInfoIngredient />
          <OrderInfoIngredient />
          <OrderInfoIngredient />
          <OrderInfoIngredient />
          <OrderInfoIngredient />
          <OrderInfoIngredient />
          <OrderInfoIngredient />
          <OrderInfoIngredient />
        </div>
      </SimpleBar>
      <div className={styles.footer}>
        <div className="text text_type_main-default text_color_inactive">Вчера, 13:50 i-GMT+3</div>
        <Price text={'800'} />
      </div>
    </div>
  )
}

export default OrderInfoPage
