const URL_API = 'https://norma.nomoreparties.space/api/';

export const postOrder = (data) => {
  const url = `${URL_API}orders`;

  const options = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  };

  return fetch(url, options)
  .then((res) => (res.ok ? res.json() : Promise.reject()))
  .then((data) => data.success && data);
};

export const fetchIngredients = () => {
  const url = `${URL_API}ingredients`;

  return fetch(url)
    .then((res) => (res.ok ? res.json() : Promise.reject()))
    .then((data) => data.success && data.data);
};

