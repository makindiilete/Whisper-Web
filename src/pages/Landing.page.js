import React, { useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import "../assets/css/LandingPage.css";
import logo from "../assets/images/WhisperLogo.svg";
import whisperText from "../assets/images/home/purple-outline-text.svg";
import playstore from "../assets/images/home/Google Play.svg";
import appstore from "../assets/images/home/App Store.svg";

const LandingPage = (props) => {
  let location = useLocation();
  const history = useHistory();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  return (
    <section className="landing">
      <section className="hero-area">
        <div className="hero-area__bg">
          <div className="container-fluid">
            <div className="nav">
              <img src={logo} alt="" className="img-fluid logo" />
              <div className="nav__links">
                <p className="text-white mr-5 padding-none">About Whisper</p>
                <p className="text-white mr-5 padding-none">Contact us</p>
                <p className="text-white mr-5 padding-none">Select</p>
                <button className="btn btn-light">Download the App</button>
              </div>
            </div>
            {/* /.nav */}
            <div className="d-flex justify-content-center">
              <img src={whisperText} alt="" className="img-fluid whisperText" />
            </div>
            <h1 className="text-white text-center heading">
              The safest and most discreet <br /> dating & hookup experience.
            </h1>
            <div
              className="d-flex justify-content-center"
              style={{ marginTop: "2.6rem" }}
            >
              <div className="straightline" />
            </div>
            <br />
            <p className="text-white text-center">
              Viverra adipiscing bibendum quisque id egestas magna et. Sed id
              sed aliquet facilisi <br /> turpis. Sapien ornare nulla cursus
              ullamcorper. Leo quis libero sit lectus diam <br /> pellentesque
              ultricies maecenas.
            </p>
            <br />
            <div className="d-flex justify-content-center">
              <div>
                <img src={playstore} alt="" className="img-fluid storeapps" />
                <img src={appstore} alt="" className="img-fluid storeapps" />
              </div>
            </div>
            <div className="d-flex justify-content-center create-account">
              <button className="btn btn-light">Create Account</button>
            </div>
          </div>
          {/* /.container */}
        </div>
      </section>
      {/* /.hero-area */}
    </section>
  );
};

export default LandingPage;
