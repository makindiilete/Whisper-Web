//20
import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import useMobile from "../../hooks/useMobile";
import { Form, Input, message } from "antd";
import AuthContainerPage from "./AuthContainer.page";
import { FaAngleLeft } from "react-icons/all";
import fb from "../../assets/images/auth/fb.svg";
import google from "../../assets/images/auth/google.svg";
import apple from "../../assets/images/auth/apple.svg";
import routes from "../../routes";
import { loginService } from "../../services/Auth/Login/loginService";
import { initiatePasswordResetService } from "../../services/Auth/Password Reset/passwordResetService";
import { adminFetchUserAction } from "../../redux/actions/userAction";
import LoaderComponent from "../../components/LoaderComponent";

const ForgotPasswordPage = (props) => {
  let location = useLocation();
  const history = useHistory();
  const mobile = useMobile();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({
    email: "",
  });

  const handleSubmit = async (values) => {
    setIsLoading(true);
    const response = await initiatePasswordResetService(values);
    setIsLoading(false);
    console.log("response = ", response);
    if (response.ok) {
      message.success(response?.data?.message);
      history.push(routes.resetPassword);
    } else {
      message.error(
        response?.data?.errors[0].message || "Something went wrong"
      );
    }
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
          <br />
          <button className="btn btn-primary btn-block">Continue</button>
        </Form>
      </>
    );
  };
  return (
    <AuthContainerPage>
      {isLoading ? (
        <LoaderComponent />
      ) : (
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
            onClick={() => history.goBack()}
          />
          <div className="row">
            <div className="col-md-6 offset-md-3">
              <div className="d-flex flex-column justify-content-around h-100">
                <div className="w-100">
                  <h4 className="text-center">Forgot Password?</h4>
                  <p className="text-center">
                    A password reset link will be sent to your email address.
                    Please use the link to reset your password.
                  </p>
                </div>
                {regForm()}
              </div>
            </div>
            {/* /.col-md-6 */}
          </div>
        </div>
      )}
    </AuthContainerPage>
  );
};

export default ForgotPasswordPage;
