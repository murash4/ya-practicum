import { ADD_BUN, ADD_NOT_BUN, REMOVE_BUN, REMOVE_NOT_BUN } from './constants'

export function addIngredient (ingredient) {
  return dispatch => {
    if (ingredient.type !== 'bun') {
      dispatch({
        type: ADD_NOT_BUN,
        data: ingredient
      })
    } else {
      dispatch({
        type: REMOVE_BUN
      })
      dispatch({
        type: ADD_BUN,
        data: ingredient
      })
    }
  }
}

export function removeIngredient (ingredient) {
  return dispatch => {
    if (ingredient.type === 'bun') {
      dispatch({
        type: REMOVE_BUN
      })
    } else {
      dispatch({
        type: REMOVE_NOT_BUN,
        id: ingredient.uniqId
      })
    }
  }
}
