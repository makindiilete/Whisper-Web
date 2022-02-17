// 50 - 53
import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import useMobile from "../../hooks/useMobile";
import { Form, Input, message, Upload } from "antd";
import routes from "../../routes";
import AuthContainerPage from "./AuthContainer.page";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { isValidPhoneNumber } from "react-phone-number-input";
import { FaAngleLeft } from "react-icons/all";
import LoaderComponent from "../../components/LoaderComponent";
import SuccessModal from "../../components/Modals/successModal";
import modalImg from "../../assets/images/auth/40.svg";
import { useDispatch, useSelector } from "react-redux";
import { updateCustomerProfileService } from "../../services/Customers/Profile/ProfileService";
import { updateProviderProfileService } from "../../services/Providers/Profile/ProfileService";
import { adminFetchUserAction } from "../../redux/actions/userAction";
import {
  finalizePhoneVerficationService,
  initPhoneVerificationService,
} from "../../services/Auth/Verification/verificationService";

const VerifyYourPhoneNumberPage = (props) => {
  let location = useLocation();
  const history = useHistory();
  const mobile = useMobile();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer?.data);
  const [alreadyExist, setAlreadyExist] = useState(false);
  const [invalidPhoneNumberError, setInvalidPhoneNumberError] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState();
  const [otpCode, setOtpCode] = useState(null);
  const [showOtp, setShowOtp] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const checkPhoneValidity = () => {
    const foneValid = isValidPhoneNumber(`+${phoneNumber}`);
    if (!foneValid) {
      setInvalidPhoneNumberError(true);
    } else {
      setInvalidPhoneNumberError(false);
    }
    return foneValid;
  };

  const handleSubmit = async (values) => {
    const foneIsValid = checkPhoneValidity();
    if (foneIsValid) {
      const formdata = new FormData();
      formdata.append("phone", `+${phoneNumber}`);
      formdata.append("userId", user?._id);
      setIsLoading(true);
      const response =
        user?.userType?.toLowerCase() === "customer"
          ? await updateCustomerProfileService(formdata)
          : await updateProviderProfileService(formdata);
      setIsLoading(false);
      if (response.ok) {
        await initPhoneVerificationService({ userId: user?._id });
        dispatch(adminFetchUserAction(user?._id));
        setShowOtp(true);
      } else {
        message.error(
          response?.data?.errors[0].message || "Something went wrong"
        );
      }
    }
  };
  const handleSubmitOtp = async () => {
    setIsLoading(true);
    const response = await finalizePhoneVerficationService({
      userId: user?._id,
      authCode: otpCode,
    });
    setIsLoading(false);
    if (response.ok) {
      setOtpVerified(true);
    } else {
      message.error(
        response?.data?.errors[0].message || "Something went wrong"
      );
    }
  };

  async function handleResendOtp() {
    setIsLoading(true);
    const response = await initPhoneVerificationService({ userId: user?._id });
    setIsLoading(false);
    if (response.ok) {
      message.success(`Otp sent to +${phoneNumber}`);
    } else {
      message.error(
        response?.data?.errors[0].message || "Something went wrong"
      );
    }
  }

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
                    <Form.Item
                      className="mb-3 mb-md-0 mt-2"
                      initialValue=""
                      name="phone"
                      rules={[
                        {
                          required: true,
                          message: "Required field",
                        },
                      ]}
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
                    </Form.Item>
                    {alreadyExist && (
                      <p className="text-danger">Phone number already exist</p>
                    )}
                    {invalidPhoneNumberError && (
                      <p className="text-danger">Invalid phone number</p>
                    )}
                    <br />
                    <button className="btn btn-primary btn-block">
                      Continue
                    </button>
                  </Form>
                ) : (
                  <Form
                    layout="vertical"
                    scrollToFirstError
                    onFinish={handleSubmitOtp}
                  >
                    <Form.Item
                      className="mb-3 mb-md-0 mt-2"
                      initialValue=""
                      name="otp"
                      rules={[
                        {
                          required: true,
                          message: "Required field",
                        },
                      ]}
                    >
                      <Input
                        placeholder="Enter your otp"
                        onChange={(e) => setOtpCode(e.target.value)}
                      />
                    </Form.Item>
                    <div className="d-flex justify-content-center mt-2">
                      <small className="primary-text mr-2 text-center">
                        Didn’t get OTP?{" "}
                        <strong
                          className="text-underline cursor"
                          onClick={handleResendOtp}
                        >
                          Re-send OTP
                        </strong>{" "}
                      </small>
                    </div>
                    <br />
                    <button className="btn btn-primary btn-block">
                      Continue
                    </button>
                  </Form>
                )}
              </div>
            </div>
          </div>
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
