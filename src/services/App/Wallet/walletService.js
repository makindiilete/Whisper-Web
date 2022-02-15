import apiClient from "../../httpApiSauceService";

export const getUserWalletService = (id) =>
  apiClient.get(`/app/getUserWallet/${id}`);
export const initStripePayment = (data) =>
  apiClient.post(`/app/initiateStripePayment`, data);
export const finalizeStripePayment = (data) =>
  apiClient.post(`/app/finalizeStripePayment`, data, {
    headers: { "stripe-signature": process.env.REACT_APP_STRIPE_SIGNATURE },
  });
