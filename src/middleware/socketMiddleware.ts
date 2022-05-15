import type { Middleware, MiddlewareAPI } from 'redux'
import { Dispatch } from 'redux'
import type { TWsOrdersState } from '../services/reducers/wsOrders'
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
  accessToken?: string
}

export const socketMiddleware = (wsUrl: string, wsActions: Record<string, string>): Middleware => {
  return ((store: MiddlewareAPI<Dispatch, TWsOrdersState>) => {
    let socket: WebSocket | null = null
    let accessToken
    const { wsInit, wsSendMessage, onOpen, close, onClose, onError, onMessage } = wsActions

    return next => (action: IWsOrdersActions) => {
      const { dispatch } = store
      const { type, payload } = action

      if (type === wsInit) {
        // объект класса WebSocket
        accessToken = action.accessToken

        const query = accessToken ? `?token=${accessToken}` : ''
        const url = accessToken ? wsUrl : `${wsUrl}/all`

        socket = new WebSocket(`${url}${query}`)
      }

      if (socket) {
        // функция, которая вызывается при открытии сокета
        socket.onopen = event => {
          dispatch({
            type: onOpen,
            payload: event
          })
        }

        // функция, которая вызывается при ошибке соединения
        socket.onerror = event => {
          dispatch({
            type: onError,
            payload: event
          })
        }

        // функция, которая вызывается при получения события от сервера
        socket.onmessage = ({ data }) => {
          dispatch({
            type: onMessage,
            payload: JSON.parse(data)
          })
        }
        // функция, которая вызывается при закрытии соединения
        socket.onclose = event => {
          dispatch({
            type: onClose,
            payload: event
          })
        }

        if (type === close) {
          socket.close()
        }

        if (type === wsSendMessage) {
          // функция для отправки сообщения на сервер
          socket.send(JSON.stringify(payload))
        }
      }

      next(action)
    }
  }) as Middleware
}
