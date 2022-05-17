import { orderDetailsReducer, initialState } from './index'
import * as types from '../../actions/orderDetails/constants'

describe('Проверка работы редюсера orderDetailsReducer', () => {
  it('по-умолчанию возвращает дефолтное состояние', () => {
    expect(orderDetailsReducer(undefined, {})).toEqual(initialState)
  })

  it('проверка работы экшена CLEAR_ORDER_DETAILS_ERROR', () => {
    const state = { ...initialState, error: true }

    expect(
      orderDetailsReducer(state, {
        type: types.CLEAR_ORDER_DETAILS_ERROR
      })
    ).toEqual({
      ...initialState,
      error: false
    })
  })

  it('проверка работы экшена SET_ORDER_DETAILS_LOADING', () => {
    expect(
      orderDetailsReducer(undefined, {
        type: types.SET_ORDER_DETAILS_LOADING,
        value: true
      })
    ).toEqual({
      ...initialState,
      isLoading: true
    })
  })

  it('проверка работы экшена SET_ORDER_DETAILS', () => {
    const data = { _id: '2345234' }

    expect(
      orderDetailsReducer(undefined, {
        type: types.SET_ORDER_DETAILS,
        data
      })
    ).toEqual({
      ...initialState,
      data
    })
  })

  it('проверка работы экшена SET_ORDER_DETAILS_ERROR', () => {
    expect(
      orderDetailsReducer(undefined, {
        type: types.SET_ORDER_DETAILS_ERROR
      })
    ).toEqual({
      ...initialState,
      error: true
    })
  })
})
