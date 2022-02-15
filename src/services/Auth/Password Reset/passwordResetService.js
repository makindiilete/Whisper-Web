import apiClient from "../../httpApiSauceService";

export const initiatePasswordResetService = (data) =>
  apiClient.post(`/auth/initiatePasswordReset`, data);
export const finalizePasswordResetService = (data) =>
  apiClient.post(`/auth/resetPassword`, data);
