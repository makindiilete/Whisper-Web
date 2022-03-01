import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Form, Input, message, Modal, Select, Tooltip } from "antd";
import { isMobile } from "react-device-detect";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as icons from "@fortawesome/free-solid-svg-icons";
import useMobile from "../../hooks/useMobile";
import cardImg from "../../assets/images/homeInApp/customer/circledCard.svg";
import walletImg from "../../assets/images/homeInApp/customer/circledWallet.svg";
import card from "../../assets/images/homeInApp/customer/card.svg";
import "../../assets/css/paymentModal.css";
import { InfoCircleOutlined } from "@ant-design/icons";
import { formatCurrency } from "../formatCurrency";
import { useDispatch, useSelector } from "react-redux";
import { subscriptionPlansReducer } from "../../redux/reducers/subscriptionPlansReducer";
import { subscribeUserService } from "../../services/App/Subscription Plans/SubscriptionPlansService";
import { fetchUserSubscriptionAction } from "../../redux/actions/userAction";
import LoaderComponent from "../LoaderComponent";

const PaymentModal = ({ visible, onCancel, wallet }) => {
  let location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  const mobile = useMobile();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer.data);
  const plans = useSelector(
    (state) => state.subscriptionPlansReducer.activeSub
  );
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();
  const [selectedMethod, setSelectedMethod] = useState(2);
  const [data, setData] = useState({
    subscriptionPlanId: "",
    amount: "",
    durationInDays: "",
    userId: user?._id,
  });

  const handleSubmit = async (values) => {
    setIsLoading(true);
    const response = await subscribeUserService(data);
    setIsLoading(false);
    if (response.ok) {
      dispatch(fetchUserSubscriptionAction(response?.data?.data?._id));
      onCancel("continue");
    } else {
      message.error(
        response?.data?.errors[0].message || "Something went wrong"
      );
    }
  };

  function handleChange(value) {
    const selectedPlan = plans.find((i) => i._id === value);
    setData({
      userId: user?._id,
      subscriptionPlanId: value,
      amount: selectedPlan?.amount,
      durationInDays: selectedPlan?.durationInDays,
    });
  }

  /* useEffect(() => {
    if (
      data.expiryDate.length === 2 &&
      !String(data.expiryDate).includes("/")
    ) {
      setData({ ...data, expiryDate: `${data.expiryDate}/` });
      form.setFieldsValue({ expiryDate: `${data.expiryDate}/` });
    }
  }, [data]);*/

  const paymentForm = () => {
    return (
      <>
        <div className="col-md-6">
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
              name="subscriptionPlanId"
              label="Select A Plan"
              rules={[
                {
                  required: true,
                  message: "Required field",
                },
              ]}
            >
              <Select onSelect={handleChange}>
                {plans?.map((item) => (
                  <Select.Option key={item?._id} value={item?._id}>{`${
                    item?.subscriptionPlanName
                  } - $ ${formatCurrency(item?.amount)} / ${
                    item?.durationInDays
                  }days`}</Select.Option>
                ))}
              </Select>
            </Form.Item>

            {/*   <div className="row">
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
               /.col-md-6
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
               /.col-md-6
            </div>*/}
            {/*<div
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
            </div>*/}
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
                <small className="padding-none text-white">{wallet?._id}</small>
              </div>
            </div>
            <h4 className="text-white text-center mt-5">
              {" "}
              ${formatCurrency(wallet?.walletBalance)}
            </h4>
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
      {isLoading ? (
        <LoaderComponent />
      ) : (
        <div className="py-5 container-fluid paymentModal">
          <h4>Payment Method</h4>
          {/*<p>Make payment with any of the following methods below.</p>*/}
          <div className="row">
            <div className="col-md-6">
              {/*<div
              className={`paymentModal__cards cursor ${
                selectedMethod === 1 ? "active" : ""
              }`}
              onClick={() => setSelectedMethod(1)}
            >
              <img src={cardImg} className="img-fluid" alt="" />
              <h5 className="padding-none">Pay with card</h5>
            </div>*/}
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
            {paymentForm()}
          </div>
          {/* /.row */}
        </div>
      )}
    </Modal>
  );
};

export default PaymentModal;
