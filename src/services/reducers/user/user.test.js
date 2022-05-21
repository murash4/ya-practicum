import { userReducer, initialState } from './index'
import * as types from '../../actions/user/constants'

describe('Проверка работы редюсера userReducer', () => {
  it('по-умолчанию возвращает дефолтное состояние', () => {
    expect(userReducer(undefined, {})).toEqual(initialState)
  })

  it('проверка работы экшена CLEAR_USER_DATA_ERROR', () => {
    const state = { ...initialState, error: true }

    expect(
      userReducer(state, {
        type: types.CLEAR_USER_DATA_ERROR
      })
    ).toEqual({
      ...initialState,
      error: false
    })
  })

  it('проверка работы экшена SET_USER_LOADING', () => {
    expect(
      userReducer(undefined, {
        type: types.SET_USER_LOADING,
        value: true
      })
    ).toEqual({
      ...initialState,
      isLoading: true
    })
  })

  it('проверка работы экшена SET_USER_DATA', () => {
    const data = {
      email: 'admin@mail.ru',
      name: 'admin'
    }

    expect(
      userReducer(undefined, {
        type: types.SET_USER_DATA,
        data
      })
    ).toEqual({
      ...initialState,
      data
    })
  })

  it('проверка работы экшена CLEAR_USER_DATA', () => {
    const state = {
      ...initialState,
      email: 'admin@mail.ru',
      name: 'admin'
    }

    expect(
      userReducer(state, {
        type: types.CLEAR_USER_DATA
      })
    ).toEqual({
      ...initialState
    })
  })

  it('проверка работы экшена SET_USER_DATA_ERROR', () => {
    expect(
      userReducer(undefined, {
        type: types.SET_USER_DATA_ERROR
      })
    ).toEqual({
      ...initialState,
      error: true
    })
  })

  it('проверка работы экшена SET_USER_MESSAGE', () => {
    const message = 'message'
    expect(
      userReducer(undefined, {
        type: types.SET_USER_MESSAGE,
        data: message
      })
    ).toEqual({
      ...initialState,
      responseMessage: message
    })
  })
})
