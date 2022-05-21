import {
  WS_ORDERS_CONNECTION_SUCCESS,
  WS_ORDERS_CONNECTION_ERROR,
  WS_ORDERS_CONNECTION_CLOSED,
  WS_ORDERS_GET_MESSAGE,
  TWsOrdersActions
} from '../../actions/wsOrders'

export type TWsOrder = {
  ingredients: Array<string>
  status: 'created' | 'pending' | 'done',
  name: string
  number: number
  createdAt: string
  updatedAt: string
  _id: string
}

export type TWsOrdersState = {
  wsConnected: boolean
  orders: Array<TWsOrder>
  error: string | null
  total: number
  totalToday: number
}

export const initialState: TWsOrdersState = {
  wsConnected: false,
  orders: [],
  error: null,
  total: 0,
  totalToday: 0
}

// Создадим редьюсер для WebSocket
export const wsOrdersReducer = (state = initialState, action: TWsOrdersActions): TWsOrdersState => {
  switch (action.type) {
    // Опишем обработку экшена с типом WS_ORDERS_CONNECTION_SUCCESS
    // Установим флаг wsConnected в состояние true
    case WS_ORDERS_CONNECTION_SUCCESS:
      return {
        ...state,
        error: null,
        wsConnected: true
      }

    // Опишем обработку экшена с типом WS_ORDERS_CONNECTION_ERROR
    // Установим флаг wsConnected в состояние false и передадим ошибку из action.payload
    case WS_ORDERS_CONNECTION_ERROR:
      return {
        ...state,
        error: action.payload,
        wsConnected: false
      }

    // Опишем обработку экшена с типом WS_ORDERS_CONNECTION_CLOSED, когда соединение закрывается
    // Установим флаг wsConnected в состояние false
    case WS_ORDERS_CONNECTION_CLOSED:
      return {
        ...state,
        error: null,
        wsConnected: false,
        total: 0,
        totalToday: 0
      }

    // Опишем обработку экшена с типом WS_ORDERS_GET_MESSAGE
    // Обработка происходит, когда с сервера возвращаются данные
    // В messages передадим данные, которые пришли с сервера
    case WS_ORDERS_GET_MESSAGE:
      return {
        ...state,
        error: null,
        orders: [...action.payload.orders],
        total: action.payload.total,
        totalToday: action.payload.totalToday
      }
    default:
      return state
  }
}
