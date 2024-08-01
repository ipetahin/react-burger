export interface Ingredient {
  _id: string;
  name: string;
  type: IngredientType;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
}

export type Ingredients = Array<Ingredient>;

export interface ConstructorIngredient extends Ingredient {
  id: string;
}

export type ConstructorIngredients = Array<ConstructorIngredient>;

export interface BurgerConstructorStore {
  bun: ConstructorIngredient | null;
  ingredients: ConstructorIngredients;
}

export interface User {
  email: string;
  name: string;
  [key: string]: string;
}

interface Owner extends User {
  createdAt: string;
  updatedAt: string;
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

interface Order {
  ingredients: Ingredients;
  _id: string;
  owner: Owner;
  status: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number;
  price: number;
}

export interface OrderDetailsStore {
  data: { success: boolean; name: string; order: Order } | null;
  isLoading: boolean;
  isError: boolean;
}

export type ConstructorItemType = 'top' | 'bottom';

export type IngredientType = 'bun' | 'sauce' | 'main';

export interface FormData {
  [name: string]: string;
}

export interface ArrayData {
  [name: string]: Array<string>;
}

export type HTTPMethods = 'GET' | 'POST' | 'PATCH';

export interface Options {
  method?: HTTPMethods;
  body?: string;
  headers: {
    'Content-Type'?: string;
    authorization?: string;
  };
}

export interface ResponseError {
  message: string;
}
