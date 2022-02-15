import apiClient from "../../httpApiSauceService";

export const getProviderPreferenceService = (id) =>
  apiClient.get(`/provider/getProviderPreference/${id}`);
export const getProviderPreferenceByIdService = (id) =>
  apiClient.get(`/provider/getProviderPreferenceByUserId/${id}`);

export const updateProviderPreferenceService = (data) =>
  apiClient.put(`/provider/updateProviderPreference`, data);
