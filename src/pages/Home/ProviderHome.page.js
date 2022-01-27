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

const ProviderHomePage = (props) => {
  let location = useLocation();
  const history = useHistory();
  const mobile = useMobile();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  const [index, setIndex] = useState(1);
  const [images, setImages] = useState([img1, img3, img6]);
  const [activeImage, setActiveImage] = useState(images[0]);

  const handleMoveBack = () => {
    const indx = index === 1 ? images.length : index - 1;
    setIndex(indx);
    setActiveImage(images[indx - 1]);
  };

  const handleMoveNext = () => {
    const indx = index === images.length ? 1 : index + 1;
    setIndex(indx);
    setActiveImage(images[indx - 1]);
  };

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
                      {`${index}/${images.length}`}
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
                {/* /.prevNext */}
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
                {/* /.actions */}
              </div>
              {/* /.col-md-6 */}
              <div className={`col-md-6 ${styles.profileContainerRightCol}`}>
                <h4 className="text-dark">Jack Smith 27</h4>
                <p className="text-muted">
                  Los Angeles, CA <br />
                  5km away
                </p>
                <div>
                  <Badge text="Companion" type="primary" />
                  <Badge text="Xrated" type="secondary" />
                </div>
                <br />
                <div className="dotted-divider w-100" />
                <br />
                <h4 className="text-dark">Bio</h4>
                <p className="text-muted">
                  Vulputate non rhoncus urna molestie feugiat sed et non. Nibh
                  rhoncus vel pellentesque vitae, Nibh molestie lorem.
                </p>
                <br />
                <h4>Attributes</h4>
                <Badge text="Average" type="primary" />
                <Badge text="Cigarette" type="secondary" />
                <Badge text="Vodka" type="tertiary" />
                {/* /.text-muted */}
                {/* /.text-dark */}
              </div>
              {/* /.col-md-6 */}
            </div>
            {/* /.row */}
          </div>
        </div>
        <div className={`col-md-4 ${styles.leftColumn}`}>
          <h4>Latest Like/Request</h4>
          <br />
          <div
            className="d-flex flex-wrap"
            style={
              mobile
                ? {
                    marginRight: "-2rem",
                    justifyContent: "center",
                  }
                : null
            }
          >
            <div className="position-relative">
              <div
                className={`${styles.galleryImgThumbnail} ${styles.galleryImgThumbnailOverlay}`}
              />
              <img src={img2} alt="" className={styles.galleryImgThumbnail} />
              <div className={styles.galleryImgThumbnailDesc}>
                <small className="font-weight-bold text-white">
                  Jack Smith 27
                </small>
                <br />
                <small className="text-white">Business Man</small>
              </div>
              {/* /.font-weight-bold */}
            </div>
            <div className="position-relative">
              <div
                className={`${styles.galleryImgThumbnail} ${styles.galleryImgThumbnailOverlay}`}
              />
              <img src={img3} alt="" className={styles.galleryImgThumbnail} />
              <div className={styles.galleryImgThumbnailDesc}>
                <small className="font-weight-bold text-white">
                  Manny Rice 29
                </small>
                <br />
                <small className="text-white">Software Engineer</small>
              </div>
            </div>
            <div className="position-relative">
              <div
                className={`${styles.galleryImgThumbnail} ${styles.galleryImgThumbnailOverlay}`}
              />
              <img src={img4} alt="" className={styles.galleryImgThumbnail} />
              <div className={styles.galleryImgThumbnailDesc}>
                <small className="font-weight-bold text-white">
                  Ben Saheed 31
                </small>
                <br />
                <small className="text-white">Rock Star</small>
              </div>
            </div>
            <div className="position-relative">
              <div
                className={`${styles.galleryImgThumbnail} ${styles.galleryImgThumbnailOverlay}`}
              />
              <img src={img5} alt="" className={styles.galleryImgThumbnail} />
              <div className={styles.galleryImgThumbnailDesc}>
                <small className="font-weight-bold text-white">
                  Azeez Fahn 29
                </small>
                <br />
                <small className="text-white">Stock Broker</small>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
    </HomeContainerPage>
  );
};

export default ProviderHomePage;
