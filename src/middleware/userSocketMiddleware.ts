import type { Middleware, MiddlewareAPI } from 'redux'
import { Dispatch } from 'redux'
import type { TWsUserOrdersState } from '../services/reducers/wsUserOrders'
import {
  WS_USER_ORDERS_CONNECTION_START,
  WS_USER_ORDERS_CONNECTION_SUCCESS,
  WS_USER_ORDERS_CONNECTION_ERROR,
  WS_USER_ORDERS_GET_MESSAGE,
  WS_USER_ORDERS_CONNECTION_CLOSED,
  WS_USER_ORDERS_SEND_MESSAGE
} from '../services/actions/wsUserOrders'
import { TWsUserOrder } from '../services/reducers/wsUserOrders'

export interface IWsUserOrders {
  success: boolean
  orders: Array<TWsUserOrder>
  total: number
  totalToday: number
}

interface IWsUserOrdersActions {
  type: string
  payload?: IWsUserOrders | string
  accessToken?: string
}

export const userSocketMiddleware = (wsUrl: string): Middleware => {
  return ((store: MiddlewareAPI<Dispatch, TWsUserOrdersState>) => {
    let socket: WebSocket | null = null

    return next => (action: IWsUserOrdersActions) => {
      const { dispatch } = store
      const { type, payload } = action

      if (type === WS_USER_ORDERS_CONNECTION_START) {
        // объект класса WebSocket
        socket = new WebSocket(`${wsUrl}?token=${action.accessToken}`)
      }
      if (socket) {

        // функция, которая вызывается при открытии сокета
        socket.onopen = event => {
          dispatch({
            type: WS_USER_ORDERS_CONNECTION_SUCCESS,
            payload: event
          })
        }

        // функция, которая вызывается при ошибке соединения
        socket.onerror = event => {
          dispatch({
            type: WS_USER_ORDERS_CONNECTION_ERROR,
            payload: event
          })
        }

        // функция, которая вызывается при получения события от сервера
        socket.onmessage = ({ data }) => {
          dispatch({
            type: WS_USER_ORDERS_GET_MESSAGE,
            payload: JSON.parse(data)
          })
        }
        // функция, которая вызывается при закрытии соединения
        socket.onclose = event => {
          dispatch({
            type: WS_USER_ORDERS_CONNECTION_CLOSED,
            payload: event
          })
        }

        if (type === WS_USER_ORDERS_SEND_MESSAGE) {
          const message = payload
          // функция для отправки сообщения на сервер
          socket.send(JSON.stringify(message))
        }
      }

      next(action)
    }
  }) as Middleware
}
