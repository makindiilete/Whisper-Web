import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import AuthContainerPage from "../AuthContainer.page";
import { FaAngleLeft } from "react-icons/all";
import img1 from "../../../assets/images/auth/typeOfuser/companion.svg";
import img2 from "../../../assets/images/auth/typeOfuser/xrated.svg";
import img3 from "../../../assets/images/auth/typeOfuser/both.svg";
import routes from "../../../routes";
import useMobile from "../../../hooks/useMobile";
import styles from "../../../assets/css/auth/yourAttributes.module.css";

const ProviderTypeOfServicePage = (props) => {
  let location = useLocation();
  const history = useHistory();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  const mobile = useMobile();
  const [selected, setSelected] = useState();
  return (
    <AuthContainerPage>
      <div className="typeOfUser position-relative">
        <FaAngleLeft
          fontSize={mobile ? "4rem" : "2rem"}
          color="#000"
          style={{
            position: "absolute",
            top: mobile ? "3rem" : "3.5rem",
            left: "5rem",
            cursor: "pointer",
            zIndex: "999999",
          }}
          onClick={() => history.goBack()}
        />
        <br />
        <br />
        <div className="row">
          <div className={`col-md-6 offset-md-3 ${styles.attributesCol}`}>
            <div className="d-flex flex-column justify-content-around h-100">
              <div className="w-100">
                <h4 className="text-center mt-5 mt-md-0">
                  What type of service will you be providing?
                </h4>
                <p className="text-center">
                  Start by choosing the type of service you want to provide.
                </p>
              </div>
            </div>
          </div>
          {/* /.col-md-6 */}
        </div>
        <div className="flexrowaround typeOfProvider__cards">
          <div
            className={`d-flex justify-content-center align-items-center  ${
              selected === 1 && "active"
            }`}
            onClick={() => setSelected(1)}
          >
            <div className="d-flex flex-column">
              <div className="d-flex justify-content-center">
                <img
                  src={img1}
                  className="img-fluid"
                  alt=""
                  style={{
                    width: "6.2rem",
                    objectFit: "contain",
                    height: "6.2rem",
                  }}
                />
              </div>
              <h5 className="text-center mt-4">Companion</h5>
              <small className="text-center">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sodales
                proin enim
              </small>
            </div>
          </div>
          <div
            className={`d-flex justify-content-center align-items-center  ${
              selected === 2 && "active"
            }`}
            onClick={() => setSelected(2)}
          >
            <div className="d-flex flex-column">
              <div className="d-flex justify-content-center">
                <img
                  src={img2}
                  className="img-fluid"
                  alt=""
                  style={{
                    width: "6.2rem",
                    objectFit: "contain",
                    height: "6.2rem",
                  }}
                />
              </div>
              <h5 className="text-center mt-4">X-Rated</h5>
              <small className="text-center">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sodales
                proin enim
              </small>
            </div>
          </div>

          <div
            className={`d-flex justify-content-center align-items-center  ${
              selected === 3 && "active"
            }`}
            onClick={() => setSelected(3)}
          >
            <div className="d-flex flex-column">
              <div className="d-flex justify-content-center">
                <img
                  src={img3}
                  className="img-fluid"
                  alt=""
                  style={{
                    width: "6.2rem",
                    objectFit: "contain",
                    height: "6.2rem",
                  }}
                />
              </div>
              <h5 className="text-center mt-4">Both</h5>
              <small className="text-center">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sodales
                proin enim
              </small>
            </div>
          </div>
        </div>
        {/* /.d-flex justify-content-between */}
        <div className="row">
          <div className={`col-md-6 offset-md-3 ${styles.attributesCol} `}>
            <button
              className="btn btn-primary btn-block mb-5"
              onClick={() => history.push(routes.createyourprofile)}
              disabled={!selected}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </AuthContainerPage>
  );
};

export default ProviderTypeOfServicePage;
