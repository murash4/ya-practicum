import { IS_LOADING, SET_INGREDIENTS } from '../../actions/ingredients/constants'

const initialState = {
  data: [],
  isLoading: false
}


export const ingredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_INGREDIENTS: {
      return {
        ...state,
        data: action.data
      }
    }
    case IS_LOADING: {
      return {
        ...state,
        isLoading: action.value
      }
    }
    default: {
      return {
        ...state
      }
    }
  }
}
