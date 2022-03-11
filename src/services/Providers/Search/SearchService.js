import apiClient from "../../httpApiSauceService";

export const getProviderByDistanceService = (data) =>
  apiClient.post(`/provider/getProviderByDistance`, data);

export const getProviderByPreferenceService = (data) =>
  apiClient.post(`/provider/getProvidersByUserPreference`, data);
export const getRandomProvidersService = () =>
  apiClient.post(`/provider/getProviders?currentPage=1&perPage=20`, {
    currentPage: 1,
  });
export const getProviderCompleteProfileService = (providerId) =>
  apiClient.get(`/provider/getProviderCompleteProfile/${providerId}`);
