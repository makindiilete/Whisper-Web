import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import useMobile from "../../../hooks/useMobile";
import AuthContainerPage from "../AuthContainer.page";
import LoaderComponent from "../../../components/LoaderComponent";
import { FaAngleLeft } from "react-icons/all";
import styles from "../../../assets/css/auth/yourAttributes.module.css";
import img1 from "../../../assets/images/auth/typeOfuser/companion.svg";
import img2 from "../../../assets/images/auth/typeOfuser/xrated.svg";
import img3 from "../../../assets/images/auth/typeOfuser/both.svg";
import routes from "../../../routes";

const WhatTypeOfServiceAreYouProvidingPage = (props) => {
  let location = useLocation();
  const history = useHistory();
  const mobile = useMobile();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  const [isLoading, setIsLoading] = useState(false);
  const [selected, setSelected] = useState();
  return (
    <AuthContainerPage>
      {isLoading ? (
        <LoaderComponent />
      ) : (
        <div className="uploadPhotos position-relative ">
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
          <div className="container px-5 pb-5 pb-md-0">
            <div
              className="d-flex flex-column justify-content-around"
              // style={{ minHeight: "47.4rem", marginBottom: "-10rem" }}
              style={{ minHeight: "47.4rem" }}
            >
              <div className="w-100">
                <br />
                <h4 className="text-center mt-5 mt-md-0">
                  What type of service will you be providing?
                </h4>
                <p className="text-center">
                  Start by choosing the type of service you want to provide.
                </p>
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
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Sodales proin enim
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
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Sodales proin enim
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
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Sodales proin enim
                    </small>
                  </div>
                </div>
              </div>
              <div className="row">
                <div
                  className={`col-md-6 offset-md-3 ${styles.attributesCol} `}
                >
                  <button
                    className={`btn btn-primary btn-block`}
                    disabled={!selected}
                    onClick={() => history.push(routes.whoWillYouProvideTo)}
                  >
                    Continue
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* /.col-md-6 */}
        </div>
      )}
    </AuthContainerPage>
  );
};

export default WhatTypeOfServiceAreYouProvidingPage;
