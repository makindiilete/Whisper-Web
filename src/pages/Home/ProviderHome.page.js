import React, { useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import useMobile from "../../hooks/useMobile";
import { HomeContainerPage } from "./HomeContainer.page";
import styles from "../../assets/css/providerHome.module.css";
import img1 from "../../assets/images/homeInApp/Rectangle 2685.svg";

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
                <p className="font-weight-bolder">Jack Smith 27</p>
              </div>
              {/* /.col-md-6 */}
            </div>
            {/* /.row */}
          </div>
        </div>
        <div className={`col-md-4 ${styles.leftColumn}`}>
          <h4>Latest Like/Request</h4>
          <br />
        </div>
      </div>
      <br />
    </HomeContainerPage>
  );
};

export default ProviderHomePage;
