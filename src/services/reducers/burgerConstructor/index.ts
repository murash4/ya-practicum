import {
  ADD_BUN,
  ADD_NOT_BUN,
  REMOVE_BUN,
  REMOVE_NOT_BUN,
  SET_INGREDIENT,
  CLEAR_CONSTRUCTOR,
  TBurgerConstructorActions
} from '../../actions/burgerConstructor/constants'
import { IIngredient } from '../../../utils/types'

interface IBurgerConstructorState {
  items: Array<IIngredient>
  bun: null | IIngredient
  count: Record<string, number>
}

const initialState: IBurgerConstructorState = {
  items: [],
  bun: null,
  count: {}
}

export const burgerConstructorReducer = (state = initialState, action: TBurgerConstructorActions): IBurgerConstructorState => {
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
        bun: action.data,
        count: {
          ...state.count,
          [action.data._id]: 1
        }
      }
    }
    case ADD_NOT_BUN: {
      const obj = {
        ...state,
        items: [...state.items],
        count: {...state.count}
      }

      obj.items.push({
        ...action.data,
        id: obj.items.length
      })

      obj.count = {
        ...state.count,
        [action.data._id]: state.count[action.data._id] ? ++state.count[action.data._id] : 1
      }

      return obj
    }
    case REMOVE_BUN: {
      const obj = {
        ...state,
        bun: null,
        count: {...state.count}
      }

      if (state.bun && state.bun._id) {
        obj.count = {
          ...state.count,
          [state.bun._id]: 0
        }
      }

      return obj
    }
    case REMOVE_NOT_BUN: {
      const obj = {
        ...state,
        count: {...state.count}
      }

      obj.items = obj.items.filter(item => item.id !== action.id)
      obj.items = obj.items.map((item, index) => {
        item.id = index

        return item
      })
      obj.count = {
        ...state.count,
        [action._id]: --state.count[action._id]
      }

      return obj
    }
    case CLEAR_CONSTRUCTOR: {
      return initialState
    }
    default: {
      return state
    }
  }
}
