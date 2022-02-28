import React from 'react'
import styles from './style.module.css'
import AppHeader from '../app-header'
import BurgerIngredients from '../burger-ingredients'
import BurgerConstructor from '../burger-constructor'
import { apiUrl } from '../../utils/api'

export const IngredientsContext = React.createContext()

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
        <IngredientsContext.Provider value={ingredients}>
          <main className={`${styles.main_container} pt-10`}>
            <p className={`${styles.main_container_title} text text_type_main-large mb-5`}>
              Соберите бургер
            </p>

            <BurgerIngredients />

            <BurgerConstructor />
          </main>
        </IngredientsContext.Provider>
      }
    </>
  )
}

export default App;
