export interface IIngredient {
  id?: number
  _id: string
  name: string
  type: string
  proteins: number
  fat: number
  carbohydrates: number
  calories: number
  price: number
  image: string
  image_mobile: string
  image_large: string
  __v: number
}

export type TTypeName = 'bun' | 'main' | 'sauce'

export type TTypesName = {
  [TTypeName: string]: string
}

export type TLocation = {
  hash: string
  key: string
  pathname: string
  search: string
  state: { from: string } | null
}

export type TTypePassword = 'text' | 'password'
