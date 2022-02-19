//21
import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import useMobile from "../../hooks/useMobile";
import { Form, Input, message } from "antd";
import AuthContainerPage from "./AuthContainer.page";
import { FaAngleLeft } from "react-icons/all";
import routes from "../../routes";
import SuccessModal from "../../components/Modals/successModal";
import {
  finalizePasswordResetService,
  initiatePasswordResetService,
} from "../../services/Auth/Password Reset/passwordResetService";
import LoaderComponent from "../../components/LoaderComponent";

const ResetPasswordPage = (props) => {
  let location = useLocation();
  const history = useHistory();
  const mobile = useMobile();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [data, setData] = useState({
    authCode: "",
    email: "",
    password: "",
    confirmNewPassword: "",
  });

  const handleSubmit = async (values) => {
    setIsLoading(true);
    const response = await finalizePasswordResetService({
      authCode: values.authCode,
      email: values.email,
      password: values.password,
    });
    setIsLoading(false);
    if (response.ok) {
      setShowSuccessModal(true);
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
            name="authCode"
            rules={[
              {
                required: true,
                message: "Required field",
              },
            ]}
          >
            <Input
              placeholder="Auth Code Received"
              onChange={(e) => handleChange(e.target.value, "authCode")}
            />
          </Form.Item>
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
              {
                min: 6,
                message: "Password must be at least 6 characters",
              },
            ]}
          >
            <Input.Password
              placeholder="New Password"
              onChange={(e) => handleChange(e.target.value, "password")}
            />
          </Form.Item>
          <Form.Item
            className="mb-3 mb-md-0 mt-2"
            initialValue=""
            name="confirmNewPassword"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Required field",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "The two passwords that you entered do not match!"
                    )
                  );
                },
              }),
            ]}
          >
            <Input.Password
              placeholder="Confirm Password"
              onChange={(e) =>
                handleChange(e.target.value, "confirmNewPassword")
              }
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
                  <h4 className="text-center">Reset Password</h4>
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
      <SuccessModal
        title="Changes Saved"
        subtitle="Your password has been successfully changed"
        visible={showSuccessModal}
        onCancel={() => {
          setShowSuccessModal(false);
          history.push(routes.login);
        }}
      />
    </AuthContainerPage>
  );
};

export default ResetPasswordPage;
