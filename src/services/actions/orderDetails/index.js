import { SET_LOADING, SET_ORDER, CLEAR_ERROR, SET_ERROR } from './constants'
import { apiUrl } from '../../../utils/api'
import { checkResponse } from '../../../helpers/api'

export function fetchOrder (ingredients) {
  return async dispatch => {
    dispatch({
      type: CLEAR_ERROR
    })
    dispatch({
      type: SET_LOADING,
      value: true
    })

    try {
      const result = await fetch(`${apiUrl}orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: ingredients
      })
      const parsedData = await checkResponse(result)

      dispatch({
        type: SET_ORDER,
        data: parsedData
      })
    } catch (e) {
      console.log('Ошибка запроса к api: ', e)
      dispatch({
        type: SET_ERROR
      })
    } finally {
      dispatch({
        type: SET_LOADING,
        value: false
      })
    }
  }
}
