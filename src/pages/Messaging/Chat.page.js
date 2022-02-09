import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import useMobile from "../../hooks/useMobile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as icons from "@fortawesome/free-solid-svg-icons";
import { HomeContainerPage } from "../Home/HomeContainer.page";
import customer from "../../assets/css/customerHome.module.css";
import { Input } from "antd";
import { AiOutlineSearch, BiSearchAlt } from "react-icons/all";
import styles from "../../assets/css/providerHome.module.css";
import { customerDiscover, providerLikes } from "../../components/dataSets";
import routes from "../../routes";
import "../../assets/css/chat.css";
import shield from "../../assets/images/chat/shield.svg";
import send from "../../assets/images/chat/send.svg";

const ChatPage = (props) => {
  let location = useLocation();
  const history = useHistory();
  const mobile = useMobile();

  const [allLikes, setAllLikes] = useState(customerDiscover);
  const [showMsgs, setShowMsgs] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname, showMsgs]);
  const handleSetCurrentProfile = (id) => {
    history.push(`${routes.CUSTOMER_HOME}/id`);
  };

  return (
    <HomeContainerPage>
      <div className="row chat">
        <div className={`col-md-3 chat__list ${showMsgs && "chat__hide__col"}`}>
          <Input
            name="search"
            prefix={
              <AiOutlineSearch className="text-muted" size="2rem" color="red" />
            }
          />
          <br />
          <br />
          <h5>New Matches</h5>
          <br />
          <div className="thumbnailGridContainer">
            {allLikes?.slice(0, 4)?.map((item, index) => (
              <div
                className="position-relative cursor"
                onClick={() => handleSetCurrentProfile(item?.id, index)}
                key={item?.id}
              >
                <img
                  src={item?.imgUrls[0]}
                  alt=""
                  className="galleryImgThumbnail"
                />
              </div>
            ))}
          </div>
          <br />
          <br />
          <div className="dotted-divider w-100" />
          <br />
          <h5 className="mb-2">Messages</h5>
          {allLikes?.slice(5, 9)?.map((item, index) => (
            <div
              className="position-relative cursor mb-3 d-flex align-items-center"
              onClick={() => {
                // handleSetCurrentProfile(item?.id, index)
                setShowMsgs(!showMsgs);
              }}
              key={item?.id}
            >
              <img
                src={item?.imgUrls[0]}
                alt=""
                className="galleryImgThumbnail mr-2"
                style={{ height: "7.2rem" }}
              />
              <div>
                <h5 className="padding-none">{item?.name}</h5>
                <div>
                  <small className="text-muted">
                    Lorem ipsum dolor sit amet.
                  </small>
                </div>
              </div>
            </div>
          ))}
          <br />
          <br />
        </div>

        <div
          className={`col-md-9 chat__msgs ${!showMsgs && "chat__hide__col"}`}
        >
          <>
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                {mobile && (
                  <FontAwesomeIcon
                    icon={icons.faArrowLeft}
                    size=""
                    className="primary-text mr-3"
                    onClick={() => setShowMsgs(!showMsgs)}
                  />
                )}
                <img
                  src={allLikes[0]?.imgUrls[0]}
                  alt=""
                  className="galleryImgThumbnail mr-3"
                  style={{ height: "4rem", width: "4rem" }}
                />
                <h5 className="padding-none">Niccky Perry</h5>
              </div>

              <div className="d-flex align-items-center">
                <button
                  className="btn btn-outline-primary-light btn-sm d-flex align-items-center"
                  style={{ height: "4.1rem", borderRadius: "20.5px" }}
                >
                  Make Payment
                </button>
                <img
                  src={shield}
                  alt=""
                  className="ml-3 img-fluid"
                  style={{
                    height: "2.1rem",
                    width: "2rem",
                    objectFit: "contain",
                  }}
                />
              </div>
            </div>
          </>
          <br />
          <div className="dotted-divider w-100" />
          <>
            <div className="py-3 h-75 ">
              <p>hello msg</p>
            </div>
          </>
          <>
            <div className="d-flex align-items-center justify-content-between">
              <Input name="message" />
              <img
                src={send}
                className="img-fluid ml-3"
                alt=""
                style={{
                  width: "4.8rem",
                  height: "4.8rem",
                }}
              />
            </div>
          </>
        </div>
      </div>
    </HomeContainerPage>
  );
};

export default ChatPage;
