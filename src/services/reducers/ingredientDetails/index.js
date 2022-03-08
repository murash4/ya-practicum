import { SET_INGREDIENT_DETAILS, CLEAR_INGREDIENT_DETAILS } from '../../actions/ingredientDetails'

const initialState = null

export const ingredientDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_INGREDIENT_DETAILS: {
      return { ...action.data }
    }
    case CLEAR_INGREDIENT_DETAILS: {
      return initialState
    }
    default: {
      return initialState
    }
  }
}
