import { createSlice } from '@reduxjs/toolkit';

const initialState = { data: null, isLoading: false, isError: false };

const burgerIngredientsSlice = createSlice({
  name: 'burgerIngredients',
  initialState,
  reducers: {
    request: (state) => ({ ...state, isLoading: true, isError: false }),
    success: (state, action) => ({ ...state, isLoading: false, isError: false, data: action.payload }),
    failure: (state) => ({ ...state, isLoading: false, isError: true, data: null }),
  },
});

export const { request, success, failure } = burgerIngredientsSlice.actions;

export default burgerIngredientsSlice;
