import apiClient from "../../httpApiSauceService";

export const getAllServiceCategoriesService = (currentPage = 1, perPage) =>
  apiClient.get(`/app/getAllServiceCategories`, {
    currentPage: currentPage,
    perPage: perPage,
  });

export const getServiceCategoryService = (id) =>
  apiClient.get(`/app/getServiceCategory/${id}`);
