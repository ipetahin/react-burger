import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchIngredients } from '../../utils/api';

export const getIngredients = createAsyncThunk('burgerIngredients/getIngredients', async () => {
  const response = await fetchIngredients();
  return response;
});

const initialState = { data: null, isLoading: false, isError: false };

const burgerIngredientsSlice = createSlice({
  name: 'burgerIngredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getIngredients.pending, (state) => ({ ...state, isLoading: true, isError: false }));
    builder.addCase(getIngredients.fulfilled, (state, action) => ({ ...state, isLoading: false, isError: false, data: action.payload }));
    builder.addCase(getIngredients.rejected, (state) => ({ ...state, isLoading: false, isError: true, data: null }));
  },
});

export default burgerIngredientsSlice;
