import Tabs from './tabs'
import IngredientList from './ingredient-list'
import style from './style.module.css'
import SimpleBar from 'simplebar-react'

export default function BurgerIngredients (props) {
  /**
   * Получаем все названия типов ингредиентов
   */
  const ingredientTypes = props.data.reduce((acc, item) => {
    if (!acc.includes(item.type)) {
      acc.push(item.type)
    }

    return acc
  }, [])

  return (
    <section className={`${style.section} pb-10`}>
      <Tabs types={ingredientTypes} />

      <p className="text text_type_main-medium mb-6">
        Булки
      </p>

      <SimpleBar className={style.simplebar}>
        <IngredientList data={props.data} />
      </SimpleBar>
    </section>
  )
}
