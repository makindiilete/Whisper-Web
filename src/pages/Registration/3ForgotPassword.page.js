//20
import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import useMobile from "../../hooks/useMobile";
import { Form, Input } from "antd";
import AuthContainerPage from "./AuthContainer.page";
import { FaAngleLeft } from "react-icons/all";
import fb from "../../assets/images/auth/fb.svg";
import google from "../../assets/images/auth/google.svg";
import apple from "../../assets/images/auth/apple.svg";
import routes from "../../routes";

const ForgotPasswordPage = (props) => {
  let location = useLocation();
  const history = useHistory();
  const mobile = useMobile();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  const [data, setData] = useState({
    email: "",
  });

  const handleSubmit = (values) => {};

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
              onChange={(e) => handleChange(e.target.value, "firstName")}
            />
          </Form.Item>
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
              <button
                className="btn btn-primary btn-block"
                onClick={() => history.push(routes.resetPassword)}
              >
                Continue
              </button>
            </div>
          </div>
          {/* /.col-md-6 */}
        </div>
      </div>
    </AuthContainerPage>
  );
};

export default ForgotPasswordPage;
