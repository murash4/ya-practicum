import IngredientDetails from '../../components/ingredient-details'
import styles from './style.module.css'

export default function IngredientsPage () {
  return (
    <div className={styles.container}>
      <h2 className={`${styles.title} text text_type_main-large mt-10`}>Детали ингредиента</h2>
      <IngredientDetails />
    </div>
  )
}
