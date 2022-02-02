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

const WalletFundingModal = ({ visible, onCancel }) => {
  let location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  const mobile = useMobile();
  const [form] = Form.useForm();
  const [data, setData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const handleSubmit = (values) => {
    onCancel("continue");
  };

  function handleChange(value, name) {
    setData({ ...data, [name]: value });
  }

  useEffect(() => {
    if (
      data.expiryDate.length === 2 &&
      !String(data.expiryDate).includes("/")
    ) {
      setData({ ...data, expiryDate: `${data.expiryDate}/` });
      form.setFieldsValue({ expiryDate: `${data.expiryDate}/` });
    }
  }, [data]);

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
        <h4>Wallet Funding</h4>
        <p>Fund your wallet and start enjoying Whisper.</p>
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <Form
              layout="vertical"
              scrollToFirstError
              onFinish={handleSubmit}
              form={form}
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
                      onChange={(e) =>
                        handleChange(e.target.value, "expiryDate")
                      }
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
              <button
                className="btn btn-primary btn-block"
                onClick={() => onCancel("Continue")}
              >
                Fund Wallet
              </button>
            </Form>
          </div>
        </div>
        {/* /.row */}
      </div>
    </Modal>
  );
};

export default WalletFundingModal;
