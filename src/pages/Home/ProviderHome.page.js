import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import useMobile from "../../hooks/useMobile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as icons from "@fortawesome/free-solid-svg-icons";
import { HomeContainerPage } from "./HomeContainer.page";
import styles from "../../assets/css/providerHome.module.css";
import reverse from "../../assets/images/homeInApp/Group 754.svg";
import like from "../../assets/images/homeInApp/love.svg";
import decline from "../../assets/images/homeInApp/decline.svg";
import { Badge } from "../../components/Badge";
import { providerLikes } from "../../components/dataSets";
import { NoData } from "../../components/NoData";
import { useDispatch, useSelector } from "react-redux";
import {
  getProviderServiceRequestByProviderId_Service,
  updateAcceptanceService,
} from "../../services/Providers/Service/Service";
import { message } from "antd";
import { getProviderGalleryByIdService } from "../../services/Providers/Gallery/Gallery";
import {
  getProviderByPreferenceService,
  getProviderCompleteProfileService,
} from "../../services/Providers/Search/SearchService";
import { subscriptionPlansAction } from "../../redux/actions/subscriptionPlansAction";
import { getCustomerCompleteProfileService } from "../../services/Customers/Profile/ProfileService";
import { getCustomerGalleryByIdService } from "../../services/Customers/Gallery/GalleryService";
import avatar from "../../assets/images/nav/avatarchange.svg";
import { getAge } from "../../Utils/getAge";
import LoaderComponent from "../../components/LoaderComponent";
import moment from "moment";
import { fetchUserSubscriptionAction } from "../../redux/actions/userAction";

