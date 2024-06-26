import { combineSlices, configureStore } from '@reduxjs/toolkit';

import ingredientsSlice from './ingredients-slice';
import ingredientDetailsSlice from './ingredient-details-slice';

const rootReducer = combineSlices(ingredientsSlice, ingredientDetailsSlice);

const preloadedState = {
  ingredients: { data: null, isLoading: false, isError: false },
  // burgerConstructor: { bun: null, ingredients: [] },
  ingredientDetails: { data: null },
  // orderDetails: { data: null, isLoading: false, isError: false },
};

export default configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== 'production',
  preloadedState,
});
