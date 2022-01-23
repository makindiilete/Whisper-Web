import React, { useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import loader from "../assets/images/loadingCircle.gif";
import loaderPrimary from "../assets/images/loadingCirclePrimaryLight.gif";

const LoaderComponent = ({ theme = "default" }) => {
  let location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        zIndex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img
        src={theme === "default" ? loader : loaderPrimary}
        alt=""
        className="img-fluid w-25"
      />
    </div>
  );
};

export default LoaderComponent;
