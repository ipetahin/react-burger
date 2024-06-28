import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { postOrder } from '../../utils/api';

const initialState = { data: null, isLoading: false, isError: false };

export const sendOrder = createAsyncThunk('orderDetails/sendOrder', async (data) => {
  const response = await postOrder(data);
  return response;
});

const orderDetailsSlice = createSlice({
  name: 'orderDetails',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(sendOrder.pending, (state) => ({ ...state, isLoading: true, isError: false, data: null }));
    builder.addCase(sendOrder.fulfilled, (state, action) => ({ ...state, isLoading: false, isError: false, data: action.payload }));
    builder.addCase(sendOrder.rejected, (state) => ({ ...state, isLoading: false, isError: true, data: null }));
  },
});

export default orderDetailsSlice;
