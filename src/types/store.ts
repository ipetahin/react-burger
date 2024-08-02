import { ServerOrderResponse } from './api';
import { ConstructorIngredient, ConstructorIngredients, Ingredient, Ingredients, User } from './common';

export interface BurgerConstructorStore {
  bun: ConstructorIngredient | null;
  ingredients: ConstructorIngredients;
}

export interface UserStore {
  user: User | null;
  isAuthChecked: boolean;
}

export interface BurgerIngredientStore {
  data: Ingredients | null;
  isLoading: boolean;
  isError: boolean;
}

export type IngredientDetailsStore = Ingredient | null;

export interface OrderDetailsStore {
  data: ServerOrderResponse | null;
  isLoading: boolean;
  isError: boolean;
}
