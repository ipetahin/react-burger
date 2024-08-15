export interface IOrderList {
  orders: Order[];
  total: number;
  totalToday: number;
}

export interface Order {
  ingredients: string[];
  _id: string;
  status: 'done' | 'in-work';
  number: number;
  createdAt: string;
  updatedAt: string;
}

export const ordersResponse: IOrderList = {
  orders: [
    {
      ingredients: [
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa093c',
      ],
      _id: '',
      status: 'done',
      number: 34535,
      createdAt: '2021-06-23T14:43:22.587Z',
      updatedAt: '2021-06-23T14:43:22.587Z',
    },
  ],
  total: 1,
  totalToday: 1,
};