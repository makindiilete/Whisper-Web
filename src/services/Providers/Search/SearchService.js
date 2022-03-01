import apiClient from "../../httpApiSauceService";

export const getProviderByDistanceService = (data) =>
  apiClient.post(`/provider/getProviderByDistance`, data);

export const getProviderByPreferenceService = (data) =>
  apiClient.post(`/provider/getProviderByUserPreference`, data);
export const getProviderCompleteProfileService = (providerId) =>
  apiClient.get(`/provider/getProviderCompleteProfile/${providerId}`);
