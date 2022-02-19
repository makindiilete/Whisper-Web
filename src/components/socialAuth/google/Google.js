import React from "react";
import FacebookLogin from "react-facebook-login";
import { BsFacebook } from "react-icons/all";
import "../socialAuth.css";
import { message } from "antd";
import google from "../../../assets/images/auth/google.svg";
import GoogleLogin from "react-google-login";

export function Google({ handleResponse }) {
  return (
    <GoogleLogin
      clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
      onSuccess={handleResponse}
      onFailure={() => message.error("Google login failed")}
      cookiePolicy={"single_host_origin"}
      className="google"
      render={(renderProps) => (
        <img
          onClick={renderProps.onClick}
          src={google}
          className="img-fluid mb-4 mb-md-0 social-icons "
          alt=""
        />
      )}
    />
  );
}
