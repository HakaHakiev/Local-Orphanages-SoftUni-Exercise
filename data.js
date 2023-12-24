import * as api from "./api.js";

const host = "http://localhost:3030";
api.settings.host = host;

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

// Application-specific request
// get all listings
export async function getAllMaterials() {
  return await api.get(host + "/data/posts?sortBy=_createdOn%20desc");
}

// get listing by id
export async function getMaterialById(id) {
  return await api.get(host + `/data/posts/${id}`);
}

// create listing
export async function addMaterial(material) {
  return await api.post(host + "/data/posts", material);
}

// edit listing by id
export async function editMaterialById(id, post) {
  return await api.put(host + `/data/posts/${id}`, post);
}

// delete listing by id
export async function deleteMaterialById(id) {
  return await api.del(host + `/data/posts/${id}`);
}

export async function getMyPosts(userId) {
  return await api.get(
    host +
      `/data/posts?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`
  );
}

export async function donationPost(postId) {
  return await api.post(host + `/data/donations`, postId);
}

export async function getTotalDonationCount(postId) {
  return await api.get(
    host +
      `/data/donations?where=postId%3D%22${postId}%22&distinct=_ownerId&count`
  );
}

export async function didUserDonation(postId, userId) {
  return await api.get(
    host +
      `/data/donations?where=postId%3D%22${postId}%22%20and%20_ownerId%3D%22${userId}%22&count`
  );
}
