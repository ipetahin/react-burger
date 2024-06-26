import { createSlice } from '@reduxjs/toolkit';

const initialState = { data: null };

const ingredientDetailsSlice = createSlice({
  name: 'ingredientDetails',
  initialState,
  reducers: {
    set: (state, action) => (state = { ...state, data: action.payload }),
    reset: (state) => (state = { ...state, data: null }),
  },
});

export const { set, reset } = ingredientDetailsSlice.actions;

export default ingredientDetailsSlice;
