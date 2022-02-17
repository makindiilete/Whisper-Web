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
import { useSelector } from "react-redux";

const { Option } = Select;

const CreateYourProfilePage = (props) => {
  const history = useHistory();
  let location = useLocation();
  const search = location.search;
  const params = new URLSearchParams(search);
  const step = params.get("step");
  const mobile = useMobile();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  const user = useSelector((state) => state.userReducer?.data);
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    setCurrentStep(Number(step));
  }, [step]);

  const screens = [
    <Stepone
      setCurrentStep={setCurrentStep}
      currentStep={currentStep}
      title="Create Your Profile"
      subTitle="Create your profile using these easy steps."
      user={user}
      userType={user?.userType?.toLowerCase()}
    />,
    <StepTwo
      setCurrentStep={setCurrentStep}
      currentStep={currentStep}
      title="Create Your Profile"
      subTitle="Create your profile using these easy steps."
      user={user}
      userType={user?.userType?.toLowerCase()}
    />,
    <StepThree
      setCurrentStep={setCurrentStep}
      currentStep={currentStep}
      title="Create Your Profile"
      subTitle="You are just one step away."
      user={user}
      userType={user?.userType?.toLowerCase()}
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
            history.goBack();
          }}
        />
        <div>{screens[currentStep > 0 ? currentStep - 1 : 0]}</div>
        {/* /.col-md-6 */}
      </div>
    </AuthContainerPage>
  );
};

export default CreateYourProfilePage;
