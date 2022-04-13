import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Input, message, Modal } from "antd";
import { isMobile } from "react-device-detect";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as icons from "@fortawesome/free-solid-svg-icons";
import useMobile from "../../hooks/useMobile";
import modalImg from "../../assets/images/auth/Group 296.svg";
import premium from "../../assets/css/activatePremium.module.css";
import premiumImg from "../../assets/images/homeInApp/customer/premium.svg";
import { Badge } from "../Badge";
import styles from "../../assets/css/auth/yourAttributes.module.css";
import { imInto } from "../dataSets";
import "../../assets/css/payForService.css";
import MapComponent from "../MapComponent";
import { useSelector } from "react-redux";
import {
  getAllMatchesService,
  resolveCodeService,
} from "../../services/chat/conversations";
import { formatCurrency } from "../formatCurrency";
import LoaderComponent from "../LoaderComponent";

const InsertCodeModal = ({
  visible,
  onCancel,
  user = {
    name: "Arlene Mccoys",
    services: [
      { title: "Companion", price: "$70/hr" },
      { title: "X-rated", price: "$170/hr" },
    ],
  },
  currentChat,
}) => {
  let location = useLocation();
  const loggedInUser = useSelector((state) => state.userReducer?.data);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  const [isLoading, setIsLoading] = useState(false);
  const [opponent, setOpponent] = useState(null);
  const [code, setCode] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [details, setDetails] = useState(null);

  const mobile = useMobile();

  useEffect(() => {
    setShowConfirmation(false);
    const response = currentChat?.members?.find(
      (i) => i?.user?._id !== loggedInUser?._id
    );
    setOpponent(response);
  }, [visible]);

  const handleResolveCode = async () => {
    setIsLoading(true);
    const response = await resolveCodeService({
      userId: user?._id,
      code: code,
    });
    setIsLoading(false);
    setDetails({
      serviceType: "Companion",
      price: 70,
      startTime: "7.30pm",
      endTime: "12.30pm",
      hours: 5,
      totalPay: 350,
      address: "2219 Cody Ridge Road Milburn, OK 73450",
    });
    if (response.ok) {
      // setDetails(response?.data?.data);
      setShowConfirmation(true);
    } else {
      message.error(
        response?.data?.errors[0].message || "Something went wrong"
      );
    }
  };

  const confirmation = () => {
    return (
      <div className="py-5">
        <h4>{`${opponent?.user?.firstName}'s Request Confirmation`}</h4>
        <div className="d-flex align-items-center">
          <button className="btn btn-outline-primary-light mr-5 btn-sm">
            Companion
          </button>
          <p className="padding-none">{`$${details?.price}/hr`}</p>
        </div>
        <br />
        <br />
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <p className="padding-none">Start Time</p>
            <h5 className="padding-none">{details?.startTime}</h5>
          </div>
          <div>
            <p className="padding-none">End Time</p>
            <h5 className="padding-none">{details?.endTime}</h5>
          </div>
          <div>
            <p className="padding-none">Hours</p>
            <h5 className="padding-none">{`${details?.hours}hours`}</h5>
          </div>
        </div>
        <br />
        <div
          className="d-flex justify-content-between align-items-center p-4  w-100"
          style={{ borderRadius: "8px", backgroundColor: "#f4e8ff" }}
        >
          <p className="padding-none">Total Pay: </p>
          <h5 className="padding-none">{`$${formatCurrency(
            details?.totalPay || 0
          )}`}</h5>
        </div>
        <br />
        <div className="dotted-divider w-100" />
        <br />
        <p>Meetup Point</p>
        <div style={{ height: "15vh" }}>
          <MapComponent width="92%" height="10rem" />
        </div>
        <br />
        <h5>{details?.address}</h5>
      </div>
    );
  };

  return (
    <Modal
      centered
      visible={visible}
      onCancel={onCancel}
      width={mobile ? "100vw" : "50vw"}
      closable
      footer={null}
      closeIcon={
        <FontAwesomeIcon
          icon={icons.faTimesCircle}
          className="text-dark"
          size="lg"
        />
      }
      style={{
        borderRadius: "20px",
        paddingBottom: 0,
      }}
    >
      {isLoading ? (
        <LoaderComponent />
      ) : showConfirmation ? (
        confirmation()
      ) : (
        <div className="py-5 payForService">
          <h4>{`${opponent?.user?.firstName}'s Request Code`}</h4>
          <p className="text-muted">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Exercitationem, nostrum.
          </p>
          <br />
          <div className="dotted-divider w-100" />
          <br />
          <br />
          <p>Input {`${opponent?.user?.firstName}'s Request Code`}</p>
          <Input onChange={(e) => setCode(e.target.value)} />
          <br />
          <br />
          <br />
          <button
            disabled={code === ""}
            className="btn btn-primary btn-block"
            onClick={() => handleResolveCode()}
          >
            Continue
          </button>
        </div>
      )}
    </Modal>
  );
};

export default InsertCodeModal;
