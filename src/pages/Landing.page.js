import React, { useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import "../assets/css/LandingPage.css";
import logo from "../assets/images/WhisperLogo.svg";
import whisperText from "../assets/images/home/purple-outline-text.svg";
import playstore from "../assets/images/home/Google Play.svg";
import appstore from "../assets/images/home/App Store.svg";
import beautifulpeople from "../assets/images/home/bueatifulpeople.jpg";
import lonely from "../assets/images/home/lonely.jpg";
import safe from "../assets/images/home/safe.jpg";
import heroareatwo from "../assets/images/home/hero-area-two.jpg";

const LandingPage = (props) => {
  let location = useLocation();
  const history = useHistory();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  return (
    <section className="landing bg-white">
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
            <div
              style={{
                height: "80vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div>
                <div className="d-flex justify-content-center">
                  <img
                    src={whisperText}
                    alt=""
                    className="img-fluid whisperText"
                  />
                </div>
                <h1 className="text-white text-center heading">
                  The safest and most discreet <br /> dating & hookup
                  experience.
                </h1>
                <div
                  className="d-flex justify-content-center"
                  style={{ marginTop: "2.6rem" }}
                >
                  <div className="straightline" />
                </div>
                <br />
                <p className="text-white text-center">
                  Viverra adipiscing bibendum quisque id egestas magna et. Sed
                  id sed aliquet facilisi <br /> turpis. Sapien ornare nulla
                  cursus ullamcorper. Leo quis libero sit lectus diam <br />{" "}
                  pellentesque ultricies maecenas.
                </p>
                <br />
                <div className="d-flex justify-content-center ">
                  <div>
                    <img
                      src={playstore}
                      alt=""
                      className="img-fluid storeapps mr-4"
                    />
                    <img
                      src={appstore}
                      alt=""
                      className="img-fluid storeapps"
                    />
                  </div>
                </div>
                <div className="d-flex justify-content-center create-account">
                  <button className="btn btn-light" style={{ width: "auto" }}>
                    Create Account
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* /.container */}
        </div>
      </section>
      <section className="mini-sections">
        <div className="container">
          <div className="row">
            <div className="col-md-6 d-block d-md-flex align-items-md-center ">
              <img
                src={beautifulpeople}
                className="img-fluid beautiful"
                alt=""
              />
            </div>
            <div className="col-md-6 d-block d-md-flex align-items-md-center ">
              <div>
                <h3>Beautiful People</h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Imperdiet donec purus vehicula lectus est. Et sed tincidunt
                  adipiscing non, semper. Sem faucibus posuere scelerisque
                  porttitor amet purus. Lorem in risus convallis felis.
                </p>
                <div className="flexrow">
                  <button className="btn btn-primary">Download the App</button>
                  <button className="btn btn-light">Create the Account</button>
                </div>
              </div>
            </div>
            {/* /.col-md-6 */}
          </div>
          {/* /.row */}
        </div>
        {/* /.container */}
      </section>
      <section className="mini-sections">
        <div className="container">
          <div className="row">
            <div className="col-md-6 d-block d-md-flex align-items-md-center ">
              <div>
                <h3>
                  Don’t be lonely tonight. <br /> Get a Companion on Whisper{" "}
                </h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Imperdiet donec purus vehicula lectus est. Et sed tincidunt
                  adipiscing non, semper. Sem faucibus posuere scelerisque
                  porttitor amet purus. Lorem in risus convallis felis.
                </p>
                <div className="flexrow">
                  <button className="btn btn-primary">Download the App</button>
                  <button className="btn btn-light">Create the Account</button>
                </div>
              </div>
            </div>
            <div className="col-md-6 d-block d-md-flex align-items-md-center ">
              <img src={lonely} className="img-fluid beautiful" alt="" />
            </div>
          </div>
          {/* /.row */}
        </div>
        {/* /.container */}
      </section>
      <section className="mini-sections">
        <div className="container">
          <div className="row">
            <div className="col-md-6 d-block d-md-flex align-items-md-center ">
              <img src={safe} className="img-fluid beautiful" alt="" />
            </div>
            <div className="col-md-6 d-block d-md-flex align-items-md-center ">
              <div>
                <h3>Safe & Secure</h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Imperdiet donec purus vehicula lectus est. Et sed tincidunt
                  adipiscing non, semper. Sem faucibus posuere scelerisque
                  porttitor amet purus. Lorem in risus convallis felis.
                </p>
                <div className="flexrow">
                  <button className="btn btn-primary">Download the App</button>
                  <button className="btn btn-light">Create the Account</button>
                </div>
              </div>
            </div>
            {/* /.col-md-6 */}
          </div>
          {/* /.row */}
        </div>
        {/* /.container */}
      </section>
      <section className="hero-area-two">
        <div className="container-fluid">
          <h1 className="text-white heading text-center mb-5">
            Meet a Companion and get <br /> the most interesting fun time.
          </h1>
          <div className="d-flex justify-content-center ">
            <div>
              <img
                src={playstore}
                alt=""
                className="img-fluid storeapps mr-4"
              />
              <img src={appstore} alt="" className="img-fluid storeapps" />
            </div>
          </div>
        </div>
      </section>
      <section className="footer py-5 h-25"></section>
      {/*<div className="mini-sections"></div>*/}
      {/* /.hero-area-two */}
      {/* /.hero-area */}
    </section>
  );
};

export default LandingPage;
