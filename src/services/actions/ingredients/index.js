import { SET_LOADING, SET_INGREDIENTS} from './constants'
import { apiUrl } from '../../../utils/api'
import { checkResponse } from '../../../helpers/api'

export function fetchIngredients () {
  return async dispatch => {
    dispatch({
      type: SET_LOADING,
      value: true
    })

    // Получаение и запись списка ингредиентов в state
    try {
      const result = await fetch(`${apiUrl}ingredients`)
      const parsedData = await checkResponse(result)

      dispatch({
        type: SET_INGREDIENTS,
        data: parsedData.data
      })
    } catch (e) {
      console.log('Ошибка запроса к api: ', e)
    } finally {
      dispatch({
        type: SET_LOADING,
        value: false
      })
    }
  }
}
