import React, { useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import logo from "../../assets/images/WhisperLogo.png";
import "../../assets/css/auth/authPages.css";
import styles from "../../assets/css/navs/authContainer.module.css";
import routes from "../../routes";
import useMobile from "../../hooks/useMobile";

const AuthContainerPage = ({ children }) => {
  let location = useLocation();
  const history = useHistory();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  const mobile = useMobile();
  return (
    <section className="auth landing">
      <section className="auth__heroArea">
        <div className={`pt-4 ${styles.nav}`}>
          <img
            src={logo}
            alt=""
            style={
              mobile
                ? { width: "12rem", height: "12rem", objectFit: "container" }
                : null
            }
            className="img-fluid logo cursor"
            onClick={() => history.push("/")}
          />
          <div className={styles.nav__links}>
            <button
              className={`btn btn-outline-light ${styles.btn}`}
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
