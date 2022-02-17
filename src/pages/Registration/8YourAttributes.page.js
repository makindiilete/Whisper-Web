//55 - 56
import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import useMobile from "../../hooks/useMobile";
import AuthContainerPage from "./AuthContainer.page";
import LoaderComponent from "../../components/LoaderComponent";
import { FaAngleLeft } from "react-icons/all";
import { Form, Input, message } from "antd";
import PhoneInput from "react-phone-input-2";
import SuccessModal from "../../components/Modals/successModal";
import routes from "../../routes";
import {
  bodyHeight,
  bodyType,
  drink,
  education,
  smoking,
} from "../../components/dataSets";
import styles from "../../assets/css/auth/yourAttributes.module.css";
import { finalizePhoneVerficationService } from "../../services/Auth/Verification/verificationService";
import { updateCustomerProfileService } from "../../services/Customers/Profile/ProfileService";
import { updateProviderProfileService } from "../../services/Providers/Profile/ProfileService";
import { useDispatch, useSelector } from "react-redux";
import { updateCustomerAttributesService } from "../../services/Customers/Attributes/AttributesService";
import { updateProviderAttributesService } from "../../services/Providers/Attributes/AttributesService";
import { adminFetchUserAction } from "../../redux/actions/userAction";

const YourAttributesPage = (props) => {
  let location = useLocation();
  const history = useHistory();
  const mobile = useMobile();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer?.data);
  const [isLoading, setIsLoading] = useState(false);
  const [attr, setAttr] = useState({
    bodyType: "",
    height: "",
    education: "",
    smokeType: "",
    drinkType: "",
  });

  const handleSubmit = async () => {
    setIsLoading(true);
    attr.userId = user?._id;
    const response =
      user?.userType?.toLowerCase() === "customer"
        ? await updateCustomerAttributesService(attr)
        : await updateProviderAttributesService(attr);
    setIsLoading(false);
    if (response.ok) {
      dispatch(adminFetchUserAction(user?._id));
      history.push(routes.aboutYourself);
    } else {
      message.error(
        response?.data?.errors[0].message || "Something went wrong"
      );
    }
  };

  const bodyHeightFn = () => {
    return (
      <>
        <div className={`row ${styles.attributesRow}`}>
          <div className={`col-md-6 ${styles.attributesCol}`}>
            <h5>What’s your body type</h5>
            <div className={styles.flexrowbetween}>
              {bodyType?.map((item) => (
                <button
                  key={item}
                  className={`${styles.attrBtn} ${
                    attr?.bodyType === item ? styles.attrBtnActive : null
                  }`}
                  onClick={() => setAttr({ ...attr, bodyType: item })}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          {/* /.col-md-6 */}
          <div className={`col-md-6 ${styles.attributesCol}`}>
            <h5>How tall are you?</h5>
            <div className={styles.flexrowbetween}>
              {bodyHeight?.map((item) => (
                <button
                  key={item}
                  className={`${styles.attrBtn} ${
                    attr?.height === item ? styles.attrBtnActive : null
                  }`}
                  onClick={() => setAttr({ ...attr, height: item })}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          {/* /.col-md-6 */}
        </div>
      </>
    );
  };

  const smokeEducation = () => {
    return (
      <>
        <div className={`row ${styles.attributesRow}`}>
          <div className={`col-md-6 ${styles.attributesCol}`}>
            <h5>What do you smoke ?</h5>
            <div className={styles.flexrowbetween}>
              {smoking?.map((item) => (
                <button
                  key={item}
                  className={`${styles.attrBtn} ${
                    attr?.smokeType === item ? styles.attrBtnActive : null
                  }`}
                  onClick={() => setAttr({ ...attr, smokeType: item })}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          {/* /.col-md-6 */}
          <div className={`col-md-6 ${styles.attributesCol}`}>
            <h5>What’s Level of Education?</h5>
            <div className={styles.flexrowbetween}>
              {education?.map((item) => (
                <button
                  key={item}
                  className={`${styles.attrBtn} ${
                    attr?.education === item ? styles.attrBtnActive : null
                  }`}
                  onClick={() => setAttr({ ...attr, education: item })}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          {/* /.col-md-6 */}
        </div>
      </>
    );
  };

  const drinkFn = () => {
    return (
      <>
        <div className={`row ${styles.attributesRow}`}>
          <div className={`col-md-6 ${styles.attributesCol}`}>
            <h5>What do you drink ?</h5>
            <div className={styles.flexrowbetween}>
              {drink?.map((item) => (
                <button
                  key={item}
                  className={`${styles.attrBtn} ${
                    attr?.drinkType === item ? styles.attrBtnActive : null
                  }`}
                  onClick={() => setAttr({ ...attr, drinkType: item })}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          {/* /.col-md-6 */}
          <div className={`col-md-6 ${styles.attributesCol}`}></div>
          {/* /.col-md-6 */}
        </div>
      </>
    );
  };

  return (
    <AuthContainerPage>
      {isLoading ? (
        <LoaderComponent />
      ) : (
        <div className="typeOfUser position-relative ">
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
                <h4 className="text-center mt-5 mt-md-0">Your Attributes</h4>
                <p className="text-center">What are your attributes</p>
              </div>
              {bodyHeightFn()}
              {smokeEducation()}
              {drinkFn()}
              {/* /.row */}
              <div className="row">
                <div
                  className={`col-md-6 offset-md-3 ${styles.attributesCol} `}
                >
                  <button
                    className={`btn btn-primary btn-block`}
                    onClick={handleSubmit}
                  >
                    Continue
                  </button>
                </div>
                {/* /.col-md-6 offset-md-3 */}
              </div>
              {/* /.row */}

              {/* /.primary-text */}
            </div>
          </div>
          {/* /.col-md-6 */}
        </div>
      )}
    </AuthContainerPage>
  );
};

export default YourAttributesPage;
