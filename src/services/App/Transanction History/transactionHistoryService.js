import apiClient from "../../httpApiSauceService";

export const getUserTransactionsService = (id, currentPage, perPage) =>
  apiClient.get(`/app/getUserTransactions/${id}`, {
    currentPage: currentPage,
    perPage: perPage,
  });

export const getTransactionService = (id) =>
  apiClient.get(`/app/getTransaction/${id}`);
