import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import useMobile from "../../../hooks/useMobile";
import AuthContainerPage from "../AuthContainer.page";
import LoaderComponent from "../../../components/LoaderComponent";
import { FaAngleLeft } from "react-icons/all";
import styles from "../../../assets/css/auth/yourAttributes.module.css";
import {
  bodyType,
  companionServices,
  providingTo,
  xRatedServices,
} from "../../../components/dataSets";
import routes from "../../../routes";

const SelectTypeOfServicePage = (props) => {
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
                  What type of services will you render as a provider?
                </h4>
                <p className="text-center">
                  Select the type service you want to provide under
                  companionship or X-Rated.
                </p>
              </div>
              <div className={`row `}>
                <div
                  className={`col-md-10 offset-md-1 ${styles.attributesCol}`}
                >
                  <h5>As a Companion, what service do you want to provide?</h5>
                  <div className={styles.flexrowbetween}>
                    {companionServices?.map((item) => (
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
              <div className={`row `}>
                <div
                  className={`col-md-10 offset-md-1 ${styles.attributesCol}`}
                >
                  <h5>As an X-Rated, what service do you want to provide?</h5>
                  <div className={styles.flexrowbetween}>
                    {xRatedServices?.map((item) => (
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
              <div className="row">
                <div
                  className={`col-md-6 offset-md-3 ${styles.attributesCol} `}
                >
                  <button
                    className={`btn btn-primary btn-block`}
                    disabled={selected.length === 0}
                    onClick={() => history.push(routes.providerPreferences)}
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

export default SelectTypeOfServicePage;
