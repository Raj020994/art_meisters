
import { api } from "./api";

export const createArt = async (formData) => {
  return api("/art/", {
    method: "POST",
    body: JSON.stringify(formData),
  });

};
export const getAllArtistArt = (id) => {
  return api(`/art/u/${id}`);
}
export const getArtistProfile = (id) => {
  return api(`/art/u/profile/${id}`);
}
export const getArtProfileById = (data) => {
  console.log(`/art/p/${data.usrId}/${data.id}/`)
  return api(`/art/p/${data.usrId}/${data.id}`);

}
export const getArtById = (id) => {
  console.log("Hello");
  console.log(`/art/${id}`);
  return api(`/art/${id}`);
}
export const editArt=()=>{

}
export const deleteArt=()=>{

}
export const likeArt=()=>{

}
export const saveArt=()=>{

}
export const updateArt = (id, data) => {

  return api(`/art/${id}`, {

    method: "PATCH",

    body: JSON.stringify(data),

  });

};