import { ArrayData, FormData, HTTPMethods, Options, ResponseError } from '../types';

export default function request(endpoint: string, options?: Options) {
  const baseUrl = 'https://norma.nomoreparties.space/api/';
  const checkResponse = (res: Response) => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
  };

  return fetch(`${baseUrl}${endpoint}`, options).then(checkResponse);
}

const requestPost = (endpoint: string, data: FormData) => {
  return request(endpoint, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
  }).then((data) => (data.success ? data : Promise.reject(data)));
};

const requestWithRefresh = async (endpoint: string, options: Options) => {
  const refreshToken = () => {
    const token = localStorage.getItem('refreshToken');
    if (token) {
      return requestPost('auth/token', { token }).then((refreshData) => {
        localStorage.setItem('refreshToken', refreshData.refreshToken);
        localStorage.setItem('accessToken', refreshData.accessToken);
        return refreshData;
      });
    }
  };

  try {
    return await request(endpoint, options);
  } catch (err: unknown) {
    const responseError = err as ResponseError;
    if (responseError.message === 'jwt expired') {
      const refreshData = await refreshToken();
      options.headers.authorization = refreshData.accessToken;
      return await request(endpoint, options);
    } else {
      return Promise.reject(err);
    }
  }
};

const requestWithAccessToken = (endpoint: string, method: HTTPMethods = 'GET', data?: FormData | ArrayData) => {
  const accessToken = localStorage.getItem('accessToken');
  if (accessToken) {
    return requestWithRefresh(endpoint, {
      method,
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        authorization: accessToken,
      },
    });
  }
};

export const fetchIngredients = () => {
  return request('ingredients').then((data) => data.success && data.data);
};

export const login = (data: FormData) => requestPost('auth/login', data);
export const register = (data: FormData) => requestPost('auth/register', data);

export const logout = () => {
  const token = localStorage.getItem('refreshToken');
  if (token) {
    return requestPost('auth/logout', { token });
  }
};

export const passwordResetRequest = (data: FormData) => requestPost('password-reset', data);
export const passwordReset = (data: FormData) => requestPost('password-reset/reset', data);

export const requestUser = () => requestWithAccessToken('auth/user');
export const requestSendOrder = (data: ArrayData) => requestWithAccessToken('orders', 'POST', data);
export const requestUpdateUser = (data: FormData) => requestWithAccessToken('auth/user', 'PATCH', data);
