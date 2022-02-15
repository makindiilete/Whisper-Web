import apiClient from "../../httpApiSauceService";

export const changePasswordService = (data) =>
  apiClient.post(`/auth/changePassword`, data);
