import { IWsUserOrders } from '../../../middleware/userSocketMiddleware'

export const WS_USER_ORDERS_CONNECTION_START: 'WS_USER_ORDERS_CONNECTION_START' = 'WS_USER_ORDERS_CONNECTION_START'
export const WS_USER_ORDERS_CONNECTION_SUCCESS: 'WS_USER_ORDERS_CONNECTION_SUCCESS' = 'WS_USER_ORDERS_CONNECTION_SUCCESS'
export const WS_USER_ORDERS_CONNECTION_ERROR: 'WS_USER_ORDERS_CONNECTION_ERROR' = 'WS_USER_ORDERS_CONNECTION_ERROR'
export const WS_USER_ORDERS_CONNECTION_CLOSED: 'WS_USER_ORDERS_CONNECTION_CLOSED' = 'WS_USER_ORDERS_CONNECTION_CLOSED'
export const WS_USER_ORDERS_GET_MESSAGE: 'WS_USER_ORDERS_GET_MESSAGE' = 'WS_USER_ORDERS_GET_MESSAGE'
export const WS_USER_ORDERS_SEND_MESSAGE: 'WS_USER_ORDERS_SEND_MESSAGE' = 'WS_USER_ORDERS_SEND_MESSAGE'

interface IWsUserOrdersConnectionStart {
  readonly type: typeof WS_USER_ORDERS_CONNECTION_START
}

interface IWsUserOrdersConnectionSuccess {
  readonly type: typeof WS_USER_ORDERS_CONNECTION_SUCCESS
}

interface IWsUserOrdersConnectionError {
  readonly type: typeof WS_USER_ORDERS_CONNECTION_ERROR
  readonly payload: string
}

interface IWsUserOrdersConnectionClosed {
  readonly type: typeof WS_USER_ORDERS_CONNECTION_CLOSED
}

interface IWsUserOrdersGetMessage {
  readonly type: typeof WS_USER_ORDERS_GET_MESSAGE
  readonly payload: IWsUserOrders
}

interface IWsUserOrdersSendMessage {
  readonly type: typeof WS_USER_ORDERS_SEND_MESSAGE
}

export type TWsUserOrdersActions =
  | IWsUserOrdersConnectionStart
  | IWsUserOrdersConnectionSuccess
  | IWsUserOrdersConnectionError
  | IWsUserOrdersConnectionClosed
  | IWsUserOrdersGetMessage
  | IWsUserOrdersSendMessage
