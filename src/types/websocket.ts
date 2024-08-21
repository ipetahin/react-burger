import { wsClose, wsError, wsMessage, wsOpen } from '../services/slices/websocket-slice';
import { Orders } from './common';

export interface WSOrderResponse {
  success: boolean;
  orders: Orders;
  total: number;
  totalToday: number;
}

export enum WebsocketStatus {
  OPENING = 'opening...',
  CLOSING = 'closing...',
  ONLINE = 'online',
  OFFLINE = 'offline',
}

export type wsOrdersActions = ReturnType<typeof wsOpen> | ReturnType<typeof wsClose> | ReturnType<typeof wsMessage> | ReturnType<typeof wsError>;
