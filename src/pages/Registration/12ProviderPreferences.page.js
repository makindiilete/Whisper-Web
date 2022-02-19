//66 , 67
import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import useMobile from "../../hooks/useMobile";
import AuthContainerPage from "./AuthContainer.page";
import LoaderComponent from "../../components/LoaderComponent";
import { FaAngleLeft } from "react-icons/all";
import styles from "../../assets/css/auth/yourAttributes.module.css";
import { imInto } from "../../components/dataSets";
import routes from "../../routes";
import { Input, message, Slider } from "antd";
import { updateCustomerPreferenceService } from "../../services/Customers/Preference/PrefenceService";
import { adminFetchUserAction } from "../../redux/actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { updateProviderService_Service } from "../../services/Providers/Service/Service";

const ProviderPreferencesPage = (props) => {
  let location = useLocation();
  const history = useHistory();
  const mobile = useMobile();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer?.data);
  const [isLoading, setIsLoading] = useState(false);
  const [services, setServices] = useState(user?.providerService?.services);
  const [selected, setSelected] = useState([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [age, setAge] = useState({
    startRange: 18,
    endRange: 25,
  });
  const [km, setKm] = useState(5);
  const [amount, setAmount] = useState({});

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
  function onChange(value) {
    setAge({ startRange: value[0], endRange: value[1] });
  }

  function onAfterChange(value) {
    setAge({ startRange: value[0], endRange: value[1] });
  }

  const handleAmountChange = (name, value) => {
    setAmount({ ...amount, [name]: value });
  };

  function onChangeKm(value) {
    setKm(value);
  }

  function onAfterChangeKm(value) {
    setKm(value);
  }

  const handleSubmit = async () => {
    setIsLoading(true);
    let service = [];
    services?.map((item, index) =>
      service.push({
        serviceCategoryName: Object.keys(amount)[index],
        pricePerHour: Object.values(amount)[index],
      })
    );

    const response = await updateProviderService_Service({
      userId: user?._id,
      minAge: Number(age.startRange),
      maxAge: Number(age.endRange),
      distanceAway: Number(km),
      services: service,
      providerServiceId: user?.providerService?._id,
    });
    setIsLoading(false);
    if (response.ok) {
      dispatch(adminFetchUserAction(user?._id));
      history.push(routes.PROVIDER_HOME);
    } else {
      message.error(
        response?.data?.errors[0].message || "Something went wrong"
      );
    }
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
              <div className={`row `}>
                <div
                  className={`col-md-6 mb-2 mb-md-0 ${styles.attributesCol}`}
                >
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

                <div
                  className={`col-md-6 mb-2 mb-md-0 ${styles.attributesCol}`}
                >
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
                {services?.map((item, index) => (
                  <div
                    key={item?._id}
                    className={`col-md-6 mb-2 mb-md-0 ${styles.attributesCol}`}
                  >
                    <div>
                      <h5 className={`${index !== 0 && "text-white"}`}>
                        Set a price/rate for your services
                      </h5>
                    </div>
                    <div className="d-flex align-items-center">
                      <div className="prependInput">
                        <small>{item?.serviceCategoryName}</small>
                      </div>
                      <div className="w-100">
                        <Input
                          style={{ paddingLeft: "9.5rem" }}
                          onChange={(e) =>
                            handleAmountChange(
                              item?.serviceCategoryName,
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <h5 className="appendInput">/hr</h5>
                    </div>
                    <div
                      className={`flexrowbetweencenter ${
                        index !== 0 && "d-none"
                      }`}
                    >
                      <div
                        style={{
                          width: "1rem",
                          height: "1rem",
                          borderRadius: "0.3rem",
                          backgroundColor: "#7917CE",
                        }}
                      />
                      <p className="padding-none">
                        10% of your hourly rate will be charged as commission
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="row">
                <div
                  className={`col-md-6 offset-md-3 ${styles.attributesCol} `}
                >
                  <button
                    className={`btn btn-primary btn-block`}
                    disabled={Object.keys(amount)?.length === 0}
                    onClick={handleSubmit}
                  >
                    Find yourself Someone
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

export default ProviderPreferencesPage;
