import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Form, Input, message, Modal, Tooltip } from "antd";
import { isMobile } from "react-device-detect";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as icons from "@fortawesome/free-solid-svg-icons";
import useMobile from "../../hooks/useMobile";
import cardImg from "../../assets/images/homeInApp/customer/circledCard.svg";
import walletImg from "../../assets/images/homeInApp/customer/circledWallet.svg";
import card from "../../assets/images/homeInApp/customer/card.svg";
import "../../assets/css/paymentModal.css";
import { InfoCircleOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { requestWithdrawalService } from "../../services/App/Withdrawal Request/WithdrawalRequestService";

const WithdrawalModal = ({ visible, onCancel, userBank }) => {
  let location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  const mobile = useMobile();
  const user = useSelector((state) => state.userReducer?.data);
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({
    amount: "",
    comment: "",
    userBank: userBank?._id,
    userId: user?._id,
  });

  const handleSubmit = async (values) => {
    setIsLoading(true);
    data.userBank = userBank?._id;
    const response = await requestWithdrawalService(data);
    setIsLoading(false);
    if (response.ok) {
      message.success("Withdrawal request submitted");
      onCancel("continue");
    } else {
      message.error(
        response?.data?.errors[0].message || "Something went wrong"
      );
    }
  };

  function handleChange(value, name) {
    setData({ ...data, [name]: value });
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
        <h4>Withdrawal</h4>
        <p>Withdraw funds to your bank account.</p>
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
              <Form.Item
                className="mb-3 mb-md-0 mt-2"
                initialValue=""
                name="comment"
                label="Comment"
                rules={[
                  {
                    required: true,
                    message: "Required field",
                  },
                ]}
              >
                <Input
                  onChange={(e) => handleChange(e.target.value, "comment")}
                />
              </Form.Item>
              <br />
              <button
                className="btn btn-primary btn-block"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="spinner-border text-white" />
                ) : (
                  "Withdraw"
                )}
              </button>
            </Form>
          </div>
        </div>
        {/* /.row */}
      </div>
    </Modal>
  );
};

export default WithdrawalModal;
