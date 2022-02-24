import React, { useCallback, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import useMobile from "../../../hooks/useMobile";
import AuthContainerPage from "../AuthContainer.page";
import LoaderComponent from "../../../components/LoaderComponent";
import { FaAngleLeft } from "react-icons/all";
import styles from "../../../assets/css/auth/yourAttributes.module.css";
import routes from "../../../routes";
import { getAllServiceCategoriesService } from "../../../services/App/Service Categories/ServiceCategories";
import { message } from "antd";
import { getAllServices_Service } from "../../../services/App/Services/Service";
import { updateProviderService_Service } from "../../../services/Providers/Service/Service";
import { useDispatch, useSelector } from "react-redux";
import { adminFetchUserAction } from "../../../redux/actions/userAction";

const SelectTypeOfServicePage = (props) => {
  let location = useLocation();
  const history = useHistory();
  const mobile = useMobile();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer?.data);
  const [finalServices, setFinalServices] = useState([]);
  const [finalCategories, setFinalCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selected, setSelected] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [services, setServices] = useState([]);

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

  const handleGetAllServices = async () => {
    setIsLoading(true);
    let response = await getAllServices_Service(1, 1);
    response = await getAllServices_Service(
      1,
      response?.data?.totalDocumentCount
    );
    setIsLoading(false);
    if (response.ok) {
      setServices(response?.data?.data);
    } else {
      message.error(
        response?.data?.errors[0].message || "Something went wrong"
      );
    }
  };

  const mapServiceToCategory = useCallback(() => {
    if (services.length > 0 && categories.length > 0) {
      let category = [...categories];
      let service = [...services];

      let catArr = [...categories];
      for (let i = 0; i < categories.length; i++) {
        catArr[i].services = [];
      }
      setFinalCategories(catArr);

      for (let i = 0; i < service.length; i++) {
        let findMatchingCategory = category.find(
          (value) => value._id === service[i].category
        );
        service[i].categoryName = findMatchingCategory?.categoryName;
      }
      setFinalServices(service);
    }
  }, [services, categories]);

  useEffect(() => {
    mapServiceToCategory();
  }, [services, categories]);

  useEffect(() => {
    handleGetAllCategories();
    handleGetAllServices();
  }, []);

  const addRemoveItem = (categoryName, serviceId, index, pricePerHour = 0) => {
    let allCategories = [...categories];
    let categoryObj = allCategories.find(
      (value) => value.categoryName === categoryName
    );
    let services = [...categoryObj.services];
    //Remove
    if (services.includes(serviceId)) {
      allCategories[index].services = services.filter((v) => v !== serviceId);
      allCategories[index].pricePerHour = pricePerHour;
      setFinalCategories(allCategories);
    }

    //Add
    else {
      allCategories[index].services = [
        ...allCategories[index].services,
        serviceId,
      ];
      allCategories[index].pricePerHour = pricePerHour;
      setFinalCategories(allCategories);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    const providerServiceId = user?.providerService?._id;
    let payloadArr = [];
    let disableSubmit = true;
    for (let i = 0; i < finalCategories.length; i++) {
      let obj = {};
      obj.serviceCategoryId = finalCategories[i]?._id;
      obj.serviceCategoryName = finalCategories[i]?.categoryName;
      obj.services = finalCategories[i]?.services;
      obj.pricePerHour = 0;
      payloadArr.push(obj);
    }
    for (let i = 0; i < payloadArr.length; i++) {
      if (payloadArr[i].services?.length > 0) {
        disableSubmit = false;
        break;
      }
    }
    if (!disableSubmit) {
      localStorage.setItem("providerService", JSON.stringify(payloadArr));
      const response = await updateProviderService_Service({
        providerServiceId,
        services: payloadArr,
      });
      setIsLoading(false);
      if (response.ok) {
        dispatch(adminFetchUserAction(user?._id));
        history.push(`${routes.createyourprofile}?step=1`);
      } else {
        message.error(
          response?.data?.errors[0].message || "Something went wrong"
        );
      }
    } else {
      setIsLoading(false);
      message.error("Select a service from the list");
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
                  {categories?.map((category, index) => (
                    <div key={category?._id}>
                      <h5>
                        As {category?.categoryName}, what service do you want to
                        provide?
                      </h5>
                      <div className={styles.flexrowbetween}>
                        {finalServices
                          ?.filter(
                            (value) =>
                              value?.categoryName === category?.categoryName
                          )
                          ?.map((item) => (
                            <button
                              key={item?._id}
                              className={`${styles.attrBtn} ${
                                category?.services?.includes(item?._id)
                                  ? styles.attrBtnActive
                                  : null
                              }`}
                              onClick={() =>
                                addRemoveItem(
                                  item?.categoryName,
                                  item?._id,
                                  index
                                )
                              }
                            >
                              {item?.serviceName}
                            </button>
                          ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

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
