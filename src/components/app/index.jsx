import React from 'react'
import { apiUrl } from '../../utils/api'
import AppHeader from '../app-header'
import BurgerIngredients from '../burger-ingredients'
import BurgerConstructor from '../burger-constructor'
import styles from './style.module.css'

import { IngredientsContext } from '../../services/contexts'

function App () {
  const [ingredients, setTngredients] = React.useState([])

  /**
   * Получаение и запись списка ингредиентов в state
   */
  const getIngredients = () => {
    fetch(`${apiUrl}ingredients`)
      .then(res => {
        if (!res.ok) {
          throw new Error("статус не 'ok'")
        }

        return res.json()
      })
      .then(res => {
        setTngredients([...res.data])
      })
      .catch(e => {
        console.log('Ошибка запроса к api: ', e)
      })
  }

  React.useEffect(() => {
    getIngredients()
  }, [])

  return (
    <>
      <AppHeader />

      {
        ingredients.length &&
          <main className={`${styles.main_container} pt-10`}>
            <p className={`${styles.main_container_title} text text_type_main-large mb-5`}>
              Соберите бургер
            </p>

          <IngredientsContext.Provider value={ingredients}>
            <BurgerIngredients />

            <BurgerConstructor />
          </IngredientsContext.Provider>
        </main>
      }
    </>
  )
}

export default App;
