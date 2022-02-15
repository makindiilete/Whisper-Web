import apiClient from "../../httpApiSauceService";

export const createUserBankDetailsService = (data) =>
  apiClient.post(`/app/createUserBankDetails`, data);

export const updateUserBankDetailsService = (data) =>
  apiClient.put(`/app/updateBankDetail`, data);

export const deleteUserBankDetailsService = (data) =>
  apiClient.delete(`/app/deleteBankDetail`, data);

export const getUserBankDetailsByUserIdService = (id) =>
  apiClient.get(`/app/getUserBankDetailsbyUserId/${id}`);

export const getUserBankDetailsByIdService = (id) =>
  apiClient.get(`/app/getBankDetail/${id}`);
