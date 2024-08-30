import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { login, logout, register, requestUpdateUser, requestUser, requestUserAuth } from '../../utils/api';
import { UserStore } from '../../types/store';

export const loginUser = createAsyncThunk('user/login', login);
export const registerUser = createAsyncThunk('user/register', register);
export const logoutUser = createAsyncThunk('user/logout', logout);
export const getUser = createAsyncThunk('user/getUser', requestUser);
export const updateUser = createAsyncThunk('user/updateUser', requestUpdateUser);
export const checkUserAuth = createAsyncThunk('user/checkUserAuth', requestUserAuth);

export const initialState = { user: null, isAuthChecked: false } satisfies UserStore as UserStore;

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthChecked = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthChecked = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(checkUserAuth.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthChecked = true;
      })
      .addCase(checkUserAuth.rejected, (state) => {
        state.isAuthChecked = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});

export default userSlice;
