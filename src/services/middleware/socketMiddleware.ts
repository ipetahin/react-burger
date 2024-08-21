import { Middleware, MiddlewareAPI } from 'redux';
import { ActionCreatorWithoutPayload, ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { refreshToken } from '../../utils/api';

export type wsActionTypes = {
  wsConnect: ActionCreatorWithPayload<string>;
  wsDisconnect: ActionCreatorWithoutPayload;
  wsSendMessage?: ActionCreatorWithPayload<any>;
  onOpen: ActionCreatorWithoutPayload;
  onClose: ActionCreatorWithoutPayload;
  onError: ActionCreatorWithPayload<string>;
  onMessage: ActionCreatorWithPayload<any>;
};

export const socketMiddleware = (wsActions: wsActionTypes): Middleware<{}, RootState> => {
  return (store: MiddlewareAPI) => {
    let socket: WebSocket | null = null;
    let url: string | null = null;
    let closing: boolean = false;

    return (next) => (action) => {
      const { wsConnect, wsDisconnect, onOpen, onClose, onError, onMessage } = wsActions;
      const { dispatch } = store;

      if (wsConnect.match(action)) {
        url = action.payload;
        socket = new WebSocket(url);
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

          if (parsedData.message === 'Invalid or missing token') {
            refreshToken().then((refreshData) => {
              const wssUrl = new URL(url!);
              wssUrl.searchParams.set('token', refreshData.accessToken.replace('Bearer ', ''));
              dispatch(wsConnect(wssUrl.toString()));
            });
          } else {
            dispatch(onMessage(parsedData));
          }
        };

        socket.onclose = () => {
          if (closing) {
            dispatch(onClose());
          } else {
            dispatch(wsConnect(url!));
          }
        };

        if (wsDisconnect.match(action)) {
          closing = true;
          socket.close();
        }
      }
      next(action);
    };
  };
};
