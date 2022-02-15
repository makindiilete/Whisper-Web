import apiClient from "../../httpApiSauceService";

export const requestWithdrawalService = (data) =>
  apiClient.post(`/app/requestWithdrawal`, data);

export const getUserWithdrawalRequestsByUserIdService = (id) =>
  apiClient.get(`/app/getAllUserWithdrawalRequests/${id}`);

export const getWithdrawalRequestByIdService = (id) =>
  apiClient.get(`/app/getAWithdrawalRequest/${id}`);
