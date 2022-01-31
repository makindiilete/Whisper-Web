import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Form, Input, Modal, Tooltip } from "antd";
import { isMobile } from "react-device-detect";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as icons from "@fortawesome/free-solid-svg-icons";
import useMobile from "../../hooks/useMobile";
import cardImg from "../../assets/images/homeInApp/customer/circledCard.svg";
import walletImg from "../../assets/images/homeInApp/customer/circledWallet.svg";
import card from "../../assets/images/homeInApp/customer/card.svg";
import "../../assets/css/paymentModal.css";
import { InfoCircleOutlined } from "@ant-design/icons";

const PaymentModal = ({ visible, onCancel }) => {
  let location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  const mobile = useMobile();
  const [selectedMethod, setSelectedMethod] = useState(1);
  const [data, setData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const handleSubmit = (values) => {
    console.log(values);
    onCancel("continue");
  };

  function handleChange(value, name) {
    setData({ ...data, [name]: value });
  }

  const paymentForm = () => {
    return (
      <>
        <div className="col-md-6">
          <Form
            layout="vertical"
            scrollToFirstError
            onFinish={handleSubmit}
            // size="large"
          >
            <Form.Item
              className="mb-3 mb-md-0 mt-2"
              initialValue=""
              name="cardNumber"
              label="Card Number"
              rules={[
                {
                  required: true,
                  message: "Required field",
                },
              ]}
            >
              <Input
                onChange={(e) => handleChange(e.target.value, "cardNumber")}
                suffix={<img src={card} className="img-fluid" alt="" />}
              />
            </Form.Item>

            <div className="row">
              <div className="col-md-6 p-0 pr-0 pr-md-1">
                <Form.Item
                  className="mb-3 mb-md-0 mt-2"
                  initialValue=""
                  name="expiryDate"
                  label="Expiry Date"
                  rules={[
                    {
                      required: true,
                      message: "Required field",
                    },
                  ]}
                >
                  <Input
                    placeholder="MM/YY"
                    onChange={(e) => handleChange(e.target.value, "expiryDate")}
                  />
                </Form.Item>
              </div>
              {/* /.col-md-6 */}
              <div className="col-md-6 p-0">
                <Form.Item
                  className="mb-3 mb-md-0 mt-2"
                  initialValue=""
                  name="cvv"
                  label="CVV"
                  rules={[
                    {
                      required: true,
                      message: "Required field",
                    },
                  ]}
                >
                  <Input
                    onChange={(e) => handleChange(e.target.value, "cvv")}
                  />
                </Form.Item>
              </div>
              {/* /.col-md-6 */}
            </div>
            <div
              className="d-flex justify-content-between p-3 mt-3"
              style={{ background: "#FAF4FF", borderRadius: "8px" }}
            >
              <div
                style={{
                  width: "1.3rem",
                  height: mobile ? "0.7rem" : "1.2rem",
                  borderRadius: "4px",
                  backgroundColor: "#31005c",
                  marginRight: "0.5rem",
                  marginTop: "0.7rem",
                }}
              />
              <p className="padding-none">
                Your card will only be charged one-time for this payment
              </p>
            </div>
            <br />
            <button className="btn btn-primary btn-block">Continue</button>
          </Form>
        </div>
      </>
    );
  };

  const walletForm = () => {
    return (
      <>
        <div className="col-md-6">
          <div className="wallet-container">
            <div className="d-flex justify-content-between">
              <p className="text-white font-weight-bold">Wallet Balance</p>
              <div>
                <small className="padding-none text-white">Wallet ID</small>
                <br />
                <small className="padding-none text-white">1228928</small>
              </div>
            </div>
            <h4 className="text-white text-center mt-5">$500</h4>
          </div>
          <div
            className="d-flex justify-content-between p-3 mt-3"
            style={{ background: "#FAF4FF", borderRadius: "8px" }}
          >
            <div
              style={{
                width: "1.3rem",
                height: mobile ? "0.7rem" : "1.2rem",
                borderRadius: "4px",
                backgroundColor: "#31005c",
                marginRight: "0.5rem",
                marginTop: "0.7rem",
              }}
            />
            <p className="padding-none">
              This fee will be deducted from your Whisper wallet. Do you wish to
              continue?
            </p>
          </div>
          <br />
          <button
            className="btn btn-primary btn-block"
            onClick={() => onCancel("continue")}
          >
            Yes, Continue
          </button>
        </div>
      </>
    );
  };

  return (
    <Modal
      centered
      visible={visible}
      onCancel={onCancel}
      width={mobile ? "100vw" : "60vw"}
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
      <div className="py-5 container-fluid paymentModal">
        <h4>Payment Method</h4>
        <p>Make payment with any of the following methods below.</p>
        <div className="row">
          <div className="col-md-6">
            <div
              className={`paymentModal__cards cursor ${
                selectedMethod === 1 ? "active" : ""
              }`}
              onClick={() => setSelectedMethod(1)}
            >
              <img src={cardImg} className="img-fluid" alt="" />
              <h5 className="padding-none">Pay with card</h5>
            </div>
            <div
              className={`paymentModal__cards cursor ${
                selectedMethod === 2 ? "active" : ""
              }`}
              onClick={() => setSelectedMethod(2)}
            >
              <img src={walletImg} className="img-fluid" alt="" />
              <h5 className="padding-none">Pay with Wallet</h5>
            </div>
          </div>
          {selectedMethod === 1 ? paymentForm() : walletForm()}
        </div>
        {/* /.row */}
      </div>
    </Modal>
  );
};

export default PaymentModal;
