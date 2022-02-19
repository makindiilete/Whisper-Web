import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import logo from "../assets/images/homeInApp/logoInApp.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as icons from "@fortawesome/free-solid-svg-icons";
import "../assets/css/navigation.css";
import useMobile from "../hooks/useMobile";
import avatar from "../assets/images/nav/avatarchange.svg";
import { Dropdown, Menu } from "antd";
import routes from "../routes";
import { useSelector } from "react-redux";

const { Item, Divider } = Menu;

const NavigationPage = (props) => {
  const history = useHistory();
  let location = useLocation();
  const user = useSelector((state) => state.userReducer?.data);
  const { pathname } = location;
  const current = pathname.split("/")[1];
  const [isExpanded, setIsExpanded] = useState(false);
  const [path, setPath] = useState(0);
  const [userType, setUserType] = useState(user?.userType);
  const mobile = useMobile();

  useEffect(() => {}, [pathname]);

  function handleLogout() {
    localStorage.removeItem("token");
    history.push(routes.login);
  }

  const truncateString = (str, num) => {
    if (str?.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  };

  const menu = (
    <Menu>
      <Item key="0" onClick={() => history.push(routes.PROFILE)}>
        <p className="padding-none">
          <FontAwesomeIcon
            icon={icons.faUser}
            size="1x"
            className="text-muted mr-2"
          />
          Profile Settings
        </p>
      </Item>
      <Divider />
      <Item key="1" onClick={handleLogout}>
        <p className="padding-none">
          <FontAwesomeIcon
            icon={icons.faSignOutAlt}
            size="1x"
            className="text-muted mr-2"
          />
          Log out
        </p>
      </Item>
    </Menu>
  );

  useEffect(() => {
    switch (current) {
      case "home":
        setPath(0);
        break;
      case "wallet":
        setPath(1);
        break;
      case "messaging":
        setPath(2);
        break;
      default:
        setPath(8);
    }
  }, [location.pathname]);

  const defaultImage = (ev) => {
    ev.target.src = avatar;
  };

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
        <ul className="list nav__list collapsible__content">
          {mobile ? (
            <>
              <li
                onClick={() => {
                  setIsExpanded(!isExpanded);
                  history.push(
                    userType?.toLowerCase() === "customer"
                      ? routes.CUSTOMER_HOME
                      : routes.PROVIDER_HOME
                  );
                }}
                className="nav__item"
              >
                Home
              </li>
              <li
                onClick={() => {
                  setIsExpanded(!isExpanded);
                  history.push(routes.WALLET);
                }}
                className="nav__item"
              >
                Wallet
              </li>
              <li
                onClick={() => {
                  setIsExpanded(!isExpanded);
                  history.push(routes.CHAT);
                }}
                className="nav__item"
              >
                Messaging
              </li>
              <li
                className="nav__item"
                onClick={() => {
                  setIsExpanded(!isExpanded);
                  history.push(routes.PROFILE);
                }}
              >
                Profile
              </li>
              <li className="nav__item" onClick={handleLogout}>
                Logout
              </li>
            </>
          ) : (
            <>
              <li
                onClick={() =>
                  history.push(
                    userType?.toLowerCase() === "customer"
                      ? routes.CUSTOMER_HOME
                      : routes.PROVIDER_HOME
                  )
                }
                className={`nav__item ${path === 0 && "active"}`}
              >
                Home
              </li>
              <li
                onClick={() => history.push(routes.WALLET)}
                className={`nav__item ${path === 1 && "active"}`}
              >
                Wallet
              </li>
              <li
                onClick={() => history.push(routes.CHAT)}
                className={`nav__item ${path === 2 && "active"}`}
              >
                Messaging
              </li>
            </>
          )}
        </ul>
        {!mobile && (
          <Dropdown overlay={menu} trigger={["click"]}>
            <div className="settings">
              <img
                src={
                  user?.customerProfile?.profilePictureUri ||
                  user?.providerProfile?.profilePictureUri ||
                  avatar
                }
                className=" img-fluid"
                alt=""
                onError={defaultImage}
              />
              <small className="text-dark padding-none">
                {truncateString(user?.firstName, 6)}
              </small>
              <FontAwesomeIcon
                icon={icons.faChevronDown}
                size="1x"
                className="primary-text"
              />
            </div>
          </Dropdown>
        )}
      </nav>
    </section>
  );
};

export default NavigationPage;
