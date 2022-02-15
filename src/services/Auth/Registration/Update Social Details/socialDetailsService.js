import apiClient from "../../../httpApiSauceService";

export const fbUpdateService = (data) =>
  apiClient.post(`/auth/updateFacebookDetails`, data);
export const googleUpdateService = (data) =>
  apiClient.post(`/auth/updateGoogleDetails`, data);
export const appleUpdateService = (data) =>
  apiClient.post(`/auth/updateAppleDetails`, data);
