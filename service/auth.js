import { api } from "./api";
export const loginUser = (formData) =>
    api("/auth/login", {
        method: "POST",
        body: JSON.stringify(formData),
    });

export const signUpUser = (formData) =>
    api("/auth/register", {
        method: "POST",
        body: JSON.stringify(formData),
    });

export const getCurrUser = () =>
    api("/auth/me");

export const logOutUser = () => {
    api("/auth/logout", {
        method: "POST",
    });
}
