import { handleCheckResponse } from "./utils";

export const BASE_URL = "https://api.nataliorigin.nomoredomains.rocks";

function makeRequest(url, method, body, token) {
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  if (token !== undefined) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const config = {
    method,
    headers,
  };
  if (body !== undefined) {
    config.body = JSON.stringify(body);
  }
  return fetch(`${BASE_URL}${url}`, config).then((res) =>
    handleCheckResponse(res)
  );
}

export const registerSignUp = ({ email, password }) => {
  return makeRequest("/signup", "POST", { email, password });
};

export const authorizeSignIn = ({ email, password }) => {
  return makeRequest("/signin", "POST", { email, password });
};

export const getContent = (token) => {
  return makeRequest("/users/me", "GET", undefined, token);
};
