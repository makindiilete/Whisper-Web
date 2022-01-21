import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import useMobile from "../../hooks/useMobile";
import routes from "../../routes";
import fb from "../../assets/images/auth/fb.svg";
import google from "../../assets/images/auth/google.svg";
import apple from "../../assets/images/auth/apple.svg";
import AuthContainerPage from "./AuthContainer.page";
import { Form, Input } from "antd";
import { FaAngleLeft } from "react-icons/all";

const TwoLoginPage = (props) => {
  let location = useLocation();
  const history = useHistory();
  const mobile = useMobile();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (values) => {
    console.log(values);
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
              onChange={(e) => handleChange(e.target.value, "firstName")}
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
            <Input
              placeholder="Password"
              onChange={(e) => handleChange(e.target.value, "lastName")}
            />
          </Form.Item>
          <br />
          {/*<div className="d-flex justify-content-center">*/}
          <button className="btn btn-primary btn-block">Sign in</button>
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
          }}
          onClick={() => history.goBack()}
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
              <img
                src={fb}
                className="img-fluid mb-4 mb-md-0 social-icons "
                alt=""
              />
              <img
                src={google}
                className="img-fluid  mb-4 mb-md-0 social-icons "
                alt=""
              />
              <img
                src={apple}
                className="img-fluid  mb-4 mb-md-0 social-icons "
                alt=""
              />
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