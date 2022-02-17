import { constants } from "../actions/types";

const initState = { data: {} };
export const userReducer = (state = initState, action) => {
  switch (action.type) {
    case constants.SAVE_USER:
    case constants.LOGIN_USER:
    case constants.ADMIN_FETCH_USER: {
      return {
        ...state,
        data: action.payload,
      };
    }
    default:
      return state;
  }
};
