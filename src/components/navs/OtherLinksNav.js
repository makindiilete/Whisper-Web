import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import logo from "../../assets/images/homeInApp/logoInApp.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as icons from "@fortawesome/free-solid-svg-icons";
import "../../assets/css/navigation.css";
import { Dropdown, Menu } from "antd";
import routes from "../../routes";
import useMobile from "../../hooks/useMobile";
import styles from "../../assets/css/navs/homeNavigation.module.css";

const { Item, Divider } = Menu;

const OtherLinksNav = (props) => {
  const history = useHistory();
  let location = useLocation();
  const { pathname } = location;
  const current = pathname.split("/")[1];
  const [isExpanded, setIsExpanded] = useState(false);
  const [path, setPath] = useState(0);
  const mobile = useMobile();

  useEffect(() => {}, [pathname]);

  useEffect(() => {
    switch (current) {
      case "about":
        setPath(0);
        break;
      case "contact":
        setPath(1);
        break;
      case "login":
        setPath(2);
        break;
      default:
        setPath(8);
    }
  }, [location.pathname]);

  return (
    <section className="navigation">
      <nav
        className={
          !isExpanded
            ? "nav collapsible"
            : "nav collapsible collapsible--expanded "
        }
      >
        <img src={logo} className="img-fluid nav__brand" alt="" />
        <FontAwesomeIcon
          icon={icons.faBars}
          size="2x"
          className="text-dark nav__toggler"
          onClick={() => setIsExpanded(!isExpanded)}
        />
        <ul
          className="list nav__list collapsible__content"
          style={{ alignItems: "center" }}
        >
          {mobile ? (
            <>
              <li
                className="nav__item"
                onClick={() => {
                  setIsExpanded(!isExpanded);
                  history.push(routes.ABOUT);
                }}
              >
                About Whisper
              </li>
              <li
                onClick={() => {
                  setIsExpanded(!isExpanded);
                  history.push(routes.CONTACT);
                }}
                className="nav__item"
              >
                Contact Us
              </li>
              <li
                onClick={() => {
                  setIsExpanded(!isExpanded);
                  history.push(routes.login);
                }}
                className="nav__item"
              >
                Login
              </li>
              <li className="nav__item">
                <button className={`btn btn-primary ${styles.btn}`}>
                  Download the App
                </button>
              </li>
            </>
          ) : (
            <>
              <li
                className={`nav__item ${path === 0 && "active"}`}
                onClick={() => history.push(routes.ABOUT)}
              >
                About Whisper
              </li>
              <li
                className={`nav__item ${path === 1 && "active"}`}
                onClick={() => history.push(routes.CONTACT)}
              >
                Contact Us
              </li>
              <li
                className={`nav__item ${path === 2 && "active"}`}
                onClick={() => history.push(routes.login)}
              >
                Login
              </li>{" "}
              <li className={`nav__item `}>
                <button className={`btn btn-primary ${styles.btn}`}>
                  Download the App
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </section>
  );
};

export default OtherLinksNav;
