import React, { useContext, useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import useMobile from "../../hooks/useMobile";
import "../../assets/css/auth/authPages.css";
import fb from "../../assets/images/auth/fb.svg";
import google from "../../assets/images/auth/google.svg";
import apple from "../../assets/images/auth/apple.svg";
import { Form, Input, message } from "antd";
import AuthContainerPage from "./AuthContainer.page";
import routes from "../../routes";
import { userRegService } from "../../services/Auth/Registration/registrationService";
import LoaderComponent from "../../components/LoaderComponent";
import { AuthContext } from "../../Utils/context";
import { useDispatch } from "react-redux";
import {
  adminFetchUserAction,
  userAction,
} from "../../redux/actions/userAction";
import FacebookLogin from "react-facebook-login";
import GoogleLogin from "react-google-login";
import { BsFacebook, TiSocialFacebookCircular } from "react-icons/all";
import AppleLogin from "react-apple-login";
import { Facebook } from "../../components/socialAuth/facebook/facebook";
import { Apple } from "../../components/socialAuth/apple/Apple";
import { Google } from "../../components/socialAuth/google/Google";
import {
  fbLoginService,
  googleLoginService,
} from "../../services/Auth/Login/loginService";
import {
  fbUpdateService,
  googleUpdateService,
} from "../../services/Auth/Registration/Update Social Details/socialDetailsService";

const OneCreateAccountPage = (props) => {
  let location = useLocation();
  const history = useHistory();
  const mobile = useMobile();
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  const { user, setUser } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  function handleResponse(response, reg) {
    if (response.ok) {
      if (reg) {
        localStorage.setItem("token", response?.data?.data?.token);
        dispatch(userAction(response?.data?.data));
        history.push(routes.usertype);
      } else {
        localStorage.setItem("token", response?.data?.data?.token);
        dispatch(adminFetchUserAction(response?.data?.data?._id));
        history.push(
          response?.data?.data?.userType?.toLowerCase() === "customer"
            ? routes.CUSTOMER_HOME
            : routes.PROVIDER_HOME
        );
      }
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
    // console.log("Apple response = ", user);
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setIsLoading(true);
      const response = await userRegService(values);
      setIsLoading(false);
      if (response.ok) {
        localStorage.setItem("token", response?.data?.data?.token);
        dispatch(userAction(response?.data?.data));
        history.push(routes.usertype);
      } else {
        message.error(
          response?.data?.errors[0].message || "Something went wrong"
        );
      }
    } catch (error) {
      console.log("Errors = ", error.errorFields);
    }
  };

  const handleGoogleReg = async (user) => {
    setIsLoading(true);
    const response = await userRegService({
      firstName: user?.profileObj?.givenName,
      lastName: user?.profileObj?.familyName,
      email: user?.profileObj?.email,
      google: {
        id: user?.profileObj?.googleId,
        email: user?.profileObj?.email,
      },
    });
    setIsLoading(false);
    handleResponse(response, "reg");
  };

  const handleFacebookReg = async (user) => {
    setIsLoading(true);
    const response = await userRegService({
      firstName: user?.name?.split(" ")[0],
      lastName: user?.name?.split(" ")[1],
      email: user?.email,
      facebook: {
        id: user?.id,
        email: user?.email,
      },
    });
    setIsLoading(false);
    handleResponse(response, "reg");
  };

  const handleAppleReg = (user) => {
    // console.log("Apple response = ", user);
  };

  function handleChange(value, name) {
    setData({ ...data, [name]: value });
  }

  const regForm = () => {
    return (
      <>
        <Form
          layout="inline"
          scrollToFirstError
          onFinish={handleSubmit}
          size="large"
          form={form}
        >
          <Form.Item
            className="mb-3 mb-md-0 mt-2 inline-form"
            initialValue=""
            name="firstName"
            rules={[
              {
                required: true,
                message: "Required field",
              },
            ]}
          >
            <Input
              placeholder="First Name"
              onChange={(e) => handleChange(e.target.value, "firstName")}
            />
          </Form.Item>

          <Form.Item
            className="mb-3 mb-md-0 mt-2 inline-form"
            style={{ marginRight: 0 }}
            initialValue=""
            name="lastName"
            rules={[
              {
                required: true,
                message: "Required field",
              },
            ]}
          >
            <Input
              placeholder="Last Name"
              onChange={(e) => handleChange(e.target.value, "lastName")}
            />
          </Form.Item>
        </Form>

        <Form
          layout="vertical"
          scrollToFirstError
          onFinish={handleSubmit}
          form={form}
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
              {
                type: "email",
                message: "Invalid Email",
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
              {
                min: 6,
                message: "Password length must be at least 6 characters",
              },
            ]}
          >
            <Input.Password
              placeholder="Password"
              onChange={(e) => handleChange(e.target.value, "password")}
            />
          </Form.Item>
        </Form>
      </>
    );
  };

  return (
    <AuthContainerPage>
      {isLoading && <LoaderComponent />}
      {!isLoading && (
        <div className="row">
          <div className="col-md-6 left">
            <h4 className="text-center">
              Find a companion on <br /> Whisper today.
            </h4>
            <p className="text-center">Connect with people for a good time</p>
            <br />
            <div className="d-flex justify-content-center">
              <button
                className="btn btn-outline-primary align-self-center"
                onClick={() => history.push(routes.login)}
              >
                Sign in with your email address
              </button>
            </div>
            <br />
            <br />
            <br />
            <div className="d-flex justify-content-center">
              <div className="dotted-divider" />
            </div>
            <br />
            <p className="text-center">Sign in with</p>
            <br />
            <div className="flexrowaround">
              <div className="img-fluid mb-4 mb-md-0 social-icons ">
                <Facebook handleResponse={handleFacebookLogin} />
              </div>

              <div className="img-fluid mb-4 mb-md-0 social-icons ">
                <Google handleResponse={handleGoogleLogin} />
              </div>

              <div className="img-fluid mb-4 mb-md-0 social-icons ">
                {/*<Apple handleResponse={handleAppleLogin} />*/}
                <img
                  src={apple}
                  className="img-fluid mb-4 mb-md-0 social-icons "
                  alt=""
                />
              </div>
            </div>
          </div>
          {/* /.col-md-6 */}
          <div className="col-md-6 right">
            <h4 className="text-center">Create an Account</h4>
            {regForm()}
            <br />
            {/*<div className="d-flex justify-content-center">*/}
            <button
              className="btn btn-primary btn-block"
              onClick={handleSubmit}
            >
              Create account
            </button>
            <br />
            <div className="d-flex justify-content-center">
              <div className="dotted-divider" />
            </div>
            <p className="text-center">Create account with</p>
            <div className="flexrowaround" style={{ marginTop: "2.2rem" }}>
              <div className="img-fluid mb-4 mb-md-0 social-icons ">
                <Facebook handleResponse={handleFacebookReg} />
              </div>
              <div className="img-fluid mb-4 mb-md-0 social-icons ">
                <Google handleResponse={handleGoogleReg} />
              </div>
              <div className="img-fluid mb-4 mb-md-0 social-icons ">
                {/*<Apple handleResponse={handleAppleReg} />*/}
                <img
                  src={apple}
                  className="img-fluid mb-4 mb-md-0 social-icons "
                  alt=""
                />
              </div>
            </div>
            {/*</div>*/}
          </div>
          {/* /.col-md-6 */}
          <h4 className="or-divider">OR</h4>
        </div>
      )}
    </AuthContainerPage>
  );
};

export default OneCreateAccountPage;
