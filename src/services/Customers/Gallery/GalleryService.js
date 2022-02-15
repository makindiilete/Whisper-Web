import apiClient from "../../httpApiSauceService";

export const getCustomerGalleryService = (id) =>
  apiClient.get(`/customer/getCustomerGallery/${id}`);
export const getCustomerGalleryByIdService = (id) =>
  apiClient.get(`/customer/getAllCustomerGallery/${id}`);

export const uploadCustomerGalleryService = (data) =>
  apiClient.post(`/customer/uploadImagesToCustomerGallery`, data);
export const deleteCustomerGalleryService = (data) =>
  apiClient.delete(`/customer/deleteCustomerGallery`, data);
export const likeCustomerPictureService = (data) =>
  apiClient.put(`/customer/likeCustomerGallery`, data);
export const dislikeCustomerPictureService = (data) =>
  apiClient.put(`/customer/dislikeCustomerGallery`, data);
