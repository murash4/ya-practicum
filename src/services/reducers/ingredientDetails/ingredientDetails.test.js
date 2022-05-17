import { ingredientDetailsReducer } from './index'
import * as types from '../../actions/ingredientDetails'

describe('Проверка работы редюсера ingredientDetailsReducer', () => {
  it('по-умолчанию возвращает дефолтное состояние', () => {
    expect(ingredientDetailsReducer(undefined, {})).toEqual(null)
  })

  it('проверка работы экшена SET_INGREDIENT_DETAILS', () => {
    const data = { _id: '4352345' }

    expect(
      ingredientDetailsReducer(undefined, {
        type: types.SET_INGREDIENT_DETAILS,
        data
      })
    ).toEqual(data)
  })

  it('проверка работы экшена CLEAR_INGREDIENT_DETAILS', () => {
    expect(
      ingredientDetailsReducer(undefined, {
        type: types.CLEAR_INGREDIENT_DETAILS
      })
    ).toEqual(null)
  })
})
