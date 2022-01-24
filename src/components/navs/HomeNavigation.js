import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import useMobile from "../../hooks/useMobile";
import logo from "../../assets/images/WhisperLogo.svg";
import styles from "../../assets/css/navs/homeNavigation.module.css";
import { CloseSquareOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { CgCloseR, RiMenu3Line } from "react-icons/all";

const HomeNavigation = (props) => {
  let location = useLocation();
  const history = useHistory();
  const mobile = useMobile();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div>
      <div className={styles.nav}>
        <img
          src={logo}
          alt=""
          className={`img-fluid cursor ${styles.logo}`}
          onClick={() => history.push("/")}
        />
        <div
          className={styles.nav__toggler}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {!isExpanded ? (
            <RiMenu3Line color="#fff" />
          ) : (
            <CgCloseR color="#fff" />
          )}
        </div>
        <div className={styles.nav__links}>
          {isExpanded && mobile ? (
            <>
              <ul>
                <li>About Whisper</li>
                <li>Contact us</li>
                <li>Select</li>
                <li>
                  <button className={`btn btn-light ${styles.btn}`}>
                    Download the App
                  </button>
                </li>
              </ul>
            </>
          ) : !isExpanded && mobile ? null : (
            <>
              <p className="text-white mr-5 padding-none">About Whisper</p>
              <p className="text-white mr-5 padding-none">Contact us</p>
              <p className="text-white mr-5 padding-none">Select</p>
              <button className={`btn btn-light ${styles.btn}`}>
                Download the App
              </button>
            </>
          )}
        </div>
      </div>
      {/* /.nav */}
    </div>
  );
};

export default HomeNavigation;
