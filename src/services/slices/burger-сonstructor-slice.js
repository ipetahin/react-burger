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
          return { ...state, bun: action.payload };
        default:
          return { ...state, ingredients: [...state.ingredients, { ...action.payload, id: nanoid() }] };
      }
    },
    remove: (state, action) => ({ ...state, ingredients: [...state.ingredients.filter((ingredient) => ingredient.id !== action.payload.id)] }),
  },
});

export const { add, remove } = burgerConstructorSlice.actions;

export default burgerConstructorSlice;
