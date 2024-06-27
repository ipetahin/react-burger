import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

const initialState = { bun: null, ingredients: [] };

const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    add: {
      reducer: (state, action) => (action.payload.type === 'bun' ? { ...state, bun: action.payload } : { ...state, ingredients: [...state.ingredients, action.payload] }),
      prepare: (ingredient) => ({ payload: { ...ingredient, id: nanoid() } }),
    },
    remove: (state, action) => ({ ...state, ingredients: [...state.ingredients.filter((ingredient) => ingredient.id !== action.payload.id)] }),
  },
});

export const { add, remove } = burgerConstructorSlice.actions;

export default burgerConstructorSlice;
