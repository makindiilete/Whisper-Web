import React from "react";
import FacebookLogin from "react-facebook-login";
import { BsFacebook } from "react-icons/all";
import "../socialAuth.css";

export function Facebook({ handleResponse }) {
  return (
    <FacebookLogin
      appId={process.env.REACT_APP_FACEBOOK_APP_ID}
      autoLoad={false}
      fields="name,email,picture"
      callback={handleResponse}
      textButton="Facebook"
      isMobile={false}
      icon={
        <div className="socialPill__icon">
          <BsFacebook color="#3c79e6" />
        </div>
      }
      cssClass="socialPill socialPill__fb"
    />
  );
}
