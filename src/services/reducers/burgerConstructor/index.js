import { ADD_BUN, ADD_NOT_BUN, REMOVE_BUN, REMOVE_NOT_BUN } from '../../actions/burgerConstructor/constants'

const initialState = {
  items: [],
  bun: null
}

export const burgerConstructorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BUN: {
      return {
        ...state,
        bun: action.data
      }
    }
    case ADD_NOT_BUN: {
      const obj = { ...state }

      obj.items.push(action.data)

      return obj
    }
    case REMOVE_BUN: {
      return {
        ...state,
        bun: null
      }
    }
    case REMOVE_NOT_BUN: {
      const obj = { ...state }

      obj.items = obj.items.filter(item => item._id !== action.id)

      return obj
    }
    default: {
      return {
        ...state
      }
    }
  }
}
