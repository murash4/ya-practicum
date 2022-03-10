import { SET_LOADING, SET_ORDER, SET_ERROR, CLEAR_ERROR } from '../../actions/orderDetails/constants'

const initialState = {
  data: null,
  isLoading: false,
  error: false
}

export const orderDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CLEAR_ERROR: {
      return {
        ...state,
        error: false
      }
    }
    case SET_LOADING: {
      return {
        ...state,
        isLoading: action.value
      }
    }
    case SET_ORDER: {
      return {
        ...state,
        data: { ...action.data }
      }
    }
    case SET_ERROR: {
      return {
        ...state,
        data: null,
        error: true
      }
    }
    default: {
      return state
    }
  }
}
