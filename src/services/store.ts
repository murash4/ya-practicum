import {
  TypedUseSelectorHook,
  useSelector as useSelectorHook,
  useDispatch as useDispatchHook
} from 'react-redux'
import { rootReducer } from './reducers'
import { store } from '../index'

import { Action, ActionCreator } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { TBurgerConstructorActions } from './actions/burgerConstructor/constants'
import { TIngredientDetailsActions } from './actions/ingredientDetails'
import { TIngredientsActions } from './actions/ingredients/constants'
import { TOrderDetailsActions } from './actions/orderDetails/constants'
import { TUserActions } from './actions/user/constants'
import { TWsOrdersActions } from './actions/wsOrders'
import { TWsUserOrdersActions } from './actions/wsUserOrders'

export type TRootState = ReturnType<typeof rootReducer>

export type TApplicationActions =
  | TBurgerConstructorActions
  | TIngredientDetailsActions
  | TIngredientsActions
  | TOrderDetailsActions
  | TUserActions
  | TWsOrdersActions
  | TWsUserOrdersActions

export const useSelector: TypedUseSelectorHook<TRootState> = useSelectorHook

export type TThunk<TReturn = void> = ActionCreator<ThunkAction<TReturn, Action, TRootState, TApplicationActions>>
export type TDispatchWithThunk = typeof store.dispatch | TThunk
export const useDispatch = () => useDispatchHook<TDispatchWithThunk>()
