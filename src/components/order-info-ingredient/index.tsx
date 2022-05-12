import { FC } from 'react'
import Price from '../price'
import { useSelector } from '../../services/store'
import styles from './style.module.css'

interface IOrderInfoIngredient {
  id: string
  ingredeintCount: number
}

const OrderInfoIngredient: FC<IOrderInfoIngredient> = ({ id, ingredeintCount }) => {
  const ingredients = useSelector(state => state.ingredients.data)
  const ingredient = ingredients.find(item => item._id === id)

  if (!ingredient) {
    return <></>
  }

  return (
    <div className={styles.item}>
      <div className={`${styles.imgWr} mr-4`}>
        <img
          src={ingredient.image_mobile}
          alt={ingredient.name}
          className={styles.img}
        />
      </div>
      <div className={`${styles.title} text text_type_main-default mr-4`}>{ingredient.name}</div>
      <Price text={`${ingredeintCount} x ${ingredient.price}`} />
    </div>
  )
}

export default OrderInfoIngredient
