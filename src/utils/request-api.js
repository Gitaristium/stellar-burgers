const NORMA_API = "https://norma.nomoreparties.space/api/";

const checkResponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export async function requestApi(url, options) {
  const res = await fetch(NORMA_API + url, options);
  return checkResponse(res);
}
