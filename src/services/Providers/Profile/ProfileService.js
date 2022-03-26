import apiClient from "../../httpApiSauceService";

export const getProviderProfileService = (id) =>
  apiClient.get(`/provider/getProviderProfile/${id}`);
export const getProviderProfileByIdService = (id) =>
  apiClient.get(`/provider/getProviderProfileByUserId/${id}`);

export const updateProviderProfileService = (data) =>
  apiClient.put(`/provider/updateProviderProfile`, data);
export const updateProviderProfilePicService = (data) =>
  apiClient.put(`/provider/uploadProviderProfilePicture`, data);
