import { wsClose, wsError, wsMessage, wsOpen } from '../services/slices/websocket-slice';

export interface WSOrderResponse {
  success: boolean;
  orders: WSOrders;
  total: number;
  totalToday: number;
}

export type WSOrders = WSOrder[];

export interface WSOrder {
  ingredients: string[];
  _id: string;
  status: 'done' | 'pending' | 'created';
  number: number;
  createdAt: string;
  updatedAt: string;
}

export enum WebsocketStatus {
  OPENING = 'opening...',
  CLOSING = 'closing...',
  ONLINE = 'online',
  OFFLINE = 'offline',
}

export type wsOrdersActions = ReturnType<typeof wsOpen> | ReturnType<typeof wsClose> | ReturnType<typeof wsMessage> | ReturnType<typeof wsError>;
