import { combineReducers } from 'redux'
import { ingredientsReducer } from './ingredients'
import { ingredientDetailsReducer } from './ingredientDetails'

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  ingredientDetails: ingredientDetailsReducer
})
