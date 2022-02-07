import React from "react";
import logo2 from "../assets/images/WhisperLogo.png";
import "../assets/css/LandingPage.css";
import { useHistory } from "react-router-dom";
import routes from "../routes";

const Footer = () => {
  const history = useHistory();
  return (
    <section className="landing footer py-5">
      <div className="logoListitem">
        <div className="media mb-2">
          <div style={{ width: "12rem" }}>
            <img
              className="d-flex align-items-center img-fluid"
              src={logo2}
              alt="Generic placeholder image"
            />
          </div>
          <div className="media-body">
            <small>
              Lorem ipsum dolor sit amet, consectetur <br /> adipiscing elit.
              Imperdiet donec purus vehicula <br /> lectus est. Et sed tincidunt
              adipiscing non, semper.
            </small>
          </div>
        </div>
        <div className="straightline-white" />
        <br />
        <small className="ml-5">
          4517 Washington Ave. Manchester, <br />{" "}
          <span className="ml-5">Kentucky 39495</span>
        </small>
        <br />
        <small className="ml-5">
          (C) Whisper {new Date().getFullYear()}. All rights reserved.
        </small>
      </div>
      <div className="footer-item mt-5 mt-md-0">
        <h5 className="text-white">The Company</h5>
        <ul className="no-bullet-list">
          <li onClick={() => history.push(routes.ABOUT)}>About Whisper</li>
          <li onClick={() => history.push(routes.CONTACT)}>Contact Us</li>
          <li>FAQ</li>
        </ul>
      </div>
      <div className="footer-item">
        <h5 className="text-white">Legal</h5>
        <ul className="no-bullet-list">
          <li onClick={() => history.push(routes.TERMS)}>Terms & Conditions</li>
          <li>Privacy Policy</li>
        </ul>
      </div>

      <div className="footer-item">
        <h5 className="text-white">Follow Us</h5>
        <ul className="no-bullet-list">
          <li onClick={() => history.push(routes.TERMS)}>Terms & Conditions</li>
          <li>Privacy Policy</li>
        </ul>
      </div>
    </section>
  );
};

export default Footer;
