import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import useMobile from "../../hooks/useMobile";
import "../../assets/css/authPages.css";
import whisperText from "../../assets/images/home/purple-outline-text.svg";
import logo from "../../assets/images/WhisperLogo.png";
import fb from "../../assets/images/auth/fb.svg";
import google from "../../assets/images/auth/google.svg";
import apple from "../../assets/images/auth/apple.svg";
import { Form, Input } from "antd";
import AuthContainerPage from "./AuthContainer.page";
import routes from "../../routes";

const OneCreateAccountPage = (props) => {
  let location = useLocation();
  const history = useHistory();
  const mobile = useMobile();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
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
          layout="inline"
          scrollToFirstError
          onFinish={handleSubmit}
          size="large"
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
          size="large"
        >
          <Form.Item
            className="mb-3 mb-md-0 mt-2"
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
              placeholder="Email"
              onChange={(e) => handleChange(e.target.value, "firstName")}
            />
          </Form.Item>

          <Form.Item
            className="mb-3 mb-md-0 mt-2"
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
              placeholder="Password"
              onChange={(e) => handleChange(e.target.value, "lastName")}
            />
          </Form.Item>
        </Form>
      </>
    );
  };

  return (
    <AuthContainerPage>
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
            <div className="dotted-divider"></div>
          </div>
          <br />
          <p className="text-center">Sign in with</p>
          <br />
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
        </div>
        {/* /.col-md-6 */}
        <div className="col-md-6 right">
          <h4 className="text-center">Create an Account</h4>
          {regForm()}
          <br />
          {/*<div className="d-flex justify-content-center">*/}
          <button className="btn btn-primary btn-block">Create account</button>
          <br />
          <div className="d-flex justify-content-center">
            <div className="dotted-divider"></div>
          </div>
          <p className="text-center">Create account with</p>
          <div className="flexrowaround" style={{ marginTop: "2.2rem" }}>
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
          {/*</div>*/}
        </div>
        {/* /.col-md-6 */}
        <h4 className="or-divider">OR</h4>
      </div>
    </AuthContainerPage>
  );
};

export default OneCreateAccountPage;
