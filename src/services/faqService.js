import apiClient from "./httpApiSauceService";

export const fetchAllFaqs = (perPage = 20) =>
  apiClient.get(`/admin/findAllFaqs`, {
    currentPage: 1,
    perPage: perPage,
  });
