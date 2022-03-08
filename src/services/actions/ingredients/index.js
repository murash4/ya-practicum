import { IS_LOADING, SET_INGREDIENTS} from './constants'
import { apiUrl } from '../../../utils/api'

export function fetchIngredients () {
  return async dispatch => {
    dispatch({
      type: IS_LOADING,
      value: true
    })

    // Получаение и запись списка ингредиентов в state
    try {
      const result = await fetch(`${apiUrl}ingredients`)

      if (!result.ok) {
        throw new Error("статус не 'ok'")
      }

      const parsedData = await result.json()

      dispatch({
        type: SET_INGREDIENTS,
        data: parsedData.data
      })
    } catch (e) {
      console.log('Ошибка запроса к api: ', e)
    }

    dispatch({
      type: IS_LOADING,
      value: false
    })
  }
}
