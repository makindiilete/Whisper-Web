import { constants } from "../actions/types";

const initState = { data: {}, gallery: [], activeSub: [] };
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
    case constants.FETCH_GALLERY:
      return {
        ...state,
        gallery: action.payload,
      };
    case constants.FETCH_USER_SUBSCRIPTIONS:
      return {
        ...state,
        activeSub: action.payload,
      };
    default:
      return state;
  }
};
