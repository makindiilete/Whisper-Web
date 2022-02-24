import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import useMobile from "../../../hooks/useMobile";
import AuthContainerPage from "../AuthContainer.page";
import LoaderComponent from "../../../components/LoaderComponent";
import { FaAngleLeft } from "react-icons/all";
import img1 from "../../../assets/images/auth/typeOfuser/companion.svg";
import img2 from "../../../assets/images/auth/typeOfuser/xrated.svg";
import img3 from "../../../assets/images/auth/typeOfuser/both.svg";
import styles from "../../../assets/css/auth/yourAttributes.module.css";
import routes from "../../../routes";
import { bodyType, providingTo } from "../../../components/dataSets";
import {
  getProviderServiceByIdService,
  updateProviderService_Service,
} from "../../../services/Providers/Service/Service";
import { adminFetchUserAction } from "../../../redux/actions/userAction";
import { message } from "antd";
import { useDispatch, useSelector } from "react-redux";

const WhoWillYouProvideToPage = (props) => {
  let location = useLocation();
  const history = useHistory();
  const mobile = useMobile();
  const user = useSelector((state) => state.userReducer?.data);
  const dispatch = useDispatch();
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

  const handleSubmit = async () => {
    setIsLoading(true);
    let response = await updateProviderService_Service({
      providingFor: selected,
      providerServiceId: user?.providerService?._id,
    });
    setIsLoading(false);
    if (response.ok) {
      dispatch(adminFetchUserAction(user?._id));
      history.push(routes.providerPreferences);
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
                <h4 className="text-center mt-5 mt-md-0">
                  Who will you provide services to?
                </h4>
                <p className="text-center">
                  Select the type of Customers you wish to provide services to.
                </p>
              </div>
              <div className={`row `}>
                <div className={`col-md-8 offset-md-2 ${styles.attributesCol}`}>
                  <div className={styles.flexrowbetween}>
                    {providingTo?.map((item) => (
                      <button
                        key={item.id}
                        className={`${styles.attrBtn} ${
                          selected?.includes(item.text)
                            ? styles.attrBtnActive
                            : null
                        }`}
                        style={
                          !mobile
                            ? { width: "19.3rem", height: "5.7rem" }
                            : null
                        }
                        onClick={() => addRemoveItem(item.text)}
                      >
                        <span>
                          <img
                            src={item?.icon}
                            className="mr-2"
                            alt=""
                            style={{ width: "1.6rem", height: "2.2rem" }}
                          />
                        </span>
                        {item.text}
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
                    disabled={!selected}
                    onClick={handleSubmit}
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

export default WhoWillYouProvideToPage;
