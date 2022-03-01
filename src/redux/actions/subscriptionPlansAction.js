import { constants } from "./types";
import { getAllSubPlansService } from "../../services/App/Subscription Plans/SubscriptionPlansService";

export const subscriptionPlansAction = (userId) => {
  return async function (dispatch) {
    const response = await getAllSubPlansService(1, 100);
    if (response.ok) {
      dispatch({
        type: constants.FETCH_SUBSCRIPTION_PLANS,
        payload: response?.data?.data,
      });
    }
  };
};
