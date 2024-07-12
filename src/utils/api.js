export default function request(endpoint, options) {
  const baseUrl = 'https://norma.nomoreparties.space/api/';
  const checkResponse = (res) => {
    return res.ok ? res.json() : Promise.reject(`Ошибка ${res.status}`);
  };

  return fetch(`${baseUrl}${endpoint}`, options).then(checkResponse);
}

function requestPost(endpoint, data) {
  const options = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
  };

  return request(endpoint, options).then((data) => data.success && data);
}

export const postOrder = (data) => {
  return requestPost('orders', data);
};

export const fetchIngredients = () => {
  return request('ingredients').then((data) => data.success && data.data);
};

export const login = (data) => {
  return requestPost('auth/login', data);
};

export const register = (data) => {
  return requestPost('auth/register', data);
};

export const token = () => {
  return requestPost('auth/token', { token: localStorage.getItem('refreshToken') });
};

export const logout = () => {
  return requestPost('auth/logout', { token: localStorage.getItem('refreshToken') });
};
