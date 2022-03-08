import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import AppHeader from '../app-header'
import BurgerIngredients from '../burger-ingredients'
import BurgerConstructor from '../burger-constructor'
import { fetchIngredients } from '../../services/actions/ingredients'
import styles from './style.module.css'

function App () {
  const { ingredients } = useSelector(state => state)
  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(fetchIngredients())
  }, [])

  return (
    <>
      <AppHeader />

      {
        ingredients.data.length &&
        <main className={`${styles.main_container} pt-10`}>
            <p className={`${styles.main_container_title} text text_type_main-large mb-5`}>
              Соберите бургер
            </p>

            <BurgerIngredients />

            <BurgerConstructor />
        </main>
      }
    </>
  )
}

export default App;
