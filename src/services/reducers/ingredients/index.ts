import {
  SET_INGREDIENTS_LOADING,
  SET_INGREDIENTS,
  TIngredientsActions
} from '../../actions/ingredients/constants'
import { IFetchIngredients } from '../../../utils/types'

interface IIngredientsState {
  data: Array<IFetchIngredients>
  isLoading: boolean
}

const initialState: IIngredientsState = {
  data: [],
  isLoading: false
}

export const ingredientsReducer = (state = initialState, action: TIngredientsActions): IIngredientsState => {
  switch (action.type) {
    case SET_INGREDIENTS: {
      return {
        ...state,
        data: action.data
      }
    }
    case SET_INGREDIENTS_LOADING: {
      return {
        ...state,
        isLoading: action.value
      }
    }
    default: {
      return state
    }
  }
}
