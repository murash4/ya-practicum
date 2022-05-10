import { combineReducers } from 'redux'
import { ingredientsReducer } from './ingredients'
import { ingredientDetailsReducer } from './ingredientDetails'
import { orderDetailsReducer } from './orderDetails'
import { burgerConstructorReducer } from './burgerConstructor'
import { userReducer } from './user'
import { wsOrdersReducer } from './wsOrders'
import { wsUserOrdersReducer } from './wsUserOrders'

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  ingredientDetails: ingredientDetailsReducer,
  orderDetails: orderDetailsReducer,
  burgerConstructor: burgerConstructorReducer,
  user: userReducer,
  wsOrders: wsOrdersReducer,
  wsUserOrders: wsUserOrdersReducer
})