const ProviderHomePage = (props) => {
  let location = useLocation();
  const history = useHistory();
  const mobile = useMobile();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer.data);
  const [index, setIndex] = useState(0);
  const [images, setImages] = useState([]);
  const [activeImage, setActiveImage] = useState("");
  const [imgPosition, setImgPosition] = useState(0);
  const [showRestore, setShowRestore] = useState(false);
  const [lastDeclined, setLastDeclined] = useState(null);
  const [providerIndex, setProviderIndex] = useState({
    currentIndex: 0,
    maxIndex: 0,
  });
  const [providersByPreference, setProvidersByPreference] = useState([]);
  const [currentProfile, setCurrentProfile] = useState(
    providersByPreference[providerIndex.currentIndex]
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleSwipePreviousImage = () => {
    const length = images.length;
    const indx = imgPosition === 0 ? length : imgPosition - 1;
    const active = images[indx]?.imageUri[0];
    if (active) {
      setActiveImage(active);
      setImgPosition(indx);
    } else {
      setActiveImage(images[length - 1]);
      setImgPosition(length - 1);
    }
  };

  const handleSwipeNextImage = () => {
    const length = images.length;
    const indx = imgPosition === length ? 0 : imgPosition + 1;
    const active = images[indx]?.imageUri[0];
    if (active) {
      setActiveImage(active);
      setImgPosition(indx);
    } else {
      setActiveImage(images[0]);
      setImgPosition(0);
    }
  };

  function handleSetCurrentProfile(id, index) {
    setIndex(index);
    const selected = providersByPreference?.find((i) => i.id === id);
    fetchCurrentProfileDetails(selected?._id);
    fetchCurrentProfileGallery(selected?._id);
    /*    setActiveImage(selected?.imgUrls[0]);
    setImages(selected?.imgUrls);*/
    setCurrentProfile(selected);
  }

  async function handleLikeAccepted() {
    setIsLoading(true);
    const res = await updateAcceptanceService({
      userId: user?._id,
      serviceRequestId: providersByPreference[providerIndex.currentIndex]?._id,
      acceptanceComment: "",
      acceptanceStatus: "Accepted",
    });
    setIsLoading(false);
    if (res.ok) {
      message.success("Service request accepted");
      const response = providersByPreference?.filter(
        (i) => i.id !== currentProfile?.id
      );

      setProvidersByPreference(response);
      fetchCurrentProfileDetails(response);
      fetchCurrentProfileGallery(response);
    } else {
      message.error(res?.data?.errors[0].message || "Something went wrong");
    }
  }

  async function handleLikeDeclined() {
    setShowRestore(true);
    setIsLoading(true);
    const res = await updateAcceptanceService({
      userId: user?._id,
      serviceRequestId: providersByPreference[providerIndex.currentIndex]?._id,
      acceptanceComment: "",
      acceptanceStatus: "Canceled By Provider",
    });
    setIsLoading(false);
    if (res.ok) {
      message.success("Service request declined");
      const others = providersByPreference?.filter(
        (i) => i.id !== currentProfile?.id
      );
      const declined = providersByPreference?.find(
        (i) => i.id === currentProfile?.id
      );
      setLastDeclined(declined);
      setProvidersByPreference(others);
      fetchCurrentProfileDetails(others);
      fetchCurrentProfileGallery(others);
    } else {
      message.error(res?.data?.errors[0].message || "Something went wrong");
    }
  }

  function handleDeclineRestored() {
    let arr = [];
    fetchCurrentProfileDetails([...arr, lastDeclined]);
    fetchCurrentProfileGallery([...arr, lastDeclined]);
    setShowRestore(false);
  }

  const fetchCurrentProfileGallery = async (others = []) => {
    setIsLoading(true);
    const response = await getCustomerGalleryByIdService(
      others[providerIndex.currentIndex]?.customer?._id ||
        providersByPreference[providerIndex.currentIndex]?.customer?._id
    );
    setIsLoading(false);
    if (response.ok) {
      setImages(response?.data?.data);
      setActiveImage(response?.data?.data[0]?.imageUri[0]);
    } else {
      message.error(
        response?.data?.errors[0].message || "Something went wrong"
      );
    }
  };

  const fetchCurrentProfileDetails = async (others = []) => {
    setIsLoading(true);
    const response = await getCustomerCompleteProfileService(
      others[providerIndex.currentIndex]?.customer?._id ||
        providersByPreference[providerIndex.currentIndex]?.customer?._id
    );
    setIsLoading(false);
    if (response.ok) {
      setCurrentProfile(response?.data?.data);
    } else {
      message.error(
        response?.data?.errors[0].message || "Something went wrong"
      );
    }
  };

  const fetchProviderByPreference = async () => {
    setIsLoading(true);
    const response = await getProviderServiceRequestByProviderId_Service(
      user?._id
    );
    setIsLoading(false);
    if (response.ok) {
      setProvidersByPreference(response?.data?.data);
      setProviderIndex({
        ...providerIndex,
        maxIndex: response?.data?.data?.length - 1,
      });
    } else {
      message.error(
        response?.data?.errors[0].message || "Something went wrong"
      );
    }
  };

  useEffect(() => {
    dispatch(fetchUserSubscriptionAction(user?._id));
    if (providersByPreference[providerIndex.currentIndex]?.customer?._id) {
      fetchCurrentProfileDetails();
      fetchCurrentProfileGallery();
    }
  }, [providerIndex]);

  useEffect(() => {
    fetchProviderByPreference();
  }, []);

  if (isLoading) {
    return <LoaderComponent />;
  }

  return (
    <HomeContainerPage>
      {providersByPreference?.length > 0 ? (
        <div className="row">
          <div className="col-md-8">
            <h4>My Like/Request</h4>
            <br />
            <div className={styles.profileDetailsContainer}>
              <div className="row">
                <div className="col-md-6 p-0 position-relative">
                  <div className="currentTotalImg">
                    <div className="w-100 h-100 d-flex justify-content-center align-items-center">
                      <h5 className="text-white padding-none">
                        {`${
                          imgPosition === images?.length ? 1 : imgPosition + 1
                        }/${images?.length}`}
                      </h5>
                    </div>
                  </div>
                  <div className="prevNextImg">
                    <div className="w-100 d-flex justify-content-between px-3">
                      <div
                        className="arrow backArrow"
                        onClick={handleSwipePreviousImage}
                      >
                        <FontAwesomeIcon
                          icon={icons.faChevronLeft}
                          size="1x"
                          className="text-white"
                        />
                      </div>
                      <div
                        className="arrow nextArrow"
                        onClick={handleSwipeNextImage}
                      >
                        <FontAwesomeIcon
                          icon={icons.faChevronRight}
                          size="1x"
                          className="text-white"
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    className={`${styles.galleryImg} ${styles.galleryImgOverlay}`}
                  />
                  <img src={activeImage} alt="" className={styles.galleryImg} />
                  <div className="actions">
                    <div className="actions__container">
                      {showRestore && (
                        <img
                          src={reverse}
                          className="img-fluid"
                          alt=""
                          onClick={handleDeclineRestored}
                        />
                      )}
                      <img
                        src={like}
                        className="img-fluid"
                        alt=""
                        onClick={handleLikeAccepted}
                      />
                      <img
                        src={decline}
                        className="img-fluid"
                        alt=""
                        onClick={handleLikeDeclined}
                      />
                    </div>
                  </div>
                </div>
                <div className={`col-md-6 ${styles.profileContainerRightCol}`}>
                  <h4 className="text-dark">{`${
                    currentProfile?.firstName + " " + currentProfile?.lastName
                  } ${getAge(
                    currentProfile?.customerProfile?.dateOfBirth
                  )}`}</h4>
                  <p className="text-muted">
                    {currentProfile?.customerProfile?.city} <br />
                    {`${currentProfile?.customerProfile?.state} ${currentProfile?.customerProfile?.country}`}
                  </p>
                  <div>
                    {currentProfile?.lookingFor?.map((item) => (
                      <Badge text={item} key={item} />
                    ))}
                  </div>
                  <br />
                  <div className="dotted-divider w-100" />
                  <br />
                  <h4 className="text-dark">Bio</h4>
                  <p className="text-muted">
                    {currentProfile?.customerProfile?.biography}
                  </p>
                  <br />
                  <h4>Attributes</h4>
                  <Badge
                    text={currentProfile?.customerAttributes?.bodyType || ""}
                  />
                  <Badge
                    text={currentProfile?.customerAttributes?.height || ""}
                  />
                  <Badge
                    text={currentProfile?.customerAttributes?.education || ""}
                  />
                  <Badge
                    text={`Smoking: ${
                      currentProfile?.customerAttributes?.smokeType || ""
                    }`}
                  />
                  <Badge
                    text={`Drink: ${
                      currentProfile?.customerAttributes?.drinkType || ""
                    }`}
                  />
                  <br />
                  <br />
                  <h4>Appointment Date</h4>
                  <p className="text-muted">
                    {moment(
                      providersByPreference[providerIndex]?.appointmentTime
                    ).format("LLL")}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className={`col-md-4 ${styles.leftColumn}`}>
            <h4>Latest Like/Request</h4>
            <br />
            <div className={styles.thumbnailGridContainer}>
              {providersByPreference?.map((item, index) => (
                <div
                  className="position-relative cursor"
                  onClick={() => {
                    handleSetCurrentProfile(item?.id, index);
                    window.scrollTo(0, 0);
                  }}
                  key={item?.id}
                >
                  <div
                    className={`${styles.galleryImgThumbnail} ${styles.galleryImgThumbnailOverlay}`}
                  />
                  <img
                    src={
                      item?.customer?.customerProfile?.profilePictureUri ||
                      avatar
                    }
                    alt=""
                    className={styles.galleryImgThumbnail}
                  />
                  <div className={styles.galleryImgThumbnailDesc}>
                    <small className="font-weight-bold text-white">
                      {`${
                        item?.customer?.firstName +
                        " " +
                        item?.customer?.lastName
                      }`}
                    </small>
                    {/*  <br />
                    <small className="text-white">{item?.occupation}</small>*/}
                  </div>
                  {/* /.font-weight-bold */}
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <NoData text="No Likes/Request At The Moment" />
      )}
      <br />
    </HomeContainerPage>
  );
};

export default ProviderHomePage;
