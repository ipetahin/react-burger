import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { login, logout } from '../../utils/api';

export const loginUser = createAsyncThunk('userSlice/login', async (data) => {
  const res = await login(data);
  localStorage.setItem('accessToken', res.accessToken);
  localStorage.setItem('refreshToken', res.refreshToken);
  return res.user;
});

export const logoutUser = createAsyncThunk('userSlice/logout', async () => {
  await logout();
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
});

const initialState = { user: null, isAuthChecked: false };

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthChecked: (state, action) => {
      state.isAuthChecked = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthChecked = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export const { setAuthChecked, setUser } = userSlice.actions;

export default userSlice;
