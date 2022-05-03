import { FC } from 'react'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './style.module.css'

interface IPrice {
  text: string
}

const Price: FC<IPrice> = ({ text }) => {
  return (
    <div className={styles.priceWr}>
      <div className={`${styles.price} text text_type_digits-default`}>{ text }</div>
      <CurrencyIcon type="primary" />
    </div>
  )
}

export default Price
