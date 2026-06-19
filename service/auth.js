import { api } from "./api";
export const loginUser = (formData) =>
  api("/auth/login", {
    method: "POST",
    body: JSON.stringify(formData),
  });

export const signUpUser = (formData) => {
  return api("/auth/users", {
    method: "POST",
    body: JSON.stringify(formData),
  });
};

export const getCurrUser = () => {
  return api("/auth/me");
};

export const logOutUser = () => {
  return api("/auth/logout", {
    method: "POST",
  });
};
