import { API_METHODS } from "./constant";

export const api = {
  post: (url, data = {}) => {
    return fetch(url, {
      method: API_METHODS.POST,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  },
};
