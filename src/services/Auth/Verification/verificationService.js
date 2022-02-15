import apiClient from "../../httpApiSauceService";

export const initEmailVerificationService = (data) =>
  apiClient.post(`/auth/initiateEmailVerification`, data);

export const finalizeEmailVerficationService = (data) =>
  apiClient.post(`/auth/verifyEmail`, data);

export const initPhoneVerificationService = (data) =>
  apiClient.post(`/auth/initiatePhoneVerification`, data);

export const finalizePhoneVerficationService = (data) =>
  apiClient.post(`/auth/verifyPhone`, data);
