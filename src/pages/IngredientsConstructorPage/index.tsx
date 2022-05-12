import React from 'react'
import { useSelector, useDispatch } from '../../services/store'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import BurgerIngredients from '../../components/burger-ingredients'
import BurgerConstructor from '../../components/burger-constructor'
import { fetchIngredients } from '../../services/actions/ingredients'
import styles from './style.module.css'

function IngredientsConstructorPage () {
  const { ingredients } = useSelector(state => state)
  const dispatch = useDispatch()

  if (!ingredients.data.length && !ingredients.isLoading) {
    dispatch(fetchIngredients())
  }

  return (
    <DndProvider backend={HTML5Backend}>
      {!!ingredients.data.length &&
        <main className={`${styles.main_container} pt-10`}>
          <p className={`${styles.main_container_title} text text_type_main-large mb-5`}>
            Соберите бургер
          </p>

          <BurgerIngredients />

          <BurgerConstructor />
        </main>
      }
    </DndProvider>
  )
}

export default IngredientsConstructorPage
