//21
import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import useMobile from "../../hooks/useMobile";
import { Form, Input } from "antd";
import AuthContainerPage from "./AuthContainer.page";
import { FaAngleLeft } from "react-icons/all";
import routes from "../../routes";
import SuccessModal from "../../components/Modals/successModal";

const ResetPasswordPage = (props) => {
  let location = useLocation();
  const history = useHistory();
  const mobile = useMobile();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [data, setData] = useState({
    email: "",
  });

  const handleSubmit = (values) => {
    console.log(values);
    // history.push(routes.login);
    setShowSuccessModal(true);
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
              placeholder="New Password"
              onChange={(e) => handleChange(e.target.value, "firstName")}
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
              placeholder="Confirm Password"
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
                <h4 className="text-center">Reset Password</h4>
                <p className="text-center">
                  A password reset link will be sent to your email address.
                  Please use the link to reset your password.
                </p>
              </div>
              {regForm()}
              <button
                className="btn btn-primary btn-block"
                onClick={() => handleSubmit([])}
              >
                Continue
              </button>
            </div>
          </div>
          {/* /.col-md-6 */}
        </div>
      </div>
      <SuccessModal
        title="Changes Saved"
        subtitle="Your password has been successfully changed"
        visible={showSuccessModal}
        onCancel={() => setShowSuccessModal(false)}
      />
    </AuthContainerPage>
  );
};

export default ResetPasswordPage;
