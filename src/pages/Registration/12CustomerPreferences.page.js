import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import useMobile from "../../hooks/useMobile";
import AuthContainerPage from "./AuthContainer.page";
import LoaderComponent from "../../components/LoaderComponent";
import { FaAngleLeft } from "react-icons/all";
import styles from "../../assets/css/auth/yourAttributes.module.css";
import { imInto, providingTo } from "../../components/dataSets";
import routes from "../../routes";
import { Input, Slider } from "antd";

const CustomerPreferencesPage = (props) => {
  let location = useLocation();
  const history = useHistory();
  const mobile = useMobile();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  const [isLoading, setIsLoading] = useState(false);
  const [selected, setSelected] = useState([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [age, setAge] = useState({
    startRange: 0,
    endRange: 100,
  });
  const [km, setKm] = useState(5);
  const [amount, setAmount] = useState();

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

  const slider = {
    width: "100%",
    height: "4.8rem",
    border: "1px solid #DADADA",
    borderRadius: "8px",
    padding: "1.7rem 1rem",
    marginTop: mobile ? "-2rem" : null,
    // display: "flex",
    // justifyContent: "center",
    // alignItems: "center",
  };
  /*
  const sliderPc = {
    width: "100%",
    height: "6.4rem",
    border: "1px solid #DADADA",
    borderRadius: "8px"
  }*/

  function onChange(value) {
    setAge({ startRange: value[0], endRange: value[1] });
  }

  function onAfterChange(value) {
    setAge({ startRange: value[0], endRange: value[1] });
  }

  function onChangeKm(value) {
    setKm(value);
  }

  function onAfterChangeKm(value) {
    setKm(value);
  }

  const firstStep = () => {
    return (
      <div className={`row `}>
        <div className={`col-md-8 offset-md-2 ${styles.attributesCol}`}>
          <h5>I am into</h5>
          <div className={styles.flexrowbetween}>
            {imInto?.map((item) => (
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
      </div>
    );
  };

  const secondStep = () => {
    return (
      <>
        <div className={`row `}>
          <div className={`col-md-6 mb-2 mb-md-0 ${styles.attributesCol}`}>
            <div className={styles.flexrowbetween}>
              <h5>Age</h5>
              <h5>
                {" "}
                {age.startRange} - {age.endRange}{" "}
              </h5>
            </div>
            <div style={slider}>
              <Slider
                range
                step={1}
                defaultValue={[18, 25]}
                onChange={onChange}
                onAfterChange={onAfterChange}
                min={18}
              />
            </div>
          </div>

          <div className={`col-md-6 mb-2 mb-md-0 ${styles.attributesCol}`}>
            <div className={styles.flexrowbetween}>
              <h5>Distance</h5>
              <h5> {km} Km </h5>
            </div>
            <div style={slider}>
              <Slider
                step={1}
                defaultValue={5}
                onChange={onChangeKm}
                onAfterChange={onAfterChangeKm}
                min={1}
              />
            </div>
          </div>
        </div>
        <div className={`row `}>
          <div className={`col-md-6  mb-2 mb-md-0 ${styles.attributesCol}`}>
            <div>
              <h5>
                What is the least amount you are looking to spend per hour?
              </h5>
            </div>
            <div className="d-flex align-items-center">
              <Input onChange={(e) => setAmount(`$ ${e.target.value}`)} />
              <h5 className="appendInput">/hr</h5>
            </div>
            {/* <Input.Search
              // addonBefore="https://"
              addonAfter="/hr"
              // onSearch={onSearch}
            />*/}
          </div>

          <div
            className={`col-md-6 mb-2 mb-md-0 ${styles.attributesCol}`}
          ></div>
        </div>
      </>
    );
  };

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
                <h4 className="text-center mt-5 mt-md-0">Your Preferences</h4>
                <p className="text-center">What are your preferences?</p>
              </div>
              {currentStep === 1 ? firstStep() : secondStep()}
              <div className="row">
                <div
                  className={`col-md-6 offset-md-3 ${styles.attributesCol} `}
                >
                  <button
                    className={`btn btn-primary btn-block`}
                    disabled={selected.length === 0}
                    onClick={() => {
                      if (currentStep === 1) {
                        setCurrentStep(2);
                      } else {
                        // history.push(routes.customerPreferences)
                      }
                    }}
                  >
                    {currentStep === 1 ? "Continue" : "Find yourself Someone"}
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

export default CustomerPreferencesPage;
