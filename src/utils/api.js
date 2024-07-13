export default function request(endpoint, options) {
  const baseUrl = 'https://norma.nomoreparties.space/api/';
  const checkResponse = (res) => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
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

const refreshToken = () => {
  return requestPost('auth/token', { token: localStorage.getItem('refreshToken') }).then((refreshData) => {
    if (!refreshData.success) {
      return Promise.reject(refreshData);
    }
    localStorage.setItem('refreshToken', refreshData.refreshToken);
    localStorage.setItem('accessToken', refreshData.accessToken);
    return refreshData;
  });
};

export const logout = () => {
  return requestPost('auth/logout', { token: localStorage.getItem('refreshToken') });
};

const requestWithRefresh = async (endpoint, options) => {
  try {
    return await request(endpoint, options);
  } catch (err) {
    if (err.message === 'jwt expired') {
      const refreshData = await refreshToken();
      options.headers.authorization = refreshData.accessToken;
      return await request(endpoint, options);
    } else {
      return Promise.reject(err);
    }
  }
};

export const requestUser = () => {
  return requestWithRefresh('auth/user', { headers: { authorization: localStorage.getItem('accessToken') } });
};

export const requestUpdateUserData = (data) => {
  const options = {
    method: 'PATCH',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      authorization: localStorage.getItem('accessToken'),
    },
  };
  return requestWithRefresh('auth/user', options);
};

export const passwordResetRequest = (data) => {
  return requestPost('password-reset', data);
};

export const passwordReset = (data) => {
  return requestPost('password-reset/reset', data);
};
