import { ServerOrderResponse } from './api';
import { ConstructorIngredient, ConstructorIngredients, Ingredient, Ingredients, User } from './common';

interface BurgerConstructorStore {
  bun: ConstructorIngredient | null;
  ingredients: ConstructorIngredients;
}

interface UserStore {
  user: User | null;
  isAuthChecked: boolean;
}

interface BurgerIngredientStore {
  data: Ingredients | null;
  isLoading: boolean;
  isError: boolean;
}

interface IngredientDetailsStore {
  data: Ingredient | null;
}

interface OrderDetailsStore {
  data: ServerOrderResponse | null;
  isLoading: boolean;
  isError: boolean;
}

export interface Store {
  user: UserStore;
  burgerConstructor: BurgerConstructorStore;
  burgerIngredients: BurgerIngredientStore;
  ingredientDetails: IngredientDetailsStore;
  orderDetails: OrderDetailsStore;
}
