import { combineSlices, configureStore, ThunkDispatch } from '@reduxjs/toolkit';

import burgerIngredientsSlice from './slices/burger-ingredients-slice';
import burgerConstructorSlice, { burgerConstructorActions } from './slices/burger-сonstructor-slice';
import ingredientDetailsSlice, { ingredientDetailsActions } from './slices/ingredient-details-slice';
import orderDetailsSlice, { orderDetailsActions } from './slices/order-details-slice';
import userSlice from './slices/user-slice';

export const rootReducer = combineSlices(burgerIngredientsSlice, burgerConstructorSlice, ingredientDetailsSlice, orderDetailsSlice, userSlice);

const preloadedState = {
  burgerIngredients: { data: null, isLoading: false, isError: false },
  burgerConstructor: { bun: null, ingredients: [] },
  ingredientDetails: { data: null },
  orderDetails: { data: null, isLoading: false, isError: false },
  user: { user: null, isAuthChecked: false },
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== 'production',
  preloadedState,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppActions = burgerConstructorActions | ingredientDetailsActions | orderDetailsActions;
export type AppDispatch = ThunkDispatch<RootState, unknown, AppActions>;
