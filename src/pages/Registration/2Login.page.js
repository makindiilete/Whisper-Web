import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import useMobile from "../../hooks/useMobile";
import routes from "../../routes";
import fb from "../../assets/images/auth/fb.svg";
import google from "../../assets/images/auth/google.svg";
import apple from "../../assets/images/auth/apple.svg";
import AuthContainerPage from "./AuthContainer.page";
import { Form, Input, message } from "antd";
import { BsFacebook, FaAngleLeft } from "react-icons/all";
import SuccessModal from "../../components/Modals/successModal";
import provImg1 from "../../assets/images/homeInApp/Rectangle 2685.svg";
import provImg3 from "../../assets/images/homeInApp/Rectangle 2685 copy 3.svg";
import provImg6 from "../../assets/images/homeInApp/Rectangle 2685 copy 2.svg";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import {
  fbLoginService,
  googleLoginService,
  loginService,
} from "../../services/Auth/Login/loginService";
import {
  adminFetchUserAction,
  fetchUserGalleryAction,
  fetchUserSubscriptionAction,
} from "../../redux/actions/userAction";
import { Facebook } from "../../components/socialAuth/facebook/facebook";
import { Google } from "../../components/socialAuth/google/Google";
import { Apple } from "../../components/socialAuth/apple/Apple";
import FacebookLogin from "react-facebook-login";
import { subscriptionPlansAction } from "../../redux/actions/subscriptionPlansAction";

const TwoLoginPage = (props) => {
  let location = useLocation();
  const history = useHistory();
  const mobile = useMobile();
  const dispatch = useDispatch();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  const user = useSelector((state) => state.userReducer?.data);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (values) => {
    setIsLoading(true);
    const response = await loginService(data);
    setIsLoading(false);
    if (response.ok) {
      localStorage.setItem("token", response?.data?.data?.token);
      dispatch(adminFetchUserAction(response?.data?.data?._id));
      dispatch(fetchUserSubscriptionAction(response?.data?.data?._id));
      dispatch(subscriptionPlansAction());
      history.push(
        response?.data?.data?.userType?.toLowerCase() === "customer"
          ? routes.CUSTOMER_HOME
          : routes.PROVIDER_HOME
      );
    } else {
      message.error(
        response?.data?.errors[0].message || "Something went wrong"
      );
    }
  };

  function handleResponse(response) {
    if (response.ok) {
      localStorage.setItem("token", response?.data?.data?.token);
      dispatch(adminFetchUserAction(response?.data?.data?._id));
      history.push(
        response?.data?.data?.userType?.toLowerCase() === "customer"
          ? routes.CUSTOMER_HOME
          : routes.PROVIDER_HOME
      );
    } else {
      message.error(
        response?.data?.errors[0].message || "Something went wrong"
      );
    }
  }

  const handleGoogleLogin = async (user) => {
    setIsLoading(true);
    const response = await googleLoginService({
      googleId: user?.profileObj?.googleId,
      email: user?.profileObj?.email,
    });
    setIsLoading(false);
    handleResponse(response);
  };

  const handleFacebookLogin = async (user) => {
    setIsLoading(true);
    const response = await fbLoginService({
      facebookId: user?.id,
      email: user?.email,
    });
    setIsLoading(false);
    handleResponse(response);
  };

  const handleAppleLogin = (user) => {
    console.log("Apple response = ", user);
  };

  function handleChange(value, name) {
    setData({ ...data, [name]: value });
  }

  const regForm = () => {
    return (
      <>
        <Form
          layout="vertical"
          scrollToFirstError
          onFinish={handleSubmit}
          size="large"
        >
          <Form.Item
            className="mb-3 mb-md-0 mt-2"
            initialValue=""
            name="email"
            rules={[
              {
                required: true,
                message: "Required field",
              },
            ]}
          >
            <Input
              placeholder="Email"
              onChange={(e) => handleChange(e.target.value, "email")}
            />
          </Form.Item>

          <Form.Item
            className="mb-3 mb-md-0 mt-2"
            initialValue=""
            name="password"
            rules={[
              {
                required: true,
                message: "Required field",
              },
            ]}
          >
            <Input.Password
              placeholder="Password"
              onChange={(e) => handleChange(e.target.value, "password")}
            />
          </Form.Item>
          <br />
          {/*<div className="d-flex justify-content-center">*/}
          <button disabled={isLoading} className="btn btn-primary btn-block">
            {isLoading ? (
              <span className="spinner-border text-white" />
            ) : (
              "Sign in"
            )}
          </button>
        </Form>
      </>
    );
  };

  return (
    <AuthContainerPage>
      <div className="login position-relative">
        <FaAngleLeft
          fontSize={mobile ? "4rem" : "2rem"}
          color="#000"
          style={{
            position: "absolute",
            top: mobile ? "3rem" : "3.5rem",
            left: "5rem",
            cursor: "pointer",
            zIndex: "999999",
          }}
          onClick={() => history.push(`/reg/create-account`)}
        />
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <h4 className="text-center">Sign In</h4>
            {regForm()}
            <br />
            <p
              className="primary-text text-center font-weight-bolder cursor"
              onClick={() => history.push(routes.forgotPassword)}
            >
              Forgot Password?
            </p>
            {/* /.text-primary */}
            <div className="d-flex justify-content-center">
              <div className="dotted-divider"></div>
            </div>
            <p className="text-center mt-5">Sign in with</p>
            <div className="flexrowaround">
              <div className="img-fluid mb-4 mb-md-0 social-icons ">
                <Facebook handleResponse={handleFacebookLogin} />
              </div>
              <div className="img-fluid mb-4 mb-md-0 social-icons ">
                <Google handleResponse={handleGoogleLogin} />
              </div>
              <div className="img-fluid mb-4 mb-md-0 social-icons ">
                <img
                  src={apple}
                  className="img-fluid mb-4 mb-md-0 social-icons "
                  alt=""
                />
                {/*<Apple handleResponse={handleAppleLogin} />*/}
              </div>
            </div>
            <br />
            {/*</div>*/}
          </div>
          {/* /.col-md-6 */}
        </div>
      </div>
    </AuthContainerPage>
  );
};

export default TwoLoginPage;
