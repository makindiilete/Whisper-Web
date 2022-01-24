// 35 - 39, 48, 49,
import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import useMobile from "../../../hooks/useMobile";
import { FaAngleLeft, MdLocationPin } from "react-icons/all";
import img1 from "../../../assets/images/auth/typeOfuser/Group 741.svg";
import img2 from "../../../assets/images/auth/typeOfuser/SVG/provider.svg";
import AuthContainerPage from "../AuthContainer.page";
import { DatePicker, Form, Input, Select } from "antd";
import routes from "../../../routes";
import { countries } from "../../../components/countryList";
import Stepone from "./stepone";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";

const { Option } = Select;

const CreateYourProfilePage = (props) => {
  let location = useLocation();
  const history = useHistory();
  const mobile = useMobile();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  const [currentStep, setCurrentStep] = useState(0);

  const screens = [
    <Stepone
      setCurrentStep={setCurrentStep}
      currentStep={currentStep}
      title="Create Your Profile"
      subTitle="Create your profile using these easy steps."
    />,
    <StepTwo
      setCurrentStep={setCurrentStep}
      currentStep={currentStep}
      title="Create Your Profile"
      subTitle="Create your profile using these easy steps."
    />,
    <StepThree
      setCurrentStep={setCurrentStep}
      currentStep={currentStep}
      title="Create Your Profile"
      subTitle="You are just one step away."
    />,
  ];

  return (
    <AuthContainerPage>
      <div className="typeOfUser position-relative createUrProfile">
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
          onClick={() => {
            if (currentStep > 0) {
              setCurrentStep(currentStep - 1);
            } else {
              history.goBack();
            }
          }}
        />
        <div className="row">{screens[currentStep]}</div>
        {/* /.col-md-6 */}
      </div>
    </AuthContainerPage>
  );
};

export default CreateYourProfilePage;
