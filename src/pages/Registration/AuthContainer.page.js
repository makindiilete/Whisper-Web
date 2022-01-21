import React, { useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import logo from "../../assets/images/WhisperLogo.png";
import "../../assets/css/authPages.css";
import routes from "../../routes";

const AuthContainerPage = ({ children }) => {
  let location = useLocation();
  const history = useHistory();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  return (
    <section className="auth landing">
      <section className="auth__heroArea">
        <div className="nav pt-4">
          <img
            src={logo}
            alt=""
            className="img-fluid logo cursor"
            onClick={() => history.push("/")}
          />
          <div className="nav__links">
            <button
              className="btn btn-outline-light"
              onClick={() => history.push(routes.login)}
            >
              Login
            </button>
          </div>
        </div>
        <div className="content">
          <div className="d-flex justify-content-center">
            <h1 className="whisperText text-center">Whisper</h1>
          </div>

          <div className="container">
            <div className="auth-popUp">{children}</div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default AuthContainerPage;
