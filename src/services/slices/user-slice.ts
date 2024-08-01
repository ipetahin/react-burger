import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { login, logout, register, requestUpdateUser, requestUser } from '../../utils/api';
import { FormData } from '../../types';

export const loginUser = createAsyncThunk('user/login', async (data: FormData) => {
  const res = await login(data);
  localStorage.setItem('accessToken', res.accessToken);
  localStorage.setItem('refreshToken', res.refreshToken);
  return res.user;
});

export const registerUser = createAsyncThunk('user/register', async (data: FormData) => {
  const res = await register(data);
  localStorage.setItem('accessToken', res.accessToken);
  localStorage.setItem('refreshToken', res.refreshToken);
  return res.user;
});

export const logoutUser = createAsyncThunk('user/logout', async () => {
  await logout();
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
});

export const getUser = createAsyncThunk('user/getUser', requestUser);

export const checkUserAuth = createAsyncThunk('user/checkUserAuth', async (_, thunkAPI) => {
  if (localStorage.getItem('accessToken')) {
    await thunkAPI
      .dispatch(getUser())
      .unwrap()
      .catch(() => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
      });
  }
});

export const updateUser = createAsyncThunk('user/updateUser', requestUpdateUser);

const initialState = { user: null, isAuthChecked: false };

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
        state.user = action.payload.user;
      })
      .addCase(checkUserAuth.fulfilled, (state) => {
        state.isAuthChecked = true;
      })
      .addCase(checkUserAuth.rejected, (state) => {
        state.isAuthChecked = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
      });
  },
});

export default userSlice;
