import apiClient from "../httpApiSauceService";

export const contactUsService = (data) =>
  apiClient.post(`/api/v1/app/createContactUsMessage`, data);
