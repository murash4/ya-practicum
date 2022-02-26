import Tabs from './tabs'
import IngredientList from './ingredient-list'
import style from './style.module.css'
import SimpleBar from 'simplebar-react'
import PropTypes from 'prop-types'
import React from 'react'
import { ingredientType } from '../../utils/types'

export default function BurgerIngredients (props) {
  const [currentIngredientType, setCurrent] = React.useState('bun')
  const typesName = {
    bun: 'Булки',
    main: 'Начинки',
    sauce: 'Соусы'
  }

  /**
   * Возвращает все названия типов ингредиентов
   * @return {array}
   */
  const ingredientTypes = props.data.reduce((acc, item) => {
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
          Object.keys(typesName).map(name => {
            const filteredData = props.data.filter(ingredient => ingredient.type === name)

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

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(ingredientType).isRequired
}
