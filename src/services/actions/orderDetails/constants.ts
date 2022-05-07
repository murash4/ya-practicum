export const SET_ORDER_DETAILS_LOADING: 'SET_ORDER_DETAILS_LOADING' = 'SET_ORDER_DETAILS_LOADING'
export const SET_ORDER_DETAILS: 'SET_ORDER_DETAILS' = 'SET_ORDER_DETAILS'
export const SET_ORDER_DETAILS_ERROR: 'SET_ORDER_DETAILS_ERROR' = 'SET_ORDER_DETAILS_ERROR'
export const CLEAR_ORDER_DETAILS_ERROR : 'CLEAR_ORDER_DETAILS_ERROR'= 'CLEAR_ORDER_DETAILS_ERROR'

interface ISetOrderDetailsLoading {
  readonly type: typeof SET_ORDER_DETAILS_LOADING
  readonly value: boolean
}

export interface IOrderDetailsData {
  name: string
  order: {
    number: number
  }
  success: boolean
}

interface ISetOrderDetails {
  readonly type: typeof SET_ORDER_DETAILS
  readonly data: IOrderDetailsData
}

interface ISetOrderDetailsError {
  readonly type: typeof SET_ORDER_DETAILS_ERROR
}

interface IClearOrderDetailsError {
  readonly type: typeof CLEAR_ORDER_DETAILS_ERROR
}

export type TOrderDetailsActions =
  | ISetOrderDetailsLoading
  | ISetOrderDetails
  | ISetOrderDetailsError
  | IClearOrderDetailsError
