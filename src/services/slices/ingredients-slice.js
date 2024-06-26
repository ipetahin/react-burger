import { createSlice } from '@reduxjs/toolkit';

const initialState = { data: null, isLoading: false, isError: false };

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    request: (state) => (state = { ...state, isLoading: true, isError: false }),
    success: (state, action) => (state = { ...state, isLoading: false, isError: false, data: action.payload }),
    failure: (state) => (state = { ...state, isLoading: false, isError: true, data: null }),
  },
});

export const { request, success, failure } = ingredientsSlice.actions;

export default ingredientsSlice;
