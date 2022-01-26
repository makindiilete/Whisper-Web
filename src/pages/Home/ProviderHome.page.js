import React, { useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import useMobile from "../../hooks/useMobile";
import { HomeContainerPage } from "./HomeContainer.page";
import styles from "../../assets/css/providerHome.module.css";
import img1 from "../../assets/images/homeInApp/Rectangle 2685.svg";
import img2 from "../../assets/images/homeInApp/Rectangle 13 copy.svg";
import img3 from "../../assets/images/homeInApp/Rectangle 13.png";
import img4 from "../../assets/images/homeInApp/Rectangle 13.svg";
import img5 from "../../assets/images/homeInApp/Rectangle 2685 copy 4.svg";
import { Badge } from "../../components/Badge";

const ProviderHomePage = (props) => {
  let location = useLocation();
  const history = useHistory();
  const mobile = useMobile();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  return (
    <HomeContainerPage>
      <div className="row">
        <div className="col-md-8">
          <h4>My Like/Request</h4>
          <br />
          <div className={styles.profileDetailsContainer}>
            <div className="row">
              <div className="col-md-6 p-0 position-relative">
                <div
                  className={`${styles.galleryImg} ${styles.galleryImgOverlay}`}
                />
                <img src={img1} alt="" className={styles.galleryImg} />
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
          <div className="d-flex flex-wrap">
            <div>
              <div
                className={`${styles.galleryImgThumbnail} ${styles.galleryImgThumbnailOverlay}`}
              />
              <img src={img2} alt="" className={styles.galleryImgThumbnail} />
            </div>
            <div>
              <div
                className={`${styles.galleryImgThumbnail} ${styles.galleryImgThumbnailOverlay}`}
              />
              <img src={img3} alt="" className={styles.galleryImgThumbnail} />
            </div>
            <div>
              <div
                className={`${styles.galleryImgThumbnail} ${styles.galleryImgThumbnailOverlay}`}
              />
              <img src={img4} alt="" className={styles.galleryImgThumbnail} />
            </div>
            <div>
              <div
                className={`${styles.galleryImgThumbnail} ${styles.galleryImgThumbnailOverlay}`}
              />
              <img src={img5} alt="" className={styles.galleryImgThumbnail} />
            </div>
          </div>
        </div>
      </div>
      <br />
    </HomeContainerPage>
  );
};

export default ProviderHomePage;
