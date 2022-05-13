import { IWsOrders } from '../../../middleware/socketMiddleware'

export const WS_ORDERS_CONNECTION_START: 'WS_ORDERS_CONNECTION_START' = 'WS_ORDERS_CONNECTION_START'
export const WS_ORDERS_CONNECTION_SUCCESS: 'WS_ORDERS_CONNECTION_SUCCESS' = 'WS_ORDERS_CONNECTION_SUCCESS'
export const WS_ORDERS_CONNECTION_ERROR: 'WS_ORDERS_CONNECTION_ERROR' = 'WS_ORDERS_CONNECTION_ERROR'
export const WS_ORDERS_CLOSE_CONNECTION: 'WS_ORDERS_CLOSE_CONNECTION' = 'WS_ORDERS_CLOSE_CONNECTION'
export const WS_ORDERS_CONNECTION_CLOSED: 'WS_ORDERS_CONNECTION_CLOSED' = 'WS_ORDERS_CONNECTION_CLOSED'
export const WS_ORDERS_GET_MESSAGE: 'WS_ORDERS_GET_MESSAGE' = 'WS_ORDERS_GET_MESSAGE'
export const WS_ORDERS_SEND_MESSAGE: 'WS_ORDERS_SEND_MESSAGE' = 'WS_ORDERS_SEND_MESSAGE'

export const wsActions = {
  wsInit: WS_ORDERS_CONNECTION_START,
  wsSendMessage: WS_ORDERS_SEND_MESSAGE,
  onOpen: WS_ORDERS_CONNECTION_SUCCESS,
  close: WS_ORDERS_CLOSE_CONNECTION,
  onClose: WS_ORDERS_CONNECTION_CLOSED,
  onError: WS_ORDERS_CONNECTION_ERROR,
  onMessage: WS_ORDERS_GET_MESSAGE
}

interface IWsOrdersConnectionStart {
  readonly type: typeof WS_ORDERS_CONNECTION_START
}

interface IWsOrdersConnectionSuccess {
  readonly type: typeof WS_ORDERS_CONNECTION_SUCCESS
}

interface IWsOrdersConnectionError {
  readonly type: typeof WS_ORDERS_CONNECTION_ERROR
  readonly payload: string
}

interface IWsOrdersConnectionClosed {
  readonly type: typeof WS_ORDERS_CONNECTION_CLOSED
}

interface IWsOrdersGetMessage {
  readonly type: typeof WS_ORDERS_GET_MESSAGE
  readonly payload: IWsOrders
}

interface IWsOrdersSendMessage {
  readonly type: typeof WS_ORDERS_SEND_MESSAGE
}

export type TWsOrdersActions =
  | IWsOrdersConnectionStart
  | IWsOrdersConnectionSuccess
  | IWsOrdersConnectionError
  | IWsOrdersConnectionClosed
  | IWsOrdersGetMessage
  | IWsOrdersSendMessage
