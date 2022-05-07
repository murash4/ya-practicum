import { combineReducers } from 'redux'
import { ingredientsReducer } from './ingredients'
import { ingredientDetailsReducer } from './ingredientDetails'
import { orderDetailsReducer } from './orderDetails'
import { burgerConstructorReducer } from './burgerConstructor'
import { userReducer } from './user'

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  ingredientDetails: ingredientDetailsReducer,
  orderDetails: orderDetailsReducer,
  burgerConstructor: burgerConstructorReducer,
  user: userReducer
})
