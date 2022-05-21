import { wsOrdersReducer, initialState } from './index'
import * as types from '../../actions/wsOrders'

describe('Проверка работы редюсера wsOrdersReducer', () => {
  it('по-умолчанию возвращает дефолтное состояние', () => {
    expect(wsOrdersReducer(undefined, {})).toEqual(initialState)
  })

  it('проверка работы экшена WS_ORDERS_CONNECTION_SUCCESS', () => {
    expect(
      wsOrdersReducer(undefined, {
        type: types.WS_ORDERS_CONNECTION_SUCCESS
      })
    ).toEqual({
      ...initialState,
      wsConnected: true
    })
  })

  it('проверка работы экшена WS_ORDERS_CONNECTION_ERROR', () => {
    const payload = 'payload'

    expect(
      wsOrdersReducer(undefined, {
        type: types.WS_ORDERS_CONNECTION_ERROR,
        payload: payload
      })
    ).toEqual({
      ...initialState,
      error: payload
    })
  })

  it('проверка работы экшена WS_ORDERS_CONNECTION_CLOSED', () => {
    const state = {
      wsConnected: true,
      orders: [{ number: 34523 }],
      error: null,
      total: 52345,
      totalToday: 123
    }

    expect(
      wsOrdersReducer(state, {
        type: types.WS_ORDERS_CONNECTION_CLOSED
      })
    ).toEqual({
      ...initialState,
      orders: state.orders
    })
  })

  it('проверка работы экшена WS_ORDERS_GET_MESSAGE', () => {
    const payload = {
      orders: [{ number: 34523 }],
      total: 1534,
      totalToday: 342
    }

    expect(
      wsOrdersReducer(undefined, {
        type: types.WS_ORDERS_GET_MESSAGE,
        payload: payload
      })
    ).toEqual({
      ...initialState,
      ...payload
    })
  })
})
