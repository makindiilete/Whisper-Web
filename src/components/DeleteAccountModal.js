import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Modal } from "antd";
import { isMobile } from "react-device-detect";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as icons from "@fortawesome/free-solid-svg-icons";
import useMobile from "../hooks/useMobile";

const DeleteAccountModal = ({ visible, onCancel }) => {
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
        <div className="d-flex justify-content-center">
          <h3 className="text-bolder text-center">Delete my Account</h3>
        </div>
        <br />
        <div className="d-flex justify-content-center">
          <p className="text-center">
            By deleting your Whisper account, your data will be delete
            permanently. Are you sure you want to proceed?
          </p>
        </div>
        <br />
        <div className="d-block d-md-flex justify-content-md-between">
          <button
            onClick={() => onCancel("continue")}
            className="btn btn-danger btn-sm-block btn-md-auto mr-md-3 mb-3 mb-md-0"
          >
            Yes, Proceed
          </button>
          <button
            onClick={() => onCancel("")}
            className="btn btn-outline-primary btn-sm-block btn-md-auto"
          >
            No, Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteAccountModal;
