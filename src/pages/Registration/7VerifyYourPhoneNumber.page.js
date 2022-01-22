// 50 - 53
import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import useMobile from "../../hooks/useMobile";
import { Form, Input, Upload } from "antd";
import routes from "../../routes";
import AuthContainerPage from "./AuthContainer.page";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { isValidPhoneNumber } from "react-phone-number-input";
import { FaAngleLeft } from "react-icons/all";
import LoaderComponent from "../../components/LoaderComponent";
import SuccessModal from "../../components/Modals/successModal";
import modalImg from "../../assets/images/auth/40.svg";

const VerifyYourPhoneNumberPage = (props) => {
  let location = useLocation();
  const history = useHistory();
  const mobile = useMobile();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  const [phoneNumberError, setPhoneNumberError] = useState(false);
  const [invalidPhoneNumberError, setInvalidPhoneNumberError] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState();
  const [otpCode, setOtpCode] = useState(null);
  const [showOtp, setShowOtp] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const checkPhoneValidity = (phone) => {
    return isValidPhoneNumber(`${phone}`);
  };

  const handleSubmit = (values) => {
    console.log("Values = ", values);
  };

  return (
    <AuthContainerPage>
      {isLoading ? (
        <LoaderComponent />
      ) : (
        <div className="typeOfUser position-relative verifyPhone">
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
              style={{ minHeight: "47.4rem" }}
            >
              <div className="w-100">
                <br />
                <h4 className="text-center mt-5 mt-md-0">
                  Verify Your Phone Number
                </h4>
                <p className="text-center">
                  {showOtp
                    ? "We sent a 6 digit code to your phone"
                    : "Verify your account with phone number"}
                </p>
              </div>
              <div>
                {!showOtp ? (
                  <Form
                    layout="vertical"
                    scrollToFirstError
                    onFinish={handleSubmit}
                  >
                    <PhoneInput
                      enableSearch
                      country={"us"}
                      value={phoneNumber}
                      placeholder="Your phone number"
                      inputClass="phone-input"
                      onChange={(phone) => setPhoneNumber(phone)}
                      autoFormat={false}
                      className="form-control form-input2 m-0 col-12"
                      // onBlur={props?.phoneNumber !== "" ? validatePhone : null}
                    />
                    {phoneNumberError && (
                      <span className="text-danger">
                        Phone number already exist
                      </span>
                    )}
                    {invalidPhoneNumberError && (
                      <span className="text-danger">Invalid phone number</span>
                    )}
                  </Form>
                ) : (
                  <Form
                    layout="vertical"
                    scrollToFirstError
                    onFinish={handleSubmit}
                  >
                    <Form.Item
                      className="mb-3 mb-md-0 mt-2"
                      initialValue=""
                      name="otp"
                      required
                    >
                      <Input
                        placeholder="Enter your otp"
                        onChange={(e) => setOtpCode(e.target.value)}
                      />
                    </Form.Item>
                    <div className="d-flex justify-content-center mt-2">
                      <small className="primary-text mr-2 text-center">
                        Didn’t get OTP?{" "}
                        <strong className="text-underline cursor">
                          Re-send OTP
                        </strong>{" "}
                      </small>
                    </div>
                  </Form>
                )}
              </div>
              <button
                className="btn btn-primary"
                disabled={!phoneNumber}
                onClick={() => {
                  if (!showOtp) {
                    setShowOtp(true);
                  } else {
                    setIsLoading(true);
                    setTimeout(() => {
                      setIsLoading(false);
                      setOtpVerified(true);
                    }, 2000);
                  }
                }}
              >
                Continue
              </button>

              {/* /.primary-text */}
            </div>
          </div>
          {/* /.col-md-6 */}
        </div>
      )}
      <SuccessModal
        visible={otpVerified}
        onCancel={() => {
          setOtpVerified(false);
          history.push(routes.yourAttributes);
        }}
        title="OTP Verification Complete"
        subtitle="Your OTP verification was successful"
        image={modalImg}
      />
    </AuthContainerPage>
  );
};

export default VerifyYourPhoneNumberPage;
