import { constants } from "./types";
import {
  getCustomerProfileByIdService,
  getCustomerProfileService,
} from "../../services/Customers/Profile/ProfileService";
import {
  getProviderProfileByIdService,
  getProviderProfileService,
} from "../../services/Providers/Profile/ProfileService";
import { loginService } from "../../services/Auth/Login/loginService";
import { fetchUserByIdService } from "../../services/Admin/UserManager/userManager";
import { getCustomerGalleryByIdService } from "../../services/Customers/Gallery/GalleryService";
import { getProviderGalleryByIdService } from "../../services/Providers/Gallery/Gallery";

export const userAction = (payload) => {
  return {
    type: constants.SAVE_USER,
    payload: payload,
  };
};

export const adminFetchUserAction = (userId) => {
  return async function (dispatch) {
    const response = await fetchUserByIdService(userId);
    if (response.ok) {
      dispatch({
        type: constants.ADMIN_FETCH_USER,
        payload: response?.data?.data,
      });
    }
  };
};

export const fetchUserGalleryAction = (gallery) => {
  return {
    type: constants.FETCH_GALLERY,
    payload: gallery,
  };
};

export const loginAction = (email, password) => {
  return async function (dispatch) {
    const response = await loginService({ email, password });
    if (response.ok) {
      dispatch({
        type: constants.LOGIN_USER,
        payload: response?.data?.data,
      });
    }
  };
};
