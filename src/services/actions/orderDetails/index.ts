import {
  SET_ORDER_DETAILS_LOADING,
  SET_ORDER_DETAILS,
  CLEAR_ORDER_DETAILS_ERROR,
  SET_ORDER_DETAILS_ERROR
} from './constants'
import { apiUrl } from '../../../utils/api'
import { checkResponse } from '../../../helpers/api'
import { Dispatch } from 'redux'
import {cookie} from "../../../utils/cookie";

export function fetchOrder (ingredients: string) {
  return async (dispatch: Dispatch) => {
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
