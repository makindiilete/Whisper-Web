import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import AuthContainerPage from "../AuthContainer.page";
import { FaAngleLeft } from "react-icons/all";
import img1 from "../../../assets/images/auth/typeOfuser/companion.svg";
import img2 from "../../../assets/images/auth/typeOfuser/xrated.svg";
import img3 from "../../../assets/images/auth/typeOfuser/both.svg";
import routes from "../../../routes";
import useMobile from "../../../hooks/useMobile";
import styles from "../../../assets/css/auth/yourAttributes.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllServiceCategoriesService } from "../../../services/App/Service Categories/ServiceCategories";
import {
  createProviderService_Service,
  getProviderServiceByIdService,
  updateProviderService_Service,
} from "../../../services/Providers/Service/Service";
import { message } from "antd";
import LoaderComponent from "../../../components/LoaderComponent";
import { adminFetchUserAction } from "../../../redux/actions/userAction";

const ProviderTypeOfServicePage = (props) => {
  let location = useLocation();
  const history = useHistory();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  const mobile = useMobile();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer?.data);
  const [serviceId, setServiceId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selected, setSelected] = useState({});
  const [services, setServices] = useState([]);

  const addRemoveItem = (item) => {
    setSelected(item);
  };

  const handleGetAllCategories = async () => {
    setIsLoading(true);
    let response = await getAllServiceCategoriesService(1, 1);
    response = await getAllServiceCategoriesService(
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

  const handleGetServiceId = async () => {
    setIsLoading(true);
    let response = await getProviderServiceByIdService(user?._id);
    setIsLoading(false);
    if (response.ok) {
      setServiceId(response?.data?.data?._id);
    } else {
      message.error(
        response?.data?.errors[0].message || "Something went wrong"
      );
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    let response = await createProviderService_Service({
      user: user?._id,
      serviceCategory: {
        serviceCategoryName: selected?.categoryName,
        serviceCategoryId: selected?._id,
        services: [],
        pricePerHour: 0,
      },
    });
    setIsLoading(false);
    if (response.ok) {
      dispatch(adminFetchUserAction(user?._id));
      history.push(routes.selectTypeOfServiceToProvide);
      // history.push(`${routes.createyourprofile}?step=1`);
    } else {
      message.error(
        response?.data?.errors[0].message || "Something went wrong"
      );
    }
  };

  useEffect(() => {
    // handleGetServiceId();
    handleGetAllCategories();
  }, []);

  return (
    <AuthContainerPage>
      {isLoading ? (
        <LoaderComponent />
      ) : (
        <div className="typeOfUser position-relative">
          {/*  <FaAngleLeft
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
          <br />
          <br />
          <div className="row">
            <div className={`col-md-6 offset-md-3 ${styles.attributesCol}`}>
              <div className="d-flex flex-column justify-content-around h-100">
                <div className="w-100">
                  <h4 className="text-center mt-5 mt-md-0">
                    What type of service will you be providing?
                  </h4>
                  <p className="text-center">
                    Start by choosing the type of service you want to provide.
                  </p>
                </div>
              </div>
            </div>
            {/* /.col-md-6 */}
          </div>
          <div className="flexrowaround typeOfProvider__cards">
            {services?.map((item) => (
              <div
                className={`d-flex justify-content-center align-items-center  ${
                  selected?._id === item?._id && "active"
                }`}
                onClick={() => addRemoveItem(item)}
                key={item?._id}
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
                  <h5 className="text-center mt-4">{item?.categoryName}</h5>
                  <small className="text-center">{item?.description}</small>
                </div>
              </div>
            ))}
          </div>
          {/* /.d-flex justify-content-between */}
          <div className="row">
            <div className={`col-md-6 offset-md-3 ${styles.attributesCol} `}>
              <button
                className="btn btn-primary btn-block mb-5"
                onClick={handleSubmit}
                disabled={selected.length === 0}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </AuthContainerPage>
  );
};

export default ProviderTypeOfServicePage;
