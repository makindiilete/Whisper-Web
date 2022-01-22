//55 - 56
import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import useMobile from "../../hooks/useMobile";
import AuthContainerPage from "./AuthContainer.page";
import LoaderComponent from "../../components/LoaderComponent";
import { FaAngleLeft } from "react-icons/all";
import { Form, Input } from "antd";
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

const YourAttributesPage = (props) => {
  let location = useLocation();
  const history = useHistory();
  const mobile = useMobile();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  const [isLoading, setIsLoading] = useState(false);
  const [selected, setSelected] = useState([]);

  const addRemoveItem = (item) => {
    //Add
    if (!selected?.includes(item)) {
      setSelected([...selected, item]);
    }

    //Remove
    else {
      const filterItem = selected?.filter((i) => i !== item);
      setSelected(filterItem);
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
                    selected?.includes(item) ? styles.attrBtnActive : null
                  }`}
                  onClick={() => addRemoveItem(item)}
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
                    selected?.includes(item) ? styles.attrBtnActive : null
                  }`}
                  onClick={() => addRemoveItem(item)}
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
                    selected?.includes(item) ? styles.attrBtnActive : null
                  }`}
                  onClick={() => addRemoveItem(item)}
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
                    selected?.includes(item) ? styles.attrBtnActive : null
                  }`}
                  onClick={() => addRemoveItem(item)}
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
                    selected?.includes(item) ? styles.attrBtnActive : null
                  }`}
                  onClick={() => addRemoveItem(item)}
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
                    disabled={selected?.length === 0}
                    onClick={() => history.push(routes.aboutYourself)}
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
