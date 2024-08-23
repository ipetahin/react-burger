import { combineSlices, configureStore, ThunkDispatch } from '@reduxjs/toolkit';

import burgerIngredientsSlice from './slices/burger-ingredients-slice';
import burgerConstructorSlice, { burgerConstructorActions } from './slices/burger-сonstructor-slice';
import ingredientDetailsSlice, { ingredientDetailsActions } from './slices/ingredient-details-slice';
import orderDetailsSlice, { orderDetailsActions } from './slices/order-details-slice';
import userSlice from './slices/user-slice';
import ordersSlice, { webSocketActions } from './slices/websocket-slice';
import { socketMiddleware } from './middleware/socketMiddleware';
import { wsActions } from './slices/websocket-slice';
import { WebsocketStatus } from '../types/websocket';

export const rootReducer = combineSlices(burgerIngredientsSlice, burgerConstructorSlice, ingredientDetailsSlice, orderDetailsSlice, userSlice, ordersSlice);

const preloadedState = {
  burgerIngredients: { data: null, isLoading: false, isError: false },
  burgerConstructor: { bun: null, ingredients: [] },
  ingredientDetails: { data: null },
  orderDetails: { data: null, isLoading: false, isError: false },
  user: { user: null, isAuthChecked: false },
  webSocket: { status: WebsocketStatus.OFFLINE, orders: [], total: 0, totalToday: 0, error: '' },
};

const wsUrl: string = 'wss://norma.nomoreparties.space/';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(socketMiddleware(wsUrl, wsActions)),
  devTools: process.env.NODE_ENV !== 'production',
  preloadedState,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppActions = burgerConstructorActions | ingredientDetailsActions | orderDetailsActions | webSocketActions;
export type AppDispatch = ThunkDispatch<RootState, unknown, AppActions>;
