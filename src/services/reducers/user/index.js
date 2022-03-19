import {
  SET_USER_LOADING,
  SET_USER_DATA,
  CLEAR_USER_DATA,
  SET_USER_DATA_ERROR,
  CLEAR_USER_DATA_ERROR,
  SET_USER_MESSAGE
} from '../../actions/user/constants'

const initialState = {
  data: null,
  isLoading: false,
  error: false,
  responseMessage: null
}

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case CLEAR_USER_DATA_ERROR: {
      return {
        ...state,
        error: false
      }
    }
    case SET_USER_LOADING: {
      return {
        ...state,
        isLoading: action.value,
        responseMessage: action.value ? null : state.responseMessage
      }
    }
    case SET_USER_DATA: {
      return {
        ...state,
        data: { ...action.data }
      }
    }
    case CLEAR_USER_DATA: {
      return {
        ...initialState
      }
    }
    case SET_USER_DATA_ERROR: {
      return {
        ...state,
        error: true
      }
    }
    case SET_USER_MESSAGE: {
      return {
        ...state,
        responseMessage: action.data
      }
    }
    default: {
      return state
    }
  }
}
