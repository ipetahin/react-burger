import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { requestSendOrder } from '../../utils/api';
import { OrderDetailsStore } from '../../types/store';

const initialState = { data: null, isLoading: false, isError: false } satisfies OrderDetailsStore as OrderDetailsStore;

export const sendOrder = createAsyncThunk('orderDetails/sendOrder', requestSendOrder);

const orderDetailsSlice = createSlice({
  name: 'orderDetails',
  initialState,
  reducers: {
    clearOrder: (state) => ({ ...state, isLoading: false, isError: false, data: null }),
  },
  extraReducers: (builder) => {
    builder.addCase(sendOrder.pending, (state) => ({ ...state, isLoading: true, isError: false, data: null }));
    builder.addCase(sendOrder.fulfilled, (state, action) => ({ ...state, isLoading: false, isError: false, data: action.payload }));
    builder.addCase(sendOrder.rejected, (state) => ({ ...state, isLoading: false, isError: true, data: null }));
  },
});

export const { clearOrder } = orderDetailsSlice.actions;

type orderDetailsActionCreators = typeof orderDetailsSlice.actions;
export type orderDetailsActions = ReturnType<orderDetailsActionCreators[keyof orderDetailsActionCreators]>;

export default orderDetailsSlice;
