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

const CustomerHomePage = (props) => {
  let location = useLocation();
  const history = useHistory();
  const mobile = useMobile();
  const params = location?.search;
  const customerId = location?.pathname?.split("/")[3];
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
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
  const [imgPosition, setImgPosition] = useState(0);
  const [index, setIndex] = useState(0);
  const [showRestore, setShowRestore] = useState(false);
  const [lastDeclined, setLastDeclined] = useState(null);
  const [allLikes, setAllLikes] = useState(customerDiscover);
  const [currentProfile, setCurrentProfile] = useState(customerDiscover[0]);
  const [activeImage, setActiveImage] = useState(
    currentProfile?.imgUrls[index]
  );
  const [images, setImages] = useState(currentProfile?.imgUrls);

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

  const handleMoveBack = () => {
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

  const handleMoveNext = () => {
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
    const selected = allLikes?.find((i) => i.id === id);
    setActiveImage(selected?.imgUrls[0]);
    setImages(selected?.imgUrls);
    setCurrentProfile(selected);
    setShowSearchResult(false);
  }

  function handleLikeAccepted() {
    const response = allLikes?.filter((i) => i.id !== currentProfile?.id);
    setAllLikes(response);
    setActiveImage(response[0].imgUrls[0]);
    setCurrentProfile(response[0]);
  }

  function handleLikeDeclined() {
    setShowRestore(true);
    const others = allLikes?.filter((i) => i.id !== currentProfile?.id);
    const declined = allLikes?.find((i) => i.id === currentProfile?.id);
    setLastDeclined(declined);
    setAllLikes(others);
    setCurrentProfile(others[0]);
    setActiveImage(others[0].imgUrls[0]);
  }

  function handleFavorite() {}

  function handleDeclineRestored() {
    let returnArr = [lastDeclined, ...allLikes];
    setAllLikes(returnArr);
    setActiveImage(returnArr[0].imgUrls[0]);
    setCurrentProfile(returnArr[0]);
    setShowRestore(false);
  }

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
                  <div className="arrow backArrow" onClick={handleMoveBack}>
                    <FontAwesomeIcon
                      icon={icons.faChevronLeft}
                      size="1x"
                      className="text-white"
                    />
                  </div>
                  {!premiumActive && imgPosition !== 0 && (
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

                  <div className="arrow nextArrow" onClick={handleMoveNext}>
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
                src={activeImage}
                alt=""
                className={`${styles.galleryImg} ${
                  !premiumActive && imgPosition !== 0 && customer.imageBlur
                }`}
              />
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
                      onClick={handleFavorite}
                    />
                  </div>
                )}
              </div>
            </div>
            <div className={`col-md-6 ${styles.profileContainerRightCol}`}>
              <div className="d-flex justify-content-between">
                <h4 className="text-dark">{`${currentProfile?.name} ${currentProfile?.age}`}</h4>
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="padding-none mt-2">4.4</h5>
                  <img
                    src={star}
                    className="img-fluid ml-2"
                    alt=""
                    style={{
                      width: "1.9rem",
                      height: "1.9rem",
                    }}
                  />
                </div>
              </div>
              <p className="text-muted">
                {currentProfile?.location} <br />
                {`${currentProfile?.distance} away`}
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
              <p className="text-muted">{currentProfile?.bio}</p>
              <br />
              <h4>Attributes</h4>
              {currentProfile?.attributes?.map((item) => (
                <Badge text={item} key={item} />
              ))}
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
          {allLikes?.map((item, index) => (
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
      {allLikes?.length > 0 ? (
        <div className="row">
          <SubscribePremium
            handlePremium={() => setShowActivatePremium(true)}
            visible={!premiumActive}
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
        onCancel={(success) => {
          if (success === "continue") {
            setShowActivatePremium(false);
            setShowPaymentModal(true);
          } else {
            setShowActivatePremium(false);
          }
        }}
      />
      <PaymentModal
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
        handleSearch={handleSearch}
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
    </HomeContainerPage>
  );
};

export default CustomerHomePage;
