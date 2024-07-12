import { combineSlices, configureStore } from '@reduxjs/toolkit';

import burgerIngredientsSlice from './burger-ingredients-slice';
import burgerConstructorSlice from './burger-сonstructor-slice';
import ingredientDetailsSlice from './ingredient-details-slice';
import orderDetailsSlice from './order-details-slice';
import userSlice from './user-slice';

const rootReducer = combineSlices(burgerIngredientsSlice, burgerConstructorSlice, ingredientDetailsSlice, orderDetailsSlice, userSlice);

const preloadedState = {
  burgerIngredients: { data: null, isLoading: false, isError: false },
  burgerConstructor: { bun: null, ingredients: [] },
  ingredientDetails: { data: null },
  orderDetails: { data: null, isLoading: false, isError: false },
};

export default configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== 'production',
  preloadedState,
});
