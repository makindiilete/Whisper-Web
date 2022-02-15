import apiClient from "../../httpApiSauceService";

export const loginService = (data) => apiClient.post(`/auth/signin`, data);
export const fbLoginService = (data) =>
  apiClient.post(`/auth/facebookSignin`, data);
export const googleLoginService = (data) =>
  apiClient.post(`/auth/googleSignin`, data);
export const appleLoginService = (data) =>
  apiClient.post(`/auth/appleSignin`, data);
