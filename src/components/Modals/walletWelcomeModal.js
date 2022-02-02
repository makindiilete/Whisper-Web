import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Modal } from "antd";
import { isMobile } from "react-device-detect";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as icons from "@fortawesome/free-solid-svg-icons";
import useMobile from "../../hooks/useMobile";
import modalImg from "../../assets/images/auth/Group 296.svg";
import premium from "../../assets/css/activatePremium.module.css";
import premiumImg from "../../assets/images/wallet/walletIcon.svg";

const WalletWelcomeModal = ({ visible, onCancel }) => {
  let location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

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
                Whisper Wallet
              </h5>
              <div className="d-flex justify-content-center">
                <p className="text-center padding-none ">
                  Welcome to your Whisper wallet. Get your funds in your wallet
                  & Withdraw to your bank with ease.
                </p>
              </div>
            </div>
          </div>

          <br />
          <button
            className="btn btn-primary btn-block"
            onClick={() => onCancel("Continue")}
          >
            Continue
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default WalletWelcomeModal;
