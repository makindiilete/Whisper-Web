import apiClient from "../../httpApiSauceService";

export const getAllSubPlansService = (currentPage = 1, perPage) =>
  apiClient.get(`/app/getSubscriptionPlans`, {
    currentPage: currentPage,
    perPage: perPage,
  });
export const getServiceCategoryService = (id) =>
  apiClient.get(`/app/getSubscriptionPlan/${id}`);
export const getUserActiveSubService = (id) =>
  apiClient.get(`/app/getUserActiveSubscriptions/${id}`);
export const getUserSubHistoryService = (id) =>
  apiClient.get(`/app/getUserSubscriptionHistory/${id}`);
export const subscribeUserService = (data) =>
  apiClient.post(`/app/subscribeUser`, data);
