import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Input, Modal } from "antd";
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

const PayForServiceModal = ({
  visible,
  onCancel,
  user = {
    name: "Arlene Mccoys",
    services: [
      { title: "Companion", price: "$70/hr" },
      { title: "X-rated", price: "$170/hr" },
    ],
  },
}) => {
  let location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  const [time, setTime] = useState({
    timeAmt: "",
    overnight: false,
    fullDay: false,
  });

  const mobile = useMobile();
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
        overflow: "hidden",
        paddingBottom: 0,
      }}
    >
      <div className="py-5 payForService">
        <h4>{`${user?.name} Services`}</h4>
        <br />
        <div className="d-flex justify-content-center flex-wrap">
          {user?.services?.map((item) => (
            <>
              <div className="ml-3">
                <Badge text={item?.title} />
              </div>
              <p className="mr-3">{item?.price}</p>
            </>
          ))}
        </div>
        <br />
        <div className="dotted-divider w-100" />
        <br />
        <p className="text-center">
          What amount of time do you want to spend (Hrs)?
        </p>
        <Input
          placeholder="5"
          onChange={(e) => setTime({ ...true, timeAmt: e.target.value })}
        />
        <br />
        <br />
        <div className="payForService__or">
          <div className="payForService__or__item" />
          <div
            className="mx-3 d-flex justify-content-center align-items-center"
            style={{
              width: "9.3rem",
              height: "4.2rem",
              border: "1px solid #DADADA",
            }}
          >
            <p className="padding-none text-muted">OR</p>
          </div>
          <div className="payForService__or__item" />
        </div>
        <br />
        <div className={styles.flexrowbetween}>
          <button
            className={`${styles.attrBtnPayment} ${
              time.overnight ? styles.attrBtnActive : null
            }`}
            onClick={() =>
              setTime({ ...time, fullDay: false, overnight: !time.overnight })
            }
          >
            Overnight
          </button>
          <button
            className={`${styles.attrBtnPayment} ${
              time.fullDay ? styles.attrBtnActive : null
            }`}
            onClick={() =>
              setTime({ ...time, fullDay: !time.fullDay, overnight: false })
            }
          >
            Full Day
          </button>
        </div>
        <br />
        <br />
        <button
          className="btn btn-primary btn-block"
          onClick={() => onCancel("continue")}
        >
          Continue
        </button>
      </div>
    </Modal>
  );
};

export default PayForServiceModal;
