import React from "react";
import "../socialAuth.css";
import AppleLogin from "react-apple-login";
import apple from "../../../assets/images/auth/apple.svg";

export function Apple({ handleResponse }) {
  return (
    <AppleLogin
      clientId="com.react.apple.login"
      usePopup
      responseType={"code"}
      responseMode={"query"}
      callback={handleResponse}
      render={(renderProps) => (
        <img
          onClick={renderProps.onClick}
          src={apple}
          className="img-fluid mb-4 mb-md-0 social-icons "
          alt=""
        />
      )}
      redirectURI=""
    />
  );
}
