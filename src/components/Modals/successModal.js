import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Modal } from "antd";
import { isMobile } from "react-device-detect";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as icons from "@fortawesome/free-solid-svg-icons";
import useMobile from "../../hooks/useMobile";
import modalImg from "../../assets/images/auth/Group 296.svg";

const SuccessModal = ({
  visible,
  onCancel,
  image = modalImg,
  title,
  subtitle,
}) => {
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
      width={mobile ? "100vw" : "40vw"}
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
      <div className="py-5">
        {image && (
          <div className="d-flex justify-content-center">
            <img
              src={image}
              style={{
                width: "20rem",
                height: "20rem",
              }}
            />
          </div>
        )}
        <br />
        <div className="d-flex justify-content-center">
          <h3 className="text-bolder text-center">{title}</h3>
        </div>
        <br />
        <div className="d-flex justify-content-center">
          <p className="text-center">{subtitle}</p>
        </div>
        <br />
        {/*  <div className="d-flex justify-content-center">
                    <button
                        className="btn btn-primary px-5"
                        onClick={handleAccept}
                        disabled={loading}
                    >
                        {loading ? (
                            <span className="spinner-border text-white" />
                        ) : (
                            "Accept"
                        )}
                    </button>
                </div>*/}
      </div>
    </Modal>
  );
};

export default SuccessModal;
