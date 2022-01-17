import apiClient from "./httpApiSauceService";

export const login = (phone, password) =>
  apiClient.post(`/login`, {
    phone: phone,
    password: password,
    role: "rider",
  });

export const fetchMyProfile = () => apiClient.get(`/me`);

export const updateProfile = (formData) => apiClient.post(`/me`, formData);

export const forgotPassword = (phone) =>
  apiClient.post(`/password/forgotten`, { phone: phone });

export const resetPassword = (body) => apiClient.post(`/password/reset`, body);
