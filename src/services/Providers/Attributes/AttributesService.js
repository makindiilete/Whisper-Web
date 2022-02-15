import apiClient from "../../httpApiSauceService";

export const getProviderAttributesService = (id) =>
  apiClient.get(`/provider/getProviderAttributes/${id}`);
export const getProviderAttributesByIdService = (id) =>
  apiClient.get(`/provider/getProviderAttributesByUserId/${id}`);

export const updateProviderAttributesService = (data) =>
  apiClient.put(`/provider/updateProviderAttributes`, data);
