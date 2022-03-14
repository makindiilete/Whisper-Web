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
import {
  getProviderServiceByIdService,
  updateProviderService_Service,
} from "../../../services/Providers/Service/Service";
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
  const [finalCategories, setFinalCategories] = useState({});
  const [categories, setCategories] = useState([]);
  const [selected, setSelected] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [services, setServices] = useState([]);
  const [providerServices, setProviderServices] = useState([]);

  const handleGetAllCategories = async () => {
    setIsLoading(true);
    let response = await getAllServiceCategoriesService(1, 1);
    response = await getAllServiceCategoriesService(
      1,
      response?.data?.totalDocumentCount ||
        response?.data?.pagination?.totalDocumentCount
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
      response?.data?.totalDocumentCount ||
        response?.data?.pagination?.totalDocumentCount
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

  const handleGetProviderServices = async () => {
    setIsLoading(true);
    let response = await getProviderServiceByIdService(user?._id);
    setIsLoading(false);
    if (response.ok) {
      setProviderServices(response?.data?.data);
    } else {
      message.error(
        response?.data?.errors[0].message || "Something went wrong"
      );
    }
  };

  const mapServiceToCategory = () => {
    console.log("called");
    if (services.length > 0 && categories.length > 0) {
      let category = [...categories];
      let service = [...services];

      let catArr = [...categories];
      let newCatArr = catArr.filter(
        (i) =>
          i.categoryName ===
          providerServices[0]?.serviceCategory?.serviceCategoryName
      );
      for (let i = 0; i < categories.length; i++) {
        catArr[i].services = [];
      }
      setFinalCategories({
        providerServiceId: providerServices[0]?._id,
        serviceCategory: {
          serviceCategoryId:
            providerServices[0]?.serviceCategory?.serviceCategoryId,
          serviceCategoryName:
            providerServices[0]?.serviceCategory?.serviceCategoryName,
          services: [],
          pricePerHour: 0,
        },
      });

      for (let i = 0; i < service.length; i++) {
        let findMatchingCategory = category.find(
          (value) => value._id === service[i].category
        );
        service[i].categoryName = findMatchingCategory?.categoryName;
      }
      setFinalServices(service);
    }
  };

  useEffect(() => {
    mapServiceToCategory();
  }, [services, categories]);

  useEffect(() => {
    handleGetProviderServices();
    handleGetAllCategories();
    handleGetAllServices();
  }, []);

  const addRemoveItem = (categoryName, serviceId, serviceName, index) => {
    let services = [...finalCategories?.serviceCategory?.services];
    let findItem = services?.find((i) => i?.serviceId === serviceId);
    console.log("find item = ", findItem);
    if (findItem) {
      let indexOfItem = services?.findIndex(
        (i) => i?.serviceId === findItem?.serviceId
      );
      console.log("index = ", indexOfItem);
      let leftOver = services.splice(indexOfItem, 1);
      console.log("removed item = ", leftOver);
      console.log("left over = ", services);
      setFinalCategories({
        ...finalCategories,
        serviceCategory: {
          ...finalCategories.serviceCategory,
          services: services,
        },
      });
    } else {
      setFinalCategories({
        ...finalCategories,
        serviceCategory: {
          ...finalCategories.serviceCategory,
          services: [
            ...finalCategories?.serviceCategory?.services,
            { serviceId, serviceName },
          ],
        },
      });
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    if (finalCategories?.serviceCategory?.services?.length > 0) {
      const response = await updateProviderService_Service(finalCategories);
      setIsLoading(false);
      if (response.ok) {
        localStorage.setItem(
          "providerService",
          JSON.stringify(finalCategories)
        );
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
          {/* <FaAngleLeft
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
          />*/}
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
                      {category?._id ===
                        providerServices[0]?.serviceCategory
                          ?.serviceCategoryId && (
                        <div>
                          <h5>
                            As {category?.categoryName}, what service do you
                            want to provide?
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
                                    finalCategories?.serviceCategory?.services?.some(
                                      (i) => i.serviceId === item?._id
                                    )
                                      ? styles.attrBtnActive
                                      : null
                                  }`}
                                  onClick={() =>
                                    addRemoveItem(
                                      item?.categoryName,
                                      item?._id,
                                      item?.serviceName,
                                      index
                                    )
                                  }
                                >
                                  {item?.serviceName}
                                </button>
                              ))}
                          </div>
                        </div>
                      )}
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
