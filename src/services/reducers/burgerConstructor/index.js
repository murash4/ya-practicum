import { ADD_BUN, ADD_NOT_BUN, REMOVE_BUN, REMOVE_NOT_BUN, SET_INGREDIENT } from '../../actions/burgerConstructor/constants'

const initialState = {
  items: [],
  bun: null
}

export const burgerConstructorReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_INGREDIENT: {
      return {
        ...state,
        items: [...action.data]
      }
    }
    case ADD_BUN: {
      return {
        ...state,
        bun: action.data
      }
    }
    case ADD_NOT_BUN: {
      const obj = { ...state }

      obj.items.push({
        ...action.data,
        id: obj.items.length
      })

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

      obj.items = obj.items.filter(item => item.id !== action.id)
      obj.items = obj.items.map((item, index) => {
        item.id = index

        return item
      })

      return obj
    }
    default: {
      return {
        ...state
      }
    }
  }
}
