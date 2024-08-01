export interface Ingredient {
  _id?: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
  id: string;
}

export type ConstructorItemType = 'top' | 'bottom';

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
