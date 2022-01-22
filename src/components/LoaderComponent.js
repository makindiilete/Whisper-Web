import React, { useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import loader from "../assets/images/loadingCircle.gif";

const LoaderComponent = (props) => {
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
      <img src={loader} alt="" className="img-fluid w-50" />
    </div>
  );
};

export default LoaderComponent;
