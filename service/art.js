import { api } from "./api";

export const createArt = async (formData) => {
  return api("/art/", {
    method: "POST",
    body: formData,
  });

};
export const getAllArtistArt = (id) => {
  return api(`/art/u/${id}`);
}
export const getArtistProfile = (id) => {
  return api(`/art/u/profile/${id}`);
}
export const getArtById = (id) => {
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
