import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

const initialState = { bun: null, ingredients: [] };

const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    add: (state, action) => {
      switch (action.payload.type) {
        case 'bun':
          return state = { ...state, bun: action.payload };
        default:
          return state = { ...state, ingredients: [...state.ingredients, {...action.payload, id: nanoid()}] };
      }
    },
  },
});

export const { add } = burgerConstructorSlice.actions;

export default burgerConstructorSlice;
