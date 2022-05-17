import { burgerConstructorReducer, initialState } from './index'
import * as types from '../../actions/burgerConstructor/constants'

describe('Проверка работы редюсера burgerConstructorReducer', () => {
  it('по-умолчанию возвращает дефолтное состояние', () => {
    expect(burgerConstructorReducer(undefined, {})).toEqual(initialState)
  })

  it('проверка работы экшена SET_INGREDIENT', () => {
    const data = [
      { id: 0 },
      { id: 1 }
    ]

    expect(
      burgerConstructorReducer(undefined, {
        type: types.SET_INGREDIENT,
        data
      })
    ).toEqual({
      ...initialState,
      items: [...data]
    })
  })

  it('проверка работы экшена ADD_BUN', () => {
    const data = { id: 0 }

    expect(
      burgerConstructorReducer(undefined, {
        type: types.ADD_BUN,
        data
      })
    ).toEqual({
      ...initialState,
      bun: data,
      count: {
        ...initialState.count,
        [data._id]: 1
      }
    })
  })

  it('проверка работы экшена ADD_NOT_BUN', () => {
    const data = { _id: '0' }

    expect(
      burgerConstructorReducer(undefined, {
        type: types.ADD_NOT_BUN,
        data
      })
    ).toEqual({
      ...initialState,
      items: [{ ...data, id: 0 }],
      count: {
        [data._id]: 1
      }
    })
  })

  it('проверка работы экшена REMOVE_BUN', () => {
    const state = {
      ...initialState,
      bun: { id: 123 }
    }

    expect(
      burgerConstructorReducer(state, {
        type: types.REMOVE_BUN
      })
    ).toEqual({
      ...initialState
    })
  })

  it('проверка работы экшена REMOVE_NOT_BUN', () => {
    const state = {
      ...initialState,
      items: [{
        _id: '123',
        id: 0
      }, {
        _id: '5676',
        id: 1
      }],
      count: {
        '123': 1,
        '5676': 1
      }
    }

    expect(
      burgerConstructorReducer(state, {
        type: types.REMOVE_NOT_BUN,
        _id: '123',
        id: 0
      })
    ).toEqual({
      ...initialState,
      items: [{
        _id: '5676',
        id: 0
      }],
      count: {
        '123': 0,
        '5676': 1
      }
    })
  })

  it('проверка работы экшена CLEAR_CONSTRUCTOR', () => {
    const state = {
      ...initialState,
      items: [{
        _id: '123',
        id: 0
      }, {
        _id: '5676',
        id: 1
      }],
      count: {
        '123': 1,
        '5676': 1
      }
    }

    expect(
      burgerConstructorReducer(state, {
        type: types.CLEAR_CONSTRUCTOR
      })
    ).toEqual({
      ...initialState
    })
  })
})
