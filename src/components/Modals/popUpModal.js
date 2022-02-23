import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Modal } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as icons from "@fortawesome/free-solid-svg-icons";
import useMobile from "../../hooks/useMobile";
import upload from "../../assets/images/uploadIcon.jpg";
import deleteIcon from "../../assets/images/deleteIcon.jpg";

const PopUpModal = ({ visible, onCancel, deleteFn, imageToUpload }) => {
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
          <img
            src={imageToUpload}
            style={{
              width: "20rem",
              height: "20rem",
              objectFit: "cover",
            }}
            alt=""
          />
        </div>
        <br />
        <div className="d-flex justify-content-center">
          <p className="text-center">
            {`Are you sure you want to ${
              deleteFn ? "delete" : "upload"
            } this image`}
          </p>
        </div>
        <br />
        <div className="d-block d-md-flex justify-content-md-between">
          <button
            onClick={() => onCancel("continue")}
            className="btn btn-primary btn-sm-block btn-md-auto mr-md-3 mb-3 mb-md-0"
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

export default PopUpModal;
