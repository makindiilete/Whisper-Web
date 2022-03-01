import { constants } from "../actions/types";

const initState = { data: {} };
export const subscriptionPlansReducer = (state = initState, action) => {
  switch (action.type) {
    case constants.FETCH_SUBSCRIPTION_PLANS:
      return {
        ...state,
        activeSub: action.payload,
      };
    default:
      return state;
  }
};
