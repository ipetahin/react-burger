const fetchApi = (endpoint, postData = null) => {
  const url = `https://norma.nomoreparties.space/api/${endpoint}`;
  let options = null;

  if (postData) {
    options = {
      method: 'POST',
      body: JSON.stringify(postData),
      headers: {
        'Content-Type': 'application/json',
      },
    };
  }

  return fetch(url, { ...options })
    .then((res) => res.json())
    .then((data) => data.success && data);
};

export default fetchApi;
