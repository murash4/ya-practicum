import React from 'react'
import styles from './style.module.css'
import AppHeader from '../app-header'
import BurgerIngredients from '../burger-ingredients'
import BurgerConstructor from '../burger-constructor'

function App () {
  const [ingredients, setTngredients] = React.useState([])
  const ingredientsUrl = 'https://norma.nomoreparties.space/api/ingredients'

  /**
   * Получаение и запись списка ингредиентов в state
   */
  const getIngredients = () => {
    fetch(ingredientsUrl)
      .then(res => res.json())
      .then(res => {
        setTngredients([...ingredients, ...res.data])
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

          <BurgerIngredients data={ingredients} />

          <BurgerConstructor data={ingredients} />
        </main>
      }
    </>
  )
}

export default App;
