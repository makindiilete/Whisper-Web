import apiClient from "../../httpApiSauceService";

export const getAllServices_Service = (currentPage = 1, perPage) =>
  apiClient.get(`/app/getAllServices`, {
    currentPage: currentPage,
    perPage: perPage,
  });

export const getService_Service = (id) =>
  apiClient.get(`/app/getService/${id}`);
