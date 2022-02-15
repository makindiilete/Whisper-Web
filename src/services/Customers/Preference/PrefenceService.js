import apiClient from "../../httpApiSauceService";

export const getCustomerPreferenceService = (id) =>
  apiClient.get(`/customer/getCustomerPreference/${id}`);
export const getCustomerPreferenceByIdService = (id) =>
  apiClient.get(`/customer/getCustomerPreferenceByUserId/${id}`);

export const updateCustomerPreferenceService = (data) =>
  apiClient.put(`/customer/updateCustomerPreference`, data);
