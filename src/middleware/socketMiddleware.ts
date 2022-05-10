import type { Middleware, MiddlewareAPI } from 'redux'
import { Dispatch } from 'redux'
import type { TWsOrdersState } from '../services/reducers/wsOrders'
import {
  WS_ORDERS_CONNECTION_START,
  WS_ORDERS_CONNECTION_SUCCESS,
  WS_ORDERS_CONNECTION_ERROR,
  WS_ORDERS_GET_MESSAGE,
  WS_ORDERS_CONNECTION_CLOSED,
  WS_ORDERS_SEND_MESSAGE
} from '../services/actions/wsOrders'
import { TWsOrder } from '../services/reducers/wsOrders'

export interface IWsOrders {
  success: boolean
  orders: Array<TWsOrder>
  total: number
  totalToday: number
}

interface IWsOrdersActions {
  type: string
  payload?: IWsOrders | string
}

export const socketMiddleware = (wsUrl: string): Middleware => {
  return ((store: MiddlewareAPI<Dispatch, TWsOrdersState>) => {
    let socket: WebSocket | null = null;

    return next => (action: IWsOrdersActions) => {
      const { dispatch } = store
      const { type, payload } = action

      if (type === WS_ORDERS_CONNECTION_START) {
        // объект класса WebSocket
        socket = new WebSocket(wsUrl)
      }
      if (socket) {

        // функция, которая вызывается при открытии сокета
        socket.onopen = event => {
          dispatch({
            type: WS_ORDERS_CONNECTION_SUCCESS,
            payload: event
          })
        }

        // функция, которая вызывается при ошибке соединения
        socket.onerror = event => {
          dispatch({
            type: WS_ORDERS_CONNECTION_ERROR,
            payload: event
          })
        }

        // функция, которая вызывается при получения события от сервера
        socket.onmessage = ({ data }) => {
          dispatch({
            type: WS_ORDERS_GET_MESSAGE,
            payload: JSON.parse(data)
          })
        }
        // функция, которая вызывается при закрытии соединения
        socket.onclose = event => {
          dispatch({
            type: WS_ORDERS_CONNECTION_CLOSED,
            payload: event
          })
        }

        if (type === WS_ORDERS_SEND_MESSAGE) {
          const message = payload
          // функция для отправки сообщения на сервер
          socket.send(JSON.stringify(message))
        }
      }

      next(action)
    }
  }) as Middleware
}
