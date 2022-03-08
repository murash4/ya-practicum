import React from 'react'
import {useSelector} from 'react-redux'
import ConstructorList from './constructor-list'
import ConstructorFooter from './constructor-footer'
import style from './style.module.css'

function reducer(state, action) {
  switch (action.type) {
    case 'set':
      return action.payload
    case 'clear':
      return []
    default:
      return []
  }
}

export default function BurgerConstructor () {
  const ingredients = useSelector(state => state.ingredients.data)
  const [ingredientsState, dispatch] = React.useReducer(reducer, ingredients)

  React.useEffect(() => {
    // оставляем в ингредиентах только 1 булку
    const removeBun = () => {
      return ingredients.filter((item, index) => (
        (index === 0) ||
        (index !== 0 && item.type !== 'bun'))
      )
    }

    dispatch({
      type: 'set',
      payload: removeBun()
    })
  }, [ingredients])


  return (
    <section className={`${style.section} pb-10`}>
      <ConstructorList data={ingredientsState} />

      <ConstructorFooter data={ingredientsState} />
    </section>
  )
}
