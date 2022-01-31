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

const CustomerHomePage = (props) => {
  let location = useLocation();
  const history = useHistory();
  const mobile = useMobile();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  const [showActivatePremium, setShowActivatePremium] = useState(false);
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
  return (
    <HomeContainerPage>
      {allLikes?.length > 0 ? (
        <div className="row">
          {!premiumActive && (
            <div className={`col-md-3 ${customer.leftColumn}`}>
              <div className="w-100 d-flex justify-content-center">
                <div className={customer.premiumBoxImgParentWrapper}>
                  <div className={customer.premiumBoxImgWrapper}>
                    <img src={premiumImg} alt="" />
                  </div>
                </div>
              </div>
              <div className={customer.premiumBox}>
                <div>
                  <h5 className="primary-text text-center padding-none mb-2">
                    Whisper Premium
                  </h5>
                  <div className="d-flex justify-content-center">
                    <small className="text-center padding-none ">
                      Get Whisper Premium to gain to chat, view and meet anyone
                      you please
                    </small>
                  </div>
                </div>
              </div>
              <div className={customer.premiumPrices}>
                <div className="row">
                  <div className={`col-4 ${customer.premiumPriceCol}`}>
                    <div>
                      <h5 className="text-center padding-none primary-text">
                        1
                      </h5>
                      <div className="d-flex justify-content-center">
                        <h6 className="text-muted text-center">Month</h6>
                      </div>
                      <div className="dotted-divider w-100" />
                      <div className="d-flex justify-content-center">
                        <h6 className="text-muted text-center mt-2">
                          $20/Month
                        </h6>
                      </div>
                    </div>
                  </div>
                  <div
                    className={`col-4 position-relative ${customer.premiumPriceActive} ${customer.premiumPriceCol}`}
                  >
                    <div>
                      <h5 className="text-center padding-none primary-text">
                        6
                      </h5>
                      <div className="d-flex justify-content-center">
                        <h6 className="font-weight-bolder text-dark text-center">
                          Month
                        </h6>
                      </div>
                      <div className="dotted-divider w-100" />
                      <div className="d-flex justify-content-center">
                        <h6 className="font-weight-bolder text-dark text-center mt-2">
                          $70/Month
                        </h6>
                      </div>
                    </div>
                    <div className={customer.badge}>
                      <h6 className="padding-none">Most Popular</h6>
                    </div>
                  </div>
                  <div className={`col-4 ${customer.premiumPriceCol}`}>
                    <div>
                      <h5 className="text-center padding-none primary-text">
                        1
                      </h5>
                      <div className="d-flex justify-content-center">
                        <h6 className="text-muted text-center">Month</h6>
                      </div>
                      <div className="dotted-divider w-100" />
                      <div className="d-flex justify-content-center">
                        <h6 className="text-muted text-center mt-2">
                          $120/Month
                        </h6>
                      </div>
                    </div>
                  </div>
                  {/* /.col-md-4 */}
                </div>
              </div>
            </div>
          )}
          <div
            className={`${
              premiumActive ? `col-md-8 offset-md-2` : `col-md-9`
            } ${customer.rightColumn}`}
          >
            <div
              className="d-flex justify-content-between align-items-center"
              style={{ width: "95%" }}
            >
              <h4 className="padding-none">Discover</h4>
              <img src={filter} className="img-fluid cursor" alt="" />
            </div>
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
          </div>
        </div>
      ) : (
        <NoData text="Stay tuned for more users" />
      )}
      <br />

      <ActivatePremiumModal
        visible={showActivatePremium}
        onCancel={() => setShowActivatePremium(false)}
      />
    </HomeContainerPage>
  );
};

export default CustomerHomePage;
