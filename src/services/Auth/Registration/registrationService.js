import apiClient from "../../httpApiSauceService";

export const userRegService = (data) => apiClient.post(`/auth/signup`, data);
export const updateUserTypeService = (data) =>
  apiClient.post(`/auth/updateUserType`, data);
export const checkUserEmailService = (data) =>
  apiClient.post(`/auth/checkEmail`, data);
