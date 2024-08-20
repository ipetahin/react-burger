import { Middleware, MiddlewareAPI } from 'redux';
import { ActionCreatorWithoutPayload, ActionCreatorWithPayload } from '@reduxjs/toolkit';

export type wsActionTypes = {
  wsConnect: ActionCreatorWithPayload<string>;
  wsDisconnect: ActionCreatorWithoutPayload;
  wsSendMessage?: ActionCreatorWithPayload<any>;
  onOpen: ActionCreatorWithoutPayload;
  onClose: ActionCreatorWithoutPayload;
  onError: ActionCreatorWithPayload<string>;
  onMessage: ActionCreatorWithPayload<any>;
};

export const socketMiddleware = (wsActions: wsActionTypes): Middleware => {
  return ((store: MiddlewareAPI) => {
    let socket: WebSocket | null = null;

    return (next) => (action) => {
      const { wsConnect, wsDisconnect, onOpen, onClose, onError, onMessage } = wsActions;
      const { dispatch } = store;
    
      if (wsConnect.match(action)) {
        const wsUrl = action.payload;
        socket = new WebSocket(wsUrl);
      }

      if (socket) {
        socket.onopen = () => {
          dispatch(onOpen());
        };

        socket.onerror = (event) => {
          dispatch(onError(event.type));
        };

        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          dispatch(onMessage(parsedData));
        };

        socket.onclose = () => {
          dispatch(onClose());
        };

        if (wsDisconnect.match(action)) {
          socket.close();
        }
      }
      next(action);
    };
  }) as Middleware;
};
