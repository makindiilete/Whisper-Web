import apiClient from "../../httpApiSauceService";

export const getProviderService_Service = (id) =>
  apiClient.get(`/provider/getProviderService/${id}`);
export const getProviderServiceByIdService = (id) =>
  apiClient.get(`/provider/getProviderServiceByUserId/${id}`);

export const updateProviderService_Service = (data) =>
  apiClient.put(`/provider/updateProviderService`, data);
export const requestProviderService_Service = (data) =>
  apiClient.post(`/provider/requestService`, data);
