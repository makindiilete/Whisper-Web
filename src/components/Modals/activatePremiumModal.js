import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Modal } from "antd";
import { isMobile } from "react-device-detect";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as icons from "@fortawesome/free-solid-svg-icons";
import useMobile from "../../hooks/useMobile";
import modalImg from "../../assets/images/auth/Group 296.svg";
import premium from "../../assets/css/activatePremium.module.css";
import premiumImg from "../../assets/images/homeInApp/customer/premium.svg";

const ActivatePremiumModal = ({ visible, onCancel }) => {
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
        <div>
          <div
            className="w-100 d-flex justify-content-center"
            // style={{ width: "30.6rem" }}
          >
            <div className={premium.premiumBoxImgParentWrapper}>
              <div className={premium.premiumBoxImgWrapper}>
                <img src={premiumImg} alt="" />
              </div>
            </div>
          </div>
          <div className={premium.premiumBox}>
            <div className="w-100">
              <h5 className="primary-text text-center padding-none mb-2">
                Whisper Premium
              </h5>
              <div className="d-flex justify-content-center">
                <small className="text-center padding-none ">
                  Get Whisper Premium to gain to chat, view and meet anyone you
                  please
                </small>
              </div>
            </div>
          </div>
          <div className={premium.premiumPrices}>
            <div className="row">
              <div className={`col-4 ${premium.premiumPriceCol}`}>
                <div>
                  <h5 className="text-center padding-none primary-text">1</h5>
                  <div className="d-flex justify-content-center">
                    <h6 className="text-muted text-center">Month</h6>
                  </div>
                  <div className="dotted-divider w-100" />
                  <div className="d-flex justify-content-center">
                    <h6 className="text-muted text-center mt-2">$20/Month</h6>
                  </div>
                </div>
              </div>
              <div
                className={`col-4 position-relative ${premium.premiumPriceActive} ${premium.premiumPriceCol}`}
              >
                <div>
                  <h5 className="text-center padding-none primary-text">6</h5>
                  <div className="d-flex justify-content-center">
                    <h6 className="font-weight-bolder text-dark text-center">
                      Month
                    </h6>
                  </div>
                  <div className="dotted-divider w-100" />
                  <div className="d-flex justify-content-center">
                    <h6 className="font-weight-bolder text-dark text-center mt-2">
                      $70/Month
                    </h6>
                  </div>
                </div>
                <div className={premium.badge}>
                  <h6 className="padding-none">Most Popular</h6>
                </div>
              </div>
              <div className={`col-4 ${premium.premiumPriceCol}`}>
                <div>
                  <h5 className="text-center padding-none primary-text">1</h5>
                  <div className="d-flex justify-content-center">
                    <h6 className="text-muted text-center">Month</h6>
                  </div>
                  <div className="dotted-divider w-100" />
                  <div className="d-flex justify-content-center">
                    <h6 className="text-muted text-center mt-2">$120/Month</h6>
                  </div>
                </div>
              </div>
              {/* /.col-md-4 */}
            </div>
          </div>
          <br />
          <div className="dotted-divider w-100" />
          <br />
          <div className="d-flex justify-content-center">
            <h3
              className="padding-none align-self-center"
              style={{ color: "#7917CE" }}
            >
              $1
            </h3>
            <p className="ml-4 padding-none">
              Make a $1 payment to view fully view & chat with <br /> this
              provider.
            </p>
          </div>
          <br />
          <button className="btn btn-primary btn-block">Make Payment</button>
        </div>
      </div>
    </Modal>
  );
};

export default ActivatePremiumModal;
