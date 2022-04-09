import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import useMobile from "../../hooks/useMobile";
import { customerDiscover } from "../../components/dataSets";
import { HomeContainerPage } from "./HomeContainer.page";
import styles from "../../assets/css/providerHome.module.css";
import customer from "../../assets/css/customerHome.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as icons from "@fortawesome/free-solid-svg-icons";
import reverse from "../../assets/images/homeInApp/Group 754.svg";
import like from "../../assets/images/homeInApp/love.svg";
import decline from "../../assets/images/homeInApp/decline.svg";
import fav from "../../assets/images/homeInApp/customer/Favourite.svg";
import { Badge } from "../../components/Badge";
import { NoData } from "../../components/NoData";
import premiumImg from "../../assets/images/homeInApp/customer/premium.svg";
import filter from "../../assets/images/homeInApp/customer/filter.svg";
import star from "../../assets/images/homeInApp/customer/star.svg";
import locked from "../../assets/images/homeInApp/customer/locked.svg";
import ActivatePremiumModal from "../../components/Modals/activatePremiumModal";
import PaymentModal from "../../components/Modals/paymentModal";
import SuccessModal from "../../components/Modals/successModal";
import modalImg from "../../assets/images/auth/40.svg";
import FilterModal from "../../components/Modals/filterModal";
import LoaderComponent from "../../components/LoaderComponent";
import { IoIosArrowBack } from "react-icons/all";
import { SubscribePremium } from "../../components/SubscribePremium";
import msg from "../../assets/images/chat/love.svg";
import routes from "../../routes";
import { useDispatch, useSelector } from "react-redux";
import { getUserWalletService } from "../../services/App/Wallet/walletService";
import { message } from "antd";
import { subscriptionPlansAction } from "../../redux/actions/subscriptionPlansAction";
import {
  getProviderByPreferenceService,
  getProviderCompleteProfileService,
} from "../../services/Providers/Search/SearchService";
import { getAge } from "../../Utils/getAge";
import {
  dislikeProviderPictureService,
  getAllPaidPictures,
  getProviderGalleryByIdService,
  likeProviderPictureService,
  payForPictureService,
} from "../../services/Providers/Gallery/Gallery";
import { requestProviderService_Service } from "../../services/Providers/Service/Service";
import ServiceRequestModal from "../../components/Modals/ServiceRequestModal";
import { fetchUserSubscriptionAction } from "../../redux/actions/userAction";

