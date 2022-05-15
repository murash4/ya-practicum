import { SET_INGREDIENTS_LOADING, SET_INGREDIENTS} from './constants'
import { IIngredientsState } from '../../reducers/ingredients'
import { apiUrl } from '../../../utils/api'
import { checkResponse } from '../../../helpers/api'
import { IFetchIngredients } from '../../../utils/types'
import { TDispatchWithThunk } from '../../store'
import { ThunkAction } from 'redux-thunk'
import { TUserActions } from '../user/constants'

interface IIngredientsResponse {
  data: Array<IFetchIngredients>
}

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  IIngredientsState,
  unknown,
  TUserActions
>

export function fetchIngredients (): AppThunk<Promise<void>> {
  return async (dispatch: TDispatchWithThunk) => {
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
