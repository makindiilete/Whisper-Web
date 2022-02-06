import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import useMobile from "../../hooks/useMobile";
import { HomeContainerPage } from "../Home/HomeContainer.page";
import { SubscribePremium } from "../../components/SubscribePremium";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as icons from "@fortawesome/free-solid-svg-icons";
import routes from "../../routes";
import { AiOutlineEdit } from "react-icons/all";
import { Switch } from "antd";

const EditProfilePage = (props) => {
  let location = useLocation();
  const history = useHistory();
  const mobile = useMobile();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [premiumActive, setPremiumActive] = useState(false);
  const [showActivatePremium, setShowActivatePremium] = useState(false);
  const [notifications, setNotifications] = useState({
    all: true,
    message: false,
    match: false,
    mail: false,
    sms: false,
  });
  function onChange(name, value) {
    setNotifications({ ...notifications, [name]: value });
  }
  return (
    <HomeContainerPage>
      <section className="profile pb-5">
        <div className="row">
          <SubscribePremium
            handlePremium={() => setShowActivatePremium(true)}
            visible={!premiumActive}
          />
          <div
            className={`${
              premiumActive ? `col-md-8 offset-md-2` : `col-md-9`
            } `}
          >
            <div onClick={() => history.goBack()}>
              <FontAwesomeIcon
                icon={icons.faAngleLeft}
                size="2x"
                className="cursor"
              />
            </div>
            <br />

            <div className="col-md-6 mt-3">
              <div className="d-flex align-items-center mb-5">
                <h5 className="padding-none mr-5">Your Basic information</h5>
                <AiOutlineEdit
                  onClick={() => history.push(routes.EDIT_PROFILE)}
                  size="2rem"
                  className="cursor"
                />
              </div>
              <div className="d-flex justify-content-between mb-4">
                <small className="text-dark"> Name </small>
                <small className="text-muted">{user?.name}</small>
              </div>
              <div className="d-flex justify-content-between mb-4">
                <small className="text-dark"> Date Of Birth </small>
                <small className="text-muted">{user?.dob}</small>
              </div>
              <div className="d-flex justify-content-between mb-4">
                <small className="text-dark"> Gender </small>
                <small className="text-muted">{user?.gender}</small>
              </div>
            </div>
            <br />
            <div className={`dotted-divider ${mobile ? "w-100" : "w-50"}`} />
            <br />
            <div className="col-md-6 mt-3">
              <div className="d-flex align-items-center mb-5">
                <h5 className="padding-none mr-5">Your Account</h5>
                <AiOutlineEdit
                  onClick={() => history.push(routes.EDIT_PROFILE)}
                  size="2rem"
                  className="cursor"
                />
              </div>
              <div className="d-flex justify-content-between mb-4">
                <small className="text-dark"> Email Address </small>
                <small className="text-muted">{user?.email}</small>
              </div>
              <div className="d-flex justify-content-between mb-4">
                <small className="text-dark"> Password </small>
                <small className="text-muted">************</small>
              </div>
            </div>
            <br />
            <div className={`dotted-divider ${mobile ? "w-100" : "w-50"}`} />
            <br />
            <div className="col-md-6 mt-3">
              <div className="d-flex align-items-center mb-5">
                <h5 className="padding-none mr-5">Notifications</h5>
                <AiOutlineEdit
                  onClick={() => history.push(routes.EDIT_PROFILE)}
                  size="2rem"
                  className="cursor"
                />
              </div>
              <div className="d-flex justify-content-between mb-5">
                <small className="text-dark"> All Notifications </small>
                <Switch
                  checked={notifications.all}
                  onChange={(checked) => onChange("all", checked)}
                />
              </div>

              <div className="d-flex justify-content-between mb-5">
                <small className="text-dark"> Message Notifications </small>
                <Switch
                  checked={notifications.message}
                  onChange={(checked) => onChange("message", checked)}
                />
              </div>

              <div className="d-flex justify-content-between mb-5">
                <small className="text-dark"> Match Notifications </small>
                <Switch
                  checked={notifications.match}
                  onChange={(checked) => onChange("match", checked)}
                />
              </div>

              <div className="d-flex justify-content-between mb-5">
                <small className="text-dark">
                  Receive Notifications by Mail
                </small>
                <Switch
                  checked={notifications.mail}
                  onChange={(checked) => onChange("mail", checked)}
                />
              </div>

              <div className="d-flex justify-content-between mb-5">
                <small className="text-dark">
                  Receive Notifications by SMS
                </small>
                <Switch
                  checked={notifications.sms}
                  onChange={(checked) => onChange("sms", checked)}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </HomeContainerPage>
  );
};

export default EditProfilePage;
