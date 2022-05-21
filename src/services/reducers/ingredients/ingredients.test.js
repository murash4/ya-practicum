import { ingredientsReducer, initialState } from './index'
import * as types from '../../actions/ingredients/constants'

describe('Проверка работы редюсера ingredientsReducer', () => {
  it('по-умолчанию возвращает дефолтное состояние', () => {
    expect(ingredientsReducer(undefined, {})).toEqual(initialState)
  })

  it('проверка работы экшена SET_INGREDIENTS', () => {
    const data = [{ _id: '4352345' }]

    expect(
      ingredientsReducer(undefined, {
        type: types.SET_INGREDIENTS,
        data
      })
    ).toEqual({
      ...initialState,
      data
    })
  })

  it('проверка работы экшена SET_INGREDIENTS_LOADING', () => {
    expect(
      ingredientsReducer(undefined, {
        type: types.SET_INGREDIENTS_LOADING,
        value: true
      })
    ).toEqual({
      ...initialState,
      isLoading: true
    })
  })
})
