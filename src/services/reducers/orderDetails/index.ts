import {
  SET_ORDER_DETAILS_LOADING,
  SET_ORDER_DETAILS,
  SET_ORDER_DETAILS_ERROR,
  CLEAR_ORDER_DETAILS_ERROR, TOrderDetailsActions, IOrderDetailsData
} from '../../actions/orderDetails/constants'

interface IOrderDetailsState {
  data: IOrderDetailsData | null,
  isLoading: boolean,
  error: boolean
}

const initialState: IOrderDetailsState = {
  data: null,
  isLoading: false,
  error: false
}

export const orderDetailsReducer = (state = initialState, action: TOrderDetailsActions): IOrderDetailsState => {
  switch (action.type) {
    case CLEAR_ORDER_DETAILS_ERROR: {
      return {
        ...state,
        error: false
      }
    }
    case SET_ORDER_DETAILS_LOADING: {
      return {
        ...state,
        isLoading: action.value
      }
    }
    case SET_ORDER_DETAILS: {
      return {
        ...state,
        data: { ...action.data }
      }
    }
    case SET_ORDER_DETAILS_ERROR: {
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
