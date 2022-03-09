// 62, 63,
//OR
// 69, 70, 71, 72 ===> 107,108,109,110,111
import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import useMobile from "../../hooks/useMobile";
import AuthContainerPage from "./AuthContainer.page";
import LoaderComponent from "../../components/LoaderComponent";
import { BiRightArrowAlt, FaAngleLeft, GrTrash } from "react-icons/all";
import { message, Upload } from "antd";
import styles from "../../assets/css/auth/yourAttributes.module.css";
import img1 from "../../assets/images/auth/typeOfuser/companion.svg";
import img2 from "../../assets/images/auth/typeOfuser/xrated.svg";
import img3 from "../../assets/images/auth/typeOfuser/both.svg";
import routes from "../../routes";
import { uploadCustomerGalleryService } from "../../services/Customers/Gallery/GalleryService";
import { uploadProviderGalleryService } from "../../services/Providers/Gallery/Gallery";
import { updateCustomerPreferenceService } from "../../services/Customers/Preference/PrefenceService";
import { updateProviderPreferenceService } from "../../services/Providers/Preference/PrefenceService";
import { useDispatch, useSelector } from "react-redux";
import { adminFetchUserAction } from "../../redux/actions/userAction";
import { getAllServiceCategoriesService } from "../../services/App/Service Categories/ServiceCategories";

const WhatAreYouLookingForPage = (props) => {
  let location = useLocation();
  const user = useSelector((state) => state.userReducer?.data);
  const dispatch = useDispatch();
  const history = useHistory();
  const mobile = useMobile();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  const [isLoading, setIsLoading] = useState(false);
  const [selected, setSelected] = useState();
  const [selectedPref, setSelectedPref] = useState("");
  const [categories, setCategories] = useState([]);

  const handleGetAllCategories = async () => {
    setIsLoading(true);
    let response = await getAllServiceCategoriesService(1, 1);
    response = await getAllServiceCategoriesService(
      1,
      response?.data?.totalDocumentCount
    );
    setIsLoading(false);
    if (response.ok) {
      setCategories(response?.data?.data);
    } else {
      message.error(
        response?.data?.errors[0].message || "Something went wrong"
      );
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    const response = await updateCustomerPreferenceService({
      userId: user?._id,
      lookingFor: selected === 3 ? ["Companion", "X-Rated"] : [selectedPref],
    });
    setIsLoading(false);
    if (response.ok) {
      history.push(routes.customerPreferences);
      dispatch(adminFetchUserAction(user?._id));
    } else {
      message.error(
        response?.data?.errors[0].message || "Something went wrong"
      );
    }
  };

  useEffect(() => {
    handleGetAllCategories();
  }, []);

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
          <div className="container pb-5 pb-md-0">
            <div
              className="d-flex flex-column justify-content-around"
              // style={{ minHeight: "47.4rem", marginBottom: "-10rem" }}
              style={{ minHeight: "47.4rem" }}
            >
              <div className="w-100">
                <br />
                <h4 className="text-center mt-5 mt-md-0">
                  What are you looking for?
                </h4>
                <p className="text-center">
                  Start by choosing the type of service you are interested in.
                </p>
              </div>
              <div className="flexrowaround typeOfProvider__cards">
                {categories?.map((item) => (
                  <div
                    key={item?._id}
                    className={`d-flex justify-content-center align-items-center  ${
                      selected === item?._id && "active"
                    }`}
                    onClick={() => {
                      setSelected(item?._id);
                      setSelectedPref(item?.categoryName);
                    }}
                  >
                    <div className="d-flex flex-column">
                      <div className="d-flex justify-content-center">
                        <img
                          src={item?.imageUri}
                          className="img-fluid"
                          alt=""
                          style={{
                            width: "6.2rem",
                            objectFit: "contain",
                            height: "6.2rem",
                          }}
                        />
                      </div>
                      <h5 className="text-center mt-4">
                        {" "}
                        {item?.categoryName}{" "}
                      </h5>
                      <small className="text-center">{item?.description}</small>
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

export default WhatAreYouLookingForPage;
