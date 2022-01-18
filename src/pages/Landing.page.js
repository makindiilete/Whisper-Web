import React, { useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import "../assets/css/LandingPage.css";
import logo from "../assets/images/WhisperLogo.svg";

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
                <button className="btn ">Download the App</button>
              </div>
            </div>
            {/* /.nav */}
            Contact Us Select
          </div>
          {/* /.container */}
        </div>
      </section>
      {/* /.hero-area */}
    </section>
  );
};

export default LandingPage;
