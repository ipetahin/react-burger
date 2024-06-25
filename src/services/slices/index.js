import { combineSlices, configureStore } from '@reduxjs/toolkit';

import ingredientsSlice from './ingredients-slice';

const reducer = combineSlices(ingredientsSlice);

const preloadedState = {
  ingredients: { data: null, isLoading: false, isError: false },
  // burgerConstructor: { bun: null, ingredients: [] },
  // ingredientDetails: { data: null },
  // orderDetails: { data: null, isLoading: false, isError: false },
};

export default configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== 'production',
  preloadedState,
});
