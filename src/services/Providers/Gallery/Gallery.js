import apiClient from "../../httpApiSauceService";

export const getProviderGalleryService = (id) =>
  apiClient.get(`/provider/getProviderGallery/${id}`);
export const getProviderGalleryByIdService = (id) =>
  apiClient.get(`/provider/getAllProviderGallery/${id}`);

export const getAllPaidPictures = (id) =>
  apiClient.get(`/provider/getAllPaidPictures/${id}`);

export const uploadProviderGalleryService = (data) =>
  apiClient.post(`/provider/uploadImagesToProviderGallery`, data);
export const payForPictureService = (data) =>
  apiClient.post(`/provider/payforPicture`, data);
export const uploadProviderGalleryWithLinkService = (data) =>
  apiClient.post(`/provider/uploadImagesToProviderGalleryWithLink`, data);
export const deleteProviderGalleryService = (id) =>
  apiClient.delete(
    `/provider/deleteProviderGallery`,
    {},
    { data: { galleryId: id } }
  );
export const likeProviderPictureService = (data) =>
  apiClient.put(`/provider/likeProviderGallery`, data);
export const sendFriendRequestToProvider = (data) =>
  apiClient.post(`/app/createFriendRequest`, data);
export const getFriends = (userId) =>
  apiClient.get(`/app/getFriends/${userId}`);
export const dislikeProviderPictureService = (data) =>
  apiClient.put(`/provider/dislikeProviderGallery`, data);
