import apiClient from "../../httpApiSauceService";

export const getCustomerProfileService = (id) =>
  apiClient.get(`/customer/getCustomerProfile/${id}`);
export const getCustomerProfileByIdService = (id) =>
  apiClient.get(`/customer/getCustomerProfileByUserId/${id}`);

export const updateCustomerProfileService = (data) =>
  apiClient.put(`/customer/updateCustomerProfile`, data);
export const updateCustomerProfilePicService = (data) =>
  apiClient.put(`/customer/uploadCustomerProfilePicture`, data);
