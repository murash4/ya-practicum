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
    sauce: 'Соусы',
    main: 'Начинки',
    bun: 'Булки'
  }

  /**
   * Возвращает ингредиенты, отфильтрованные по типу (булки/соусы/начинки)
   * @return {array}
   */
  function filteredIngredients () {
    return props.data.filter(item => item.type === currentIngredientType)
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

      <p className="text text_type_main-medium mb-6">
        {typesName[currentIngredientType]}
      </p>

      <SimpleBar className={style.simplebar}>
        <IngredientList data={filteredIngredients()} />
      </SimpleBar>
    </section>
  )
}

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(ingredientType.isRequired)
}
