import React from 'react'
import SimpleBar from 'simplebar-react'
import IngredientList from './ingredient-list'
import Tabs from './tabs'
import { IngredientsContext } from '../../services/contexts'
import style from './style.module.css'

const typesName = {
  bun: 'Булки',
  main: 'Начинки',
  sauce: 'Соусы'
}

export default function BurgerIngredients () {
  const ingredients = React.useContext(IngredientsContext)
  const [currentIngredientType, setCurrent] = React.useState('bun')

  /**
   * Возвращает все названия типов ингредиентов
   * @return {array}
   */
  const ingredientTypes = ingredients.reduce((acc, item) => {
    if (!acc.includes(item.type)) {
      acc.push(item.type)
    }

    return acc
  }, [])

  return (
    <section className={`${style.section} pb-10`}>
      <Tabs
        types={ingredientTypes}
        typesName={typesName}
        current={currentIngredientType}
        setCurrent={setCurrent}
      />

      <SimpleBar className={style.simplebar}>
        {
          ingredientTypes.map(name => {
            const filteredData = ingredients.filter(ingredient => ingredient.type === name)

            return (
              <IngredientList
                key={name}
                data={filteredData}
                typesName={typesName}
                typeName={name}
              />
            )
          })
        }
      </SimpleBar>
    </section>
  )
}
