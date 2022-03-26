import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import useMobile from "../../../hooks/useMobile";
import { message } from "antd";
import routes from "../../../routes";
import {
  customerSelfieVerificationService,
  updateCustomerProfilePicWithLinkService,
} from "../../../services/Customers/Profile/ProfileService";
import { updateProviderProfilePicWithLinkService } from "../../../services/Providers/Profile/ProfileService";
import { adminFetchUserAction } from "../../../redux/actions/userAction";
import { useDispatch } from "react-redux";
import Webcam from "react-webcam";

const StepThree = ({
  currentStep,
  setCurrentStep,
  title,
  subTitle,
  user,
  userType,
}) => {
  let location = useLocation();
  const history = useHistory();
  const mobile = useMobile();
  const dispatch = useDispatch();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  const webcamRef = React.useRef(null);
  const [imgSrc, setImgSrc] = React.useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [imgPath, setImgPath] = useState(null);

  const capture = React.useCallback(() => {
    setImgPath(null);
    const imageSrc = webcamRef.current.getScreenshot();
    setImgPath(imageSrc);
  }, [webcamRef, setImgSrc]);

  const handleSubmit = async () => {
    const data = {
      userId: user?._id,
      selfiePhotoUri: imgPath,
    };
    setIsLoading(true);
    const response = await customerSelfieVerificationService(data);
    setIsLoading(false);
    if (response.ok) {
      dispatch(adminFetchUserAction(user?._id));
      history.push(routes.verifyphonenumber);
    } else {
      message.error(
        response?.data?.errors[0].message || "Something went wrong"
      );
    }
  };

  return (
    <>
      <div
        className="d-flex flex-column justify-content-around  h-100 col-md-6 offset-md-3"
        style={{ minHeight: "47.4rem" }}
      >
        <div className="w-100">
          <br />
          <h4 className="text-center mt-5 mt-md-0">{title}</h4>
          <p className="text-center">{subTitle}</p>
        </div>
        <div className="d-flex justify-content-center align-items-center">
          <div className="uploadBox rounded">
            <div
              className=" w-100 h-100"
              style={{
                borderRadius: "50%",
                backgroundColor: "lightgrey",
                overflow: "hidden",
              }}
            >
              {imgPath ? (
                <img
                  src={imgPath}
                  alt=""
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <Webcam
                  audio={false}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                />
              )}
            </div>
          </div>
          {/* /.uploadBox */}
        </div>
        <div className="d-flex justify-content-center mb-4">
          {!imgPath ? (
            <p className="primary-text text-center cursor" onClick={capture}>
              Take a Selfie
            </p>
          ) : (
            <p className="primary-text text-center cursor" onClick={capture}>
              Retake Selfie
            </p>
          )}
        </div>
        <button
          className="btn btn-primary"
          disabled={!imgPath || isLoading}
          onClick={handleSubmit}
          // style={mobile ? null : { margin: "6rem 30rem" }}
        >
          {isLoading ? (
            <span className="spinner-border text-white" />
          ) : (
            "Continue"
          )}
        </button>

        {/* /.primary-text */}
      </div>
    </>
  );
};

export default StepThree;
