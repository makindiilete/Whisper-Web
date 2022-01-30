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

const ProviderHomePage = (props) => {
  let location = useLocation();
  const history = useHistory();
  const mobile = useMobile();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  const [imgPosition, setImgPosition] = useState(0);
  const [index, setIndex] = useState(0);
  const [showRestore, setShowRestore] = useState(false);
  const [lastDeclined, setLastDeclined] = useState(null);
  const [allLikes, setAllLikes] = useState(providerLikes);
  const [currentProfile, setCurrentProfile] = useState(providerLikes[0]);
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
                      <div className="arrow backArrow" onClick={handleMoveBack}>
                        <FontAwesomeIcon
                          icon={icons.faChevronLeft}
                          size="1x"
                          className="text-white"
                        />
                      </div>
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
                  <h4 className="text-dark">{`${currentProfile?.name} ${currentProfile?.age}`}</h4>
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
          <div className={`col-md-4 ${styles.leftColumn}`}>
            <h4>Latest Like/Request</h4>
            <br />
            <div className={styles.thumbnailGridContainer}>
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
                    <br />
                    <small className="text-white">{item?.occupation}</small>
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