const CustomerHomePage = (props) => {
  let location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const mobile = useMobile();
  const params = location?.search;
  const customerId = location?.pathname?.split("/")[3];
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  const userSub = useSelector((state) => state.userReducer.activeSub);
  const user = useSelector((state) => state.userReducer.data);
  const [showServiceRequestModal, setShowServiceRequestModal] = useState(false);

  const [allPaidPics, setAllPaidPics] = useState([]);
  const [imgPosition, setImgPosition] = useState(0);
  const [index, setIndex] = useState(0);
  const [images, setImages] = useState([]);
  const [activeImage, setActiveImage] = useState(images[index]);
  const [providerIndex, setProviderIndex] = useState({
    currentIndex: 1,
    maxIndex: 0,
  });
  const [providersByPreference, setProvidersByPreference] = useState([]);
  const [currentProfile, setCurrentProfile] = useState(
    providersByPreference[providerIndex.currentIndex]
  );
  const [serviceRequest, setServiceRequest] = useState({
    providerServiceIds: [currentProfile?.providerServices[0]?._id],
    appointmentTime: "",
    providerId: "",
    customerId: user?._id,
  });

  /* const [activeImage, setActiveImage] = useState(
      currentProfile?.imgUrls[index]
  );*/

  const [wallet, setWallet] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showSearchResult, setShowSearchResult] = useState(false);
  const [data, setData] = useState({
    location: "",
    gender: "",
    startAge: 18,
    endAge: 25,
  });
  const [showFilter, setShowFilter] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showActivatePremium, setShowActivatePremium] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [premiumActive, setPremiumActive] = useState(false);
  const [showRestore, setShowRestore] = useState(false);
  const [lastDeclined, setLastDeclined] = useState(null);

  useEffect(() => {
    if (currentProfile?.providerServices[0]?._id) {
      console.log("id = ", currentProfile?.providerServices[0]?._id);
      setServiceRequest({
        ...serviceRequest,
        providerServiceIds: [currentProfile?.providerServices[0]?._id],
      });
    }
  }, [currentProfile]);

  const handleSearch = () => {
    setShowFilter(false);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setImgPosition(0);
      setIndex(0);
      setShowSearchResult(true);
    }, 2000);
  };

  const handleSwipePreviousImage = () => {
    const length = images.length;
    const indx = imgPosition === 0 ? length : imgPosition - 1;
    const active = images[indx];
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
    const active = images[indx];
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
    const selected = providersByPreference?.find((i) => i._id === id);
    setCurrentProfile(selected);
    setShowSearchResult(false);
  }

  async function handleLikeAccepted() {
    setIsLoading(true);
    const res = await likeProviderPictureService({
      galleryId: activeImage?._id,
      userId: user?._id,
    });
    setIsLoading(false);
    if (res.ok) {
      const response = providersByPreference?.filter(
        (i) => i._id !== currentProfile?.providerProfile?._id
      );
      setProvidersByPreference(response);
      fetchCurrentProfileDetails(response);
      fetchCurrentProfileGallery(response);
    } else {
      message.error(res?.data?.errors[0].message || "Something went wrong");
    }
  }

  async function handleLikeDeclined() {
    setIsLoading(true);
    const res = await dislikeProviderPictureService({
      galleryId: activeImage?._id,
      userId: user?._id,
    });
    setIsLoading(false);
    if (res.ok) {
      setShowRestore(true);
      const others = providersByPreference?.filter(
        (i) => i._id !== currentProfile?.providerProfile?._id
      );
      const declined = providersByPreference?.find(
        (i) => i._id === currentProfile?.providerProfile?._id
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

  const fetchWallet = async () => {
    setIsLoading(true);
    const response = await getUserWalletService(user?._id);
    setIsLoading(false);
    if (response.ok) {
      setWallet(response?.data?.data);
    } else {
      message.error(
        response?.data?.errors[0].message || "Something went wrong"
      );
    }
  };

  const fetchCurrentProfileGallery = async (others = []) => {
    setIsLoading(true);
    const response = await getProviderGalleryByIdService(
      others[providerIndex.currentIndex]?.user ||
        providersByPreference[providerIndex.currentIndex]?.user?._id
    );
    setIsLoading(false);
    if (response.ok) {
      setImages(response?.data?.data);
      setActiveImage(response?.data?.data[0]);
    } else {
      message.error(
        response?.data?.errors[0].message || "Something went wrong"
      );
    }
  };

  const fetchCurrentProfileDetails = async (others = []) => {
    setIsLoading(true);
    const response = await getProviderCompleteProfileService(
      others[providerIndex.currentIndex]?.user ||
        providersByPreference[providerIndex.currentIndex]?.user?._id
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
    const response = await getProviderByPreferenceService({
      userId: user?._id,
    });
    setIsLoading(false);
    console.log("response data = ", response?.data);
    if (response.ok) {
      setProvidersByPreference(response?.data?.data || []);
      setProviderIndex({
        ...providerIndex,
        maxIndex: response?.data?.data?.length - 1 || 0,
      });
    } else {
      message.error(
        response?.data?.errors[0].message || "Something went wrong"
      );
    }
  };
  const fetchAllPaidPics = async () => {
    setIsLoading(true);
    const response = await getAllPaidPictures(user?._id);
    setIsLoading(false);
    if (response.ok) {
      setAllPaidPics(response?.data?.data);
    } else {
      message.error(
        response?.data?.errors[0].message || "Something went wrong"
      );
    }
  };

  useEffect(() => {
    if (providersByPreference[providerIndex.currentIndex]?.user?._id) {
      fetchAllPaidPics();
      fetchCurrentProfileDetails();
      fetchCurrentProfileGallery();
    }
  }, [providerIndex]);

  useEffect(() => {
    if (user?._id) {
      fetchWallet();
      fetchProviderByPreference();
      dispatch(subscriptionPlansAction());
      dispatch(fetchUserSubscriptionAction(user?._id));
    }
  }, [user?._id]);

  const handlePayForPic = async () => {
    setIsLoading(true);
    const response = await payForPictureService({
      userId: user?._id,
      galleryId: activeImage?._id,
    });
    if (response.ok) {
      message.success("Payment Successful");
      fetchAllPaidPics();
    } else {
      message.error(
        response?.data?.errors[0].message || "Something went wrong"
      );
    }
  };

  const handleServiceRequest = async () => {
    setIsLoading(true);
    const response = await requestProviderService_Service(serviceRequest);
    setIsLoading(false);
    if (response.ok) {
      message.success(response?.data?.message || "Request Submitted");
    } else {
      message.error(
        response?.data?.errors[0].message || "Something went wrong"
      );
    }
  };

  const discover = () => {
    return (
      <>
        <div
          className="d-flex justify-content-between align-items-center"
          style={{ width: "95%" }}
        >
          <h4 className="padding-none">Discover</h4>
          <img
            src={filter}
            className="img-fluid cursor"
            alt=""
            onClick={() => setShowFilter(true)}
          />
        </div>
        <br />
        <div className={styles.profileDetailsContainer}>
          <div className="row">
            <div className="col-md-6 p-0 position-relative">
              <div className="currentTotalImg">
                <div className="w-100 h-100 d-flex justify-content-center align-items-center">
                  <h5 className="text-white padding-none">
                    {`${imgPosition === images?.length ? 1 : imgPosition + 1}/${
                      images?.length
                    }`}
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
                  {activeImage?.isPrivate &&
                    !allPaidPics?.some(
                      (value) => value?.galleryId === activeImage?._id
                    ) && (
                      <div
                        className="d-flex flex-column cursor"
                        onClick={() => setShowActivatePremium(true)}
                      >
                        <img
                          src={locked}
                          alt=""
                          className="img-fluid align-self-center"
                          style={{ width: "3.8rem", height: "4.5rem" }}
                        />
                        <p className="text-white text-center">Tap to view</p>
                      </div>
                    )}

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
              <img
                src={activeImage?.imageUri[0]}
                alt=""
                className={`${styles.galleryImg} ${
                  activeImage?.isPrivate &&
                  !allPaidPics?.some(
                    (value) => value?.galleryId === activeImage?._id
                  ) &&
                  customer.imageBlur
                }`}
              />
              {/*{userSub?.length !== 0 && (*/}
                <>
                  <div className="actions">
                    {params === "?chat=yes" ? (
                      <div className="actions__container">
                        <img
                          src={msg}
                          className="img-fluid"
                          alt=""
                          onClick={() =>
                            history.push(`${routes.CHAT}/${customerId}`)
                          }
                        />{" "}
                      </div>
                    ) : (
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
                        />{" "}
                        <img
                          src={fav}
                          className="img-fluid"
                          alt=""
                          onClick={handleLikeAccepted}
                        />
                      </div>
                    )}
                  </div>
                </>
            </div>
            <div className={`col-md-6 ${styles.profileContainerRightCol}`}>
              <div className="d-flex justify-content-between">
                <h4 className="text-dark">{`${
                  currentProfile?.firstName || ""
                } ${currentProfile?.lastName || ""} ${getAge(
                  currentProfile?.providerProfile?.dateOfBirth
                )}`}</h4>
                {/*  <div className="d-flex justify-content-between align-items-center">
                  <h5 className="padding-none mt-2">
                    {currentProfile?.providerProfile?.rating || 0}
                  </h5>
                  <img
                    src={star}
                    className="img-fluid ml-2"
                    alt=""
                    style={{
                      width: "1.9rem",
                      height: "1.9rem",
                    }}
                  />
                </div>*/}
              </div>
              <p className="text-muted">
                {`${currentProfile?.providerProfile?.city || ""}  ${
                  currentProfile?.providerProfile?.state || ""
                }`}{" "}
                <br />
                {`${currentProfile?.providerProfile?.country || ""}`}
              </p>
              <div>
                <Badge
                  text={
                    currentProfile?.providerServices[0]?.serviceCategory
                      ?.serviceCategoryName || ""
                  }
                />
              </div>
              <br />
              <div className="dotted-divider w-100" />
              <br />
              <h4 className="text-dark">Bio</h4>
              <p className="text-muted">
                {currentProfile?.providerProfile?.biography}
              </p>
              <br />
              <h4>Attributes</h4>
              <Badge
                text={currentProfile?.providerAttributes?.bodyType || ""}
              />
              <Badge text={currentProfile?.providerAttributes?.height || ""} />
              <Badge
                text={currentProfile?.providerAttributes?.education || ""}
              />
              <Badge
                text={`Smoking: ${
                  currentProfile?.providerAttributes?.smokeType || ""
                }`}
              />
              <Badge
                text={`Drink: ${
                  currentProfile?.providerAttributes?.drinkType || ""
                }`}
              />

              <br />
              <br />
              <br />
              <button
                className="btn btn-primary cursor"
                onClick={() => {
                /*  if (userSub?.length === 0) {
                    message.error("Subscribe to premium to request a service");
                  } else {
                    setServiceRequest({
                      ...serviceRequest,
                      providerId: currentProfile?._id,
                    });
                    setShowServiceRequestModal(true);
                  }*/
                  setServiceRequest({
                    ...serviceRequest,
                    providerId: currentProfile?._id,
                  });
                  setShowServiceRequestModal(true);
                }}
              >
                Request Service
              </button>
            </div>
          </div>
        </div>
      </>
    );
  };

  const filterResult = () => {
    return (
      <>
        <div className="mb-2">
          <IoIosArrowBack
            className="cursor"
            onClick={() => setShowSearchResult(false)}
          />
        </div>
        <h4 className="padding-none">Filter</h4>
        <br />
        <br />
        <div className={styles.discoverGridContainer}>
          {providersByPreference?.map((item, index) => (
            <div
              className="position-relative cursor"
              onClick={() => handleSetCurrentProfile(item?.id, index)}
              key={item?.id}
            >
              <div
                className={`${styles.galleryImgThumbnail} ${styles.galleryImgThumbnailOverlay}`}
              />
              <img
                src={item?.imgUrls[0]}
                alt=""
                className={styles.galleryImgThumbnail}
              />
              <div className={styles.galleryImgThumbnailDesc}>
                <small className="font-weight-bold text-white">
                  {`${item?.name} ${item?.age}`}
                </small>
              </div>
              {/* /.font-weight-bold */}
            </div>
          ))}
        </div>
      </>
    );
  };

  if (isLoading) {
    return (
      <HomeContainerPage>
        <LoaderComponent />
      </HomeContainerPage>
    );
  }
  return (
    <HomeContainerPage>
      {providersByPreference?.length > 0 ? (
        <div className="row">
          <SubscribePremium
            handlePremium={() => setShowPaymentModal(true)}
            subscribed={userSub?.length > 0}
          />
          <div
            className={`${
              premiumActive ? `col-md-8 offset-md-2` : `col-md-9`
            } ${customer.rightColumn}`}
          >
            {showSearchResult ? filterResult() : discover()}
          </div>
        </div>
      ) : (
        <NoData text="Stay tuned for more users" />
      )}
      <br />

      <ActivatePremiumModal
        visible={showActivatePremium}
        handlePayForPic={handlePayForPic}
        onCancel={() => setShowActivatePremium(false)}
      />
      <PaymentModal
        wallet={wallet}
        visible={showPaymentModal}
        onCancel={(success) => {
          if (success === "continue") {
            setShowPaymentModal(false);
            setShowSuccess(true);
          } else {
            setShowPaymentModal(false);
          }
        }}
      />
      <FilterModal
        visible={showFilter}
        setData={setData}
        data={data}
        handleSearch={fetchProviderByPreference}
        onCancel={() => setShowFilter(false)}
      />
      <SuccessModal
        title="Payment Successful"
        subtitle="Have fun on whisper"
        visible={showSuccess}
        onCancel={() => setShowSuccess(false)}
        image={modalImg}
        showButton
        btnText="Continue"
        btnClickHandler={() => setShowSuccess(false)}
      />
      <ServiceRequestModal
        visible={showServiceRequestModal}
        setServiceRequest={setServiceRequest}
        serviceRequest={serviceRequest}
        handleServiceRequest={handleServiceRequest}
        services={
          currentProfile?.providerServices[0]?.serviceCategory?.services
        }
        price={
          currentProfile?.providerServices[0]?.serviceCategory?.pricePerHour
        }
        onCancel={() => setShowServiceRequestModal(false)}
      />
    </HomeContainerPage>
  );
};

export default CustomerHomePage;
