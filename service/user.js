import { api } from "./api";

export const usrById=(id)=>{
  
  return api(`/auth/users/${id}`);
}
export const getAllUser=()=>{
  return api(`/auth/users`);
}
export const updateUser = async (id, data) => {
  console.log(data)
  return api(`/auth/users/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });

};