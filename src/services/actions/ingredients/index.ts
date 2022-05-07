import { SET_INGREDIENTS_LOADING, SET_INGREDIENTS} from './constants'
import { apiUrl } from '../../../utils/api'
import { checkResponse } from '../../../helpers/api'
import { Dispatch } from 'redux'
import { IFetchIngredients } from "../../../utils/types";

interface IIngredientsResponse {
  data: Array<IFetchIngredients>
}

export function fetchIngredients () {
  return async (dispatch: Dispatch) => {
    dispatch({
      type: SET_INGREDIENTS_LOADING,
      value: true
    })

    // Получаение и запись списка ингредиентов в state
    try {
      const parsedData = await fetch(`${apiUrl}ingredients`)
        .then(res => checkResponse<IIngredientsResponse>(res))

      dispatch({
        type: SET_INGREDIENTS,
        data: parsedData.data
      })
    } catch (e) {
      console.log('Ошибка запроса к api: ', e)
    } finally {
      dispatch({
        type: SET_INGREDIENTS_LOADING,
        value: false
      })
    }
  }
}
