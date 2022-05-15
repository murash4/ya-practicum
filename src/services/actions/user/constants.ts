export const SET_USER_LOADING: 'SET_USER_LOADING' = 'SET_USER_LOADING'
export const SET_USER_DATA: 'SET_USER_DATA' = 'SET_USER_DATA'
export const CLEAR_USER_DATA: 'CLEAR_USER_DATA' = 'CLEAR_USER_DATA'
export const SET_USER_DATA_ERROR: 'SET_USER_DATA_ERROR' = 'SET_USER_DATA_ERROR'
export const CLEAR_USER_DATA_ERROR: 'CLEAR_USER_DATA_ERROR' = 'CLEAR_USER_DATA_ERROR'
export const SET_USER_MESSAGE: 'SET_USER_MESSAGE' = 'SET_USER_MESSAGE'

interface ISetUserLoadingAction {
  readonly type: typeof SET_USER_LOADING
  readonly value: boolean
}

export interface IUserData {
  email: string
  name: string
}

interface ISetUserDataAction {
  readonly type: typeof SET_USER_DATA
  readonly data: IUserData
}

interface IClearUserDataAction {
  readonly type: typeof CLEAR_USER_DATA
}

interface ISetUserDataErrorAction {
  readonly type: typeof SET_USER_DATA_ERROR
}

interface IClearUserDataErrorAction {
  readonly type: typeof CLEAR_USER_DATA_ERROR
}

interface ISetUserMessageAction {
  readonly type: typeof SET_USER_MESSAGE
  readonly data: string
}

export type TUserActions =
  | ISetUserLoadingAction
  | ISetUserDataAction
  | IClearUserDataAction
  | ISetUserDataErrorAction
  | IClearUserDataErrorAction
  | ISetUserMessageAction
