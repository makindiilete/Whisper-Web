import apiClient from "../../httpApiSauceService";

export const fetchUserByIdService = (id) => {
  return apiClient.get(`/admin/getUserById/${id}`);
};
