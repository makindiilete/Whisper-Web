import React, { useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import useMobile from "../../hooks/useMobile";
import "../../assets/css/authPages.css";
import whisperText from "../../assets/images/home/purple-outline-text.svg";
import logo from "../../assets/images/WhisperLogo.png";
import fb from "../../assets/images/auth/fb.svg";
import google from "../../assets/images/auth/google.svg";
import apple from "../../assets/images/auth/apple.svg";

const OneCreateAccountPage = (props) => {
  let location = useLocation();
  const history = useHistory();
  const mobile = useMobile();
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
            <button className="btn btn-outline-light">Login</button>
          </div>
        </div>
        <div className="content">
          <div className="d-flex justify-content-center">
            <h1 className="whisperText text-center">Whisper</h1>
          </div>

          <div className="container">
            <div className="auth-popUp">
              <div className="row">
                <div className="col-md-6 left">
                  <h3 className="text-center">
                    Find a companion on <br /> Whisper today.
                  </h3>
                  <p className="text-center">
                    Connect with people for a good time
                  </p>
                  <br />
                  <div className="d-flex justify-content-center">
                    <button className="btn btn-outline-primary align-self-center">
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
                <div className="col-md-6 right"></div>
                {/* /.col-md-6 */}
                <h4 style={{ position: "absolute", top: "50%", left: "48.5%" }}>
                  OR
                </h4>
              </div>
              {/* /.row */}
            </div>
          </div>
        </div>
      </section>
      {/* /.auth__heroArea */}
    </section>
  );
};

export default OneCreateAccountPage;
