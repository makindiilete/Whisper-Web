import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import useMobile from "../../hooks/useMobile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as icons from "@fortawesome/free-solid-svg-icons";
import { HomeContainerPage } from "./HomeContainer.page";
import styles from "../../assets/css/providerHome.module.css";
import img1 from "../../assets/images/homeInApp/Rectangle 2685.svg";
import img2 from "../../assets/images/homeInApp/Rectangle 13 copy.svg";
import img3 from "../../assets/images/homeInApp/Rectangle 2685 copy 3.svg";
import img4 from "../../assets/images/homeInApp/Rectangle 13.svg";
import img5 from "../../assets/images/homeInApp/Rectangle 2685 copy 4.svg";
import img6 from "../../assets/images/homeInApp/Rectangle 2685 copy 2.svg";
import reverse from "../../assets/images/homeInApp/Group 754.svg";
import like from "../../assets/images/homeInApp/love.svg";
import decline from "../../assets/images/homeInApp/decline.svg";
import { Badge } from "../../components/Badge";
import { providerLikes } from "../../components/dataSets";

const ProviderHomePage = (props) => {
  let location = useLocation();
  const history = useHistory();
  const mobile = useMobile();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  const [imgPosition, setImgPosition] = useState(0);
  const [index, setIndex] = useState(0);
  const [allLikes, setAllLikes] = useState([]);
  const [currentProfile, setCurrentProfile] = useState(providerLikes[0]);
  const [activeImage, setActiveImage] = useState(currentProfile.imgUrls[index]);
  const [images, setImages] = useState(currentProfile.imgUrls);

  useEffect(() => {
    const response = providerLikes?.filter(
      (i) => i.id !== providerLikes[0]?.id
    );
    setAllLikes(response);
  }, []);

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
    const response = allLikes?.filter((i) => i.id !== id);
    setIndex(index);
    const selected = allLikes?.find((i) => i.id === id);
    setAllLikes(response);
    setActiveImage(selected?.imgUrls[0]);
    setImages(selected?.imgUrls);
    setCurrentProfile(selected);
  }

  return (
    <HomeContainerPage>
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
                        imgPosition === images.length ? 1 : imgPosition + 1
                      }/${images.length}`}
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
                    <img src={reverse} className="img-fluid" alt="" />
                    <img src={like} className="img-fluid" alt="" />
                    <img src={decline} className="img-fluid" alt="" />
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
      <br />
    </HomeContainerPage>
  );
};

export default ProviderHomePage;
