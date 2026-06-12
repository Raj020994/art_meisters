import { api } from "./api";

export const getPendingArt = async () => {
  return api("/art/pending-art", {
    method: "GET",
  });
};
export const changeArtStatus = async (id, status) => {
  return api(`/admin/arts/${id}/status?status=${status}`, {
    method: "PATCH",
  });
};