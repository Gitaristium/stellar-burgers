import { NORMA_API } from "./vars";

const checkResponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export async function requestApi(url, options) {
  const res = await fetch(NORMA_API + url, options);
  return checkResponse(res);
}
