import { PORTAL_URL } from "constants/apiConstants";

export const PostApiCall = (url, body, headers = {}) => {
  return fetch(PORTAL_URL + url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/no-q.com; version=1",
      ...headers,
    },
    body: JSON.stringify(body),
  });
};

export const GetApiCall = (url, queryParams = {}, headers = {}) => {
  let getUrl = PORTAL_URL + url;
  if (queryParams) {
    let qs = new URLSearchParams();
    Object.keys(queryParams).forEach((key) => qs.set(key, queryParams[key]));
    getUrl = getUrl + "?" + qs.toString();
  }

  return fetch(getUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/no-q.com; version=1",
      ...headers,
    },
  });
};

export const DeleteApiCall = (url, headers) => {
  return fetch(PORTAL_URL + url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/no-q.com; version=1",
      ...headers,
    },
  });
};

export const getJSON = (response) => response.json();
