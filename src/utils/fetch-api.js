const fetchApi = (endpoint) => {
  const url = `https://norma.nomoreparties.space/api/${endpoint}`;
  return fetch(url)
    .then((res) => res.json())
    .then((json) => json.success && json.data);
};

export default fetchApi;
