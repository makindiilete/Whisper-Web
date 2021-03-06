import apiClient from "../../httpApiSauceService";

export const getCustomerProfileService = (id) =>
  apiClient.get(`/customer/getCustomerProfile/${id}`);
export const getCustomerProfileByIdService = (id) =>
  apiClient.get(`/customer/getCustomerProfileByUserId/${id}`);

export const updateProfile = (data) => apiClient.put(`/app/updateUser`, data);
export const updateCustomerProfileService = (data) =>
  apiClient.put(`/customer/updateCustomerProfile`, data);
export const updateCustomerProfilePicService = (data) =>
  apiClient.put(`/customer/uploadCustomerProfilePicture`, data);
export const customerSelfieVerificationService = (data) =>
  apiClient.put(`/auth/selfieverificationWithLink`, data);
export const getCustomerCompleteProfileService = (customerId) =>
  apiClient.get(`/customer/getCustomerCompleteProfile/${customerId}`);
