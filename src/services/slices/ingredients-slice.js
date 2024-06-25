import { createSlice } from '@reduxjs/toolkit';

const initialState = { data: null, isLoading: false, isError: false };

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    success: (state, action) => (state = { ...state, isLoading: false, isError: false, data: action.payload }),
    loading: (state) => (state = { ...state, isLoading: true, isError: false }),
    error: (state) => (state = { ...state, isLoading: false, isError: true, data: null }),
  },
});

export const { loading, success, error } = ingredientsSlice.actions;

export default ingredientsSlice;
