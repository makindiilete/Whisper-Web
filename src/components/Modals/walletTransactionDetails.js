import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Modal } from "antd";
import { isMobile } from "react-device-detect";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as icons from "@fortawesome/free-solid-svg-icons";
import useMobile from "../../hooks/useMobile";
import modalImg from "../../assets/images/auth/Group 296.svg";
import premium from "../../assets/css/activatePremium.module.css";
import premiumImg from "../../assets/images/wallet/history.svg";
import { formatCurrency } from "../formatCurrency";
import moment from "moment";

const WalletTransactionDetails = ({ visible, onCancel, data }) => {
  let location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const { title, to, acctNumber, status, date, amount } = data;

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
      <div className="py-5 d-flex justify-content-center">
        <div style={!mobile ? { padding: "0 10rem" } : null}>
          <div className="w-100 d-flex justify-content-center">
            <div className={premium.premiumBoxImgParentWrapper}>
              <div className={premium.premiumBoxImgWrapper}>
                <img src={premiumImg} alt="" />
              </div>
            </div>
          </div>
          <div className={premium.premiumBox}>
            <div className="w-100">
              <h5 className="primary-text text-center padding-none mb-2">
                Transaction Details
              </h5>
            </div>
          </div>
          <div className={premium.history}>
            <div>
              <p className="padding-none">{title}</p>
              <p className="padding-none">${formatCurrency(amount)}</p>
            </div>{" "}
            <div>
              <p className="padding-none">Withdrawn to</p>
              <p className="padding-none">{to}</p>
            </div>
            <div>
              <p className="padding-none">Account Number</p>
              <p className="padding-none">{acctNumber}</p>
            </div>{" "}
            <div>
              <p className="padding-none">Status</p>
              <p
                className={`padding-none ${
                  status === "Successful" ? "text-success" : "text-danger"
                }`}
              >
                {status}
              </p>
            </div>{" "}
            <div>
              <p className="padding-none">Date</p>
              <p className="padding-none">{moment(date).format("L")}</p>
            </div>
            <br />
            <br />
            <div className="dotted-divider w-100"></div>
            <br />
            <br />
          </div>
          <br />
          <br />
        </div>
      </div>
    </Modal>
  );
};

export default WalletTransactionDetails;
