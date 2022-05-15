import { IIngredient } from '../../../utils/types'

export const ADD_BUN: 'ADD_BUN' = 'ADD_BUN'
export const ADD_NOT_BUN: 'ADD_NOT_BUN' = 'ADD_NOT_BUN'
export const REMOVE_BUN: 'REMOVE_BUN' = 'REMOVE_BUN'
export const REMOVE_NOT_BUN: 'REMOVE_NOT_BUN' = 'REMOVE_NOT_BUN'
export const SET_INGREDIENT: 'SET_INGREDIENT' = 'SET_INGREDIENT'
export const CLEAR_CONSTRUCTOR: 'CLEAR_CONSTRUCTOR' = 'CLEAR_CONSTRUCTOR'

interface IAddBun {
  readonly type: typeof ADD_BUN
  readonly data: IIngredient
}

interface IAddNotBun {
  readonly type: typeof ADD_NOT_BUN
  readonly data: IIngredient
}

interface IRemoveBun {
  readonly type: typeof REMOVE_BUN
  readonly _id: string
}

interface IRemoveNotBun {
  readonly type: typeof REMOVE_NOT_BUN
  readonly _id: string
  readonly id: number
}

interface ISetIngredient {
  readonly type: typeof SET_INGREDIENT
  readonly data: Array<IIngredient>
}

interface IClearConstructor {
  readonly type: typeof CLEAR_CONSTRUCTOR
}

export type TBurgerConstructorActions =
  | IAddBun
  | IAddNotBun
  | IRemoveBun
  | IRemoveNotBun
  | ISetIngredient
  | IClearConstructor
