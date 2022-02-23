import apiClient from "../../httpApiSauceService";

export const getCustomerGalleryService = (id) =>
  apiClient.get(`/customer/getCustomerGallery/${id}`);
export const getCustomerGalleryByIdService = (id) =>
  apiClient.get(`/customer/getAllCustomerGallery/${id}`);

export const uploadCustomerGalleryService = (data) =>
  apiClient.post(`/customer/uploadImagesToCustomerGallery`, data);
export const uploadCustomerGalleryWithLinkService = (data) =>
  apiClient.post(`/customer/uploadImagesToCustomerGalleryWithLink`, data);
export const deleteCustomerGalleryService = (id) =>
  apiClient.delete(
    `/customer/deleteCustomerGallery`,
    {},
    { data: { galleryId: id } }
  );
export const likeCustomerPictureService = (data) =>
  apiClient.put(`/customer/likeCustomerGallery`, data);
export const dislikeCustomerPictureService = (data) =>
  apiClient.put(`/customer/dislikeCustomerGallery`, data);
