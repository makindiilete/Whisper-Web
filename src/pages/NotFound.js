import React from "react";
import failureImg from "../assets/images/SVG/notFoundHere.svg";
import { useHistory } from "react-router-dom";
const NotFound = (props) => {
  const history = useHistory();
  return (
    <div className="container-fluid">
      <div
        style={{ height: "100vh" }}
        className="d-flex flex-column align-items-center justify-content-center"
      >
        <img
          src={failureImg}
          alt=""
          className="img-fluid"
          style={{ width: "20rem" }}
        />
        <br />
        <h3 className="font-weight-bold primary-text">Oops! page not found</h3>
        <br />
        <p className="text-center" style={{ maxWidth: "500px" }}>
          It looks like nothing was found at this location. Click the button
          below to return home.
        </p>
        <br />
        <button className="btn btn-primary" onClick={() => history.push("/")}>
          Homepage{" "}
        </button>
      </div>
    </div>
  );
};

export default NotFound;
