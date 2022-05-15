import {
  SET_ORDER_DETAILS_LOADING,
  SET_ORDER_DETAILS,
  CLEAR_ORDER_DETAILS_ERROR,
  SET_ORDER_DETAILS_ERROR
} from './constants'
import { apiUrl } from '../../../utils/api'
import { checkResponse } from '../../../helpers/api'
import { cookie } from '../../../utils/cookie'
import { TDispatchWithThunk } from '../../store'
import { IOrderDetailsState } from '../../reducers/orderDetails'
import { ThunkAction } from 'redux-thunk'
import { TUserActions } from '../user/constants'

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  IOrderDetailsState,
  unknown,
  TUserActions
>

export function fetchOrder (ingredients: string): AppThunk<Promise<void>> {
  return async (dispatch: TDispatchWithThunk) => {
    dispatch({
      type: CLEAR_ORDER_DETAILS_ERROR
    })
    dispatch({
      type: SET_ORDER_DETAILS_LOADING,
      value: true
    })

    try {
      const parsedData = await fetch(`${apiUrl}orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${cookie.get('token')}`
        },
        body: ingredients
      })
        .then(checkResponse)

      dispatch({
        type: SET_ORDER_DETAILS,
        data: parsedData
      })
    } catch (e) {
      console.log('Ошибка запроса к api: ', e)
      dispatch({
        type: SET_ORDER_DETAILS_ERROR
      })
    } finally {
      dispatch({
        type: SET_ORDER_DETAILS_LOADING,
        value: false
      })
    }
  }
}
