import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Form, Input, Modal, Tooltip } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as icons from "@fortawesome/free-solid-svg-icons";
import useMobile from "../../hooks/useMobile";
import "../../assets/css/paymentModal.css";
import routes from "../../routes";

const WalletFundingModal = ({ visible, onCancel, setAmountToFund, amount }) => {
  let location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  const history = useHistory();
  const mobile = useMobile();
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    onCancel("Continue");
    history.push(routes.STRIPE_CHECKOUT);
  };

  function handleChange(value, name) {
    localStorage.setItem("fundingAmount", value);
    setAmountToFund(value);
  }

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
                name="amount"
                label="Amount"
                rules={[
                  {
                    required: true,
                    message: "Required field",
                  },
                ]}
              >
                <Input
                  onChange={(e) => handleChange(e.target.value, "amount")}
                />
              </Form.Item>
              <br />
              <button
                disabled={amount === ""}
                className="btn btn-primary btn-block"
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
