import apiClient from "../../httpApiSauceService";

export const getProviderGalleryService = (id) =>
  apiClient.get(`/provider/getProviderGallery/${id}`);
export const getProviderGalleryByIdService = (id) =>
  apiClient.get(`/provider/getAllProviderGallery/${id}`);

export const uploadProviderGalleryService = (data) =>
  apiClient.post(`/provider/uploadImagesToProviderGallery`, data);
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
export const dislikeProviderPictureService = (data) =>
  apiClient.put(`/provider/dislikeProviderGallery`, data);
