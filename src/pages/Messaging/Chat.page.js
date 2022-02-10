import React, { useEffect, useRef, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import useMobile from "../../hooks/useMobile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as icons from "@fortawesome/free-solid-svg-icons";
import { HomeContainerPage } from "../Home/HomeContainer.page";
import customer from "../../assets/css/customerHome.module.css";
import { Dropdown, Input, Menu } from "antd";
import { AiOutlineSearch, BiSearchAlt } from "react-icons/all";
import styles from "../../assets/css/providerHome.module.css";
import {
  chats,
  customerDiscover,
  providerLikes,
} from "../../components/dataSets";
import routes from "../../routes";
import "../../assets/css/chat.css";
import shield from "../../assets/images/chat/shield.svg";
import send from "../../assets/images/chat/send.svg";
import report from "../../assets/images/chat/report.svg";
import cancel from "../../assets/images/chat/cancelAppointment.svg";
import unconnect from "../../assets/images/chat/unconnect.svg";
import PayForServiceModal from "../../components/Modals/PayForServiceModal";
import PaymentModal from "../../components/Modals/paymentModal";
import SuccessModal from "../../components/Modals/successModal";
import modalImg from "../../assets/images/auth/40.svg";

const { Item, Divider } = Menu;

const ChatPage = (props) => {
  let location = useLocation();
  const history = useHistory();
  const mobile = useMobile();
  const userId = location.pathname?.split("/")[2];
  const [allLikes, setAllLikes] = useState(customerDiscover);
  const [showSuccess, setShowSuccess] = useState(false);
  const [currentChat, setCurrentChat] = useState(customerDiscover[0]);
  const [showMsgs, setShowMsgs] = useState(false);
  const [showPayForService, setShowPayForService] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [chatMsgs, setChatMsgs] = useState([]);

  useEffect(() => {
    setShowMsgs(true);
  }, [userId]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname, showMsgs]);
  const handleSetCurrentProfile = (id) => {
    history.push(`${routes.CUSTOMER_HOME}/${id}?chat=yes`);
  };

  const msgEndRef = useRef(null);
  const scrollToBottom = () => {
    msgEndRef?.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    setChatMsgs(chats);
  }, []);

  useEffect(() => {
    // if (chatMsgs?.length > 0) {
    scrollToBottom();
    // }
  });

  const menu = (
    <Menu>
      <Item key="0" onClick={() => console.log("Heeeeey")}>
        <div className="d-flex align-content-center">
          <img src={report} className="mr-3 img-fluid" alt="" />
          <small>Report User</small>
        </div>
      </Item>
      <Divider />
      <Item key="1">
        <div className="d-flex align-content-center">
          <img src={unconnect} className="mr-3 img-fluid" alt="" />
          <small>Disconnect this User</small>
        </div>
      </Item>
      <Divider />
      <Item key="2">
        <div className="d-flex align-content-center">
          <img src={cancel} className="mr-3 img-fluid" alt="" />
          <small>Cancel Appointment</small>
        </div>
      </Item>
    </Menu>
  );

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
                setCurrentChat(item);
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
                  src={currentChat?.imgUrls[0]}
                  alt=""
                  className="galleryImgThumbnail mr-3"
                  style={{ height: "4rem", width: "4rem" }}
                />
                <h5 className="padding-none">{currentChat?.name}</h5>
              </div>

              <div className="d-flex align-items-center">
                <button
                  className="btn btn-outline-primary-light btn-sm d-flex align-items-center"
                  style={{ height: "4.1rem", borderRadius: "20.5px" }}
                  onClick={() => setShowPayForService(true)}
                >
                  Make Payment
                </button>
                <Dropdown overlay={menu} trigger={["click"]}>
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
                </Dropdown>
              </div>
            </div>
          </>
          <br />
          <div className="dotted-divider w-100" />
          <>
            <div className="py-3 overflow-auto" style={{ height: "90%" }}>
              {chatMsgs?.map((item, index) => (
                <div key={item?.id}>
                  <div className=" mb-4">
                    <p className="padding-none conversation conversation__sender">
                      {item?.sender}
                    </p>
                  </div>
                  <div className="receiver__container mb-4">
                    <p className="padding-none conversation conversation__receiver">
                      {item?.receiver}
                    </p>
                  </div>
                  {index === chatMsgs?.length - 1 && (
                    <div
                      className="w-100"
                      style={{ height: "5rem" }}
                      ref={msgEndRef}
                    />
                  )}
                </div>
              ))}
            </div>
          </>
          <>
            <div
              className="d-flex align-items-center justify-content-between position-fixed bg-white"
              style={
                mobile
                  ? { bottom: "0", width: "85%" }
                  : { bottom: "0", width: "68%" }
              }
            >
              <Input.TextArea
                rows={2}
                name="message"
                allowClear
                placeholder="Message..."
              />
              <img
                src={send}
                className="img-fluid ml-3"
                alt=""
                style={{
                  width: "4.8rem",
                  height: "4.8rem",
                  marginTop: "-1rem",
                }}
              />
            </div>
          </>
        </div>
      </div>
      <PayForServiceModal
        visible={showPayForService}
        onCancel={(arg) => {
          if (arg === "continue") {
            setShowPayForService(false);
            setShowPayment(true);
          } else {
            setShowPayForService(false);
          }
        }}
      />

      <PaymentModal
        visible={showPayment}
        onCancel={(success) => {
          if (success === "continue") {
            setShowPayment(false);
            setShowSuccess(true);
          } else {
            setShowPayment(false);
          }
        }}
      />

      <SuccessModal
        title="Payment Successful"
        subtitle="Have fun on whisper"
        visible={showSuccess}
        onCancel={() => setShowSuccess(false)}
        image={modalImg}
        showButton
        btnText="Continue"
        btnClickHandler={() => setShowSuccess(false)}
      />
    </HomeContainerPage>
  );
};

export default ChatPage;
