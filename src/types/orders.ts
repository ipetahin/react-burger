export interface IOrderList {
  orders: Order[];
  total: number;
  totalToday: number;
}

export interface Order {
  ingredients: string[];
  _id: string;
  status: 'done' | 'pending' | 'created';
  number: number;
  createdAt: string;
  updatedAt: string;
}

export const ordersResponse: IOrderList = {
  orders: [
    {
      ingredients: [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa0948',
        '643d69a5c3f7b9001cfa0946',
        '643d69a5c3f7b9001cfa0944',
      ],
      _id: '34535',
      status: 'created',
      number: 34535,
      createdAt: '2024-08-13T14:43:22.587Z',
      updatedAt: '2024-08-13T14:43:22.587Z',
    },
    {
      ingredients: [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa0948',
        '643d69a5c3f7b9001cfa0946',
        '643d69a5c3f7b9001cfa0944',
        '643d69a5c3f7b9001cfa094a',
        '643d69a5c3f7b9001cfa0941',
        '643d69a5c3f7b9001cfa0941',
      ],
      _id: '34534',
      status: 'pending',
      number: 34534,
      createdAt: '2023-06-23T14:43:22.587Z',
      updatedAt: '2023-06-23T14:43:22.587Z',
    },
    {
      ingredients: [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa0948',
        '643d69a5c3f7b9001cfa0946',
      ],
      _id: '34533',
      status: 'done',
      number: 34533,
      createdAt: '2022-06-23T14:43:22.587Z',
      updatedAt: '2022-06-23T14:43:22.587Z',
    },
    {
      ingredients: [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa0948',
        '643d69a5c3f7b9001cfa0946',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa0948',
        '643d69a5c3f7b9001cfa0946',
      ],
      _id: '34532',
      status: 'done',
      number: 34532,
      createdAt: '2021-06-23T14:43:22.587Z',
      updatedAt: '2021-06-23T14:43:22.587Z',
    },
  ],
  total: 4,
  totalToday: 1,
};