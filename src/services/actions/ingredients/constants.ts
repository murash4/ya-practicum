import { IFetchIngredients } from '../../../utils/types'

export const SET_INGREDIENTS_LOADING: 'SET_INGREDIENTS_LOADING' = 'SET_INGREDIENTS_LOADING'
export const SET_INGREDIENTS: 'SET_INGREDIENTS' = 'SET_INGREDIENTS'

export interface ISetIngredientsLoading {
  readonly type: typeof SET_INGREDIENTS_LOADING
  value: boolean
}

export interface ISetIngredients {
  readonly type: typeof SET_INGREDIENTS
  data: Array<IFetchIngredients>
}

export type TIngredientsActions =
  | ISetIngredientsLoading
  | ISetIngredients
