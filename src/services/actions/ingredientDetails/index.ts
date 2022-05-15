import { IIngredient } from '../../../utils/types'

export const SET_INGREDIENT_DETAILS: 'SET_INGREDIENT_DETAILS' = 'SET_INGREDIENT_DETAILS'
export const CLEAR_INGREDIENT_DETAILS: 'CLEAR_INGREDIENT_DETAILS' = 'CLEAR_INGREDIENT_DETAILS'

export interface ISetIngredientDetailsAction {
  readonly type: typeof SET_INGREDIENT_DETAILS
  readonly data: IIngredient
}

export interface IClearIngredientDetailsAction {
  readonly type: typeof CLEAR_INGREDIENT_DETAILS
}

export type TIngredientDetailsActions =
  | ISetIngredientDetailsAction
  | IClearIngredientDetailsAction
