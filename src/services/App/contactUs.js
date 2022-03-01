import apiClient from "../httpApiSauceService";

export const contactUsService = (data) =>
  apiClient.post(`/api/v1/user/createContactUsMessage`, data);
