import {
  SET_INGREDIENT_DETAILS,
  CLEAR_INGREDIENT_DETAILS,
  TIngredientDetailsActions
} from '../../actions/ingredientDetails'
import { IIngredient } from '../../../utils/types'

const initialState = null

export const ingredientDetailsReducer = (state = initialState, action: TIngredientDetailsActions): IIngredient | null => {
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
