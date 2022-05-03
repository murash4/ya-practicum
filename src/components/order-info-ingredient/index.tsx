import Price from '../price'
import styles from './style.module.css'

const OrderInfoIngredient = () => {
  return (
    <div className={styles.item}>
      <div className={`${styles.img} mr-4`}></div>
      <div className={`${styles.title} text text_type_main-default mr-4`}>Филе Люминесцентного тетраодонтимформа</div>
      <Price text={'1 x 300'} />
    </div>
  )
}

export default OrderInfoIngredient
