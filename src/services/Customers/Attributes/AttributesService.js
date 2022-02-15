import apiClient from "../../httpApiSauceService";

export const getCustomerAttributesService = (id) =>
  apiClient.get(`/customer/getCustomerAttributes/${id}`);
export const getCustomerAttributesByIdService = (id) =>
  apiClient.get(`/customer/getCustomerAttributesByUserId/${id}`);

export const updateCustomerAttributesService = (data) =>
  apiClient.put(`/customer/updateCustomerAttributes`, data);
