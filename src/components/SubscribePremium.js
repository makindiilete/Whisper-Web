import React, { useEffect, useState } from "react";
import customer from "../assets/css/customerHome.module.css";
import premiumImg from "../assets/images/homeInApp/customer/premium.svg";
import { GiCheckMark } from "react-icons/all";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as icons from "@fortawesome/free-solid-svg-icons";
import { getAllSubPlansService } from "../services/App/Subscription Plans/SubscriptionPlansService";
import { formatCurrency } from "./formatCurrency";
import { message } from "antd";

export function SubscribePremium({ handlePremium, subscribed }) {
  const [isLoading, setIsLoading] = useState(false);
  const [plans, setPlans] = useState([]);

  const fetchSubPlans = async () => {
    setIsLoading(true);
    let response = await getAllSubPlansService(1, 1);
    response = await getAllSubPlansService(
      1,
      response.data?.totalDocumentCount
    );
    setIsLoading(false);
    if (response.ok) {
      setPlans(response?.data?.data);
    } else {
      message.error(response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    fetchSubPlans();
  }, []);

  return (
    <div
      onClick={subscribed ? null : handlePremium}
      className={`col-md-3 cursor ${customer.leftColumn}`}
    >
      <div className="w-100 d-flex justify-content-center">
        <div className={customer.premiumBoxImgParentWrapper}>
          <div className={customer.premiumBoxImgWrapper}>
            {!subscribed ? (
              <img src={premiumImg} alt="" />
            ) : (
              <FontAwesomeIcon
                icon={icons.faCheck}
                size="1x"
                className="primary-text"
              />
            )}
          </div>
        </div>
      </div>
      <div className={customer.premiumBox}>
        <div className="w-100">
          <h5 className="primary-text text-center padding-none mb-2">
            {subscribed ? "Subscription Active" : "Whisper Premium"}
          </h5>
          <div className="d-flex justify-content-center w-100">
            <small className="text-center padding-none ">
              {subscribed
                ? "Your subscription is currently active"
                : "Get Whisper Premium to gain to chat, view and meet anyone you please"}
            </small>
          </div>
        </div>
      </div>
      {subscribed ? (
        <button className="btn btn-primary btn-block" onClick={handlePremium}>
          Upgrade
        </button>
      ) : (
        <div className={customer.premiumPrices}>
          <div className="row">
            {plans?.slice(0, 3)?.map((item, index) => (
              <div
                className={
                  index === 1
                    ? `col-4 position-relative ${customer.premiumPriceActive} ${customer.premiumPriceCol}`
                    : `col-4 ${customer.premiumPriceCol}`
                }
              >
                <div>
                  <h5 className="text-center padding-none primary-text">
                    {item?.durationInDays}
                  </h5>
                  <div className="d-flex justify-content-center">
                    <h6 className="text-muted text-center">Days</h6>
                  </div>
                  <div className="dotted-divider w-100" />
                  <div className="d-flex justify-content-center">
                    <h6 className="text-muted text-center mt-2">{`$ ${formatCurrency(
                      item?.amount
                    )}`}</h6>
                  </div>
                </div>
                {index === 1 && (
                  <div className={customer.badge}>
                    <h6 className="padding-none">Most Popular</h6>
                  </div>
                )}
              </div>
            ))}
            {/*  <div
              className={`col-4 position-relative ${customer.premiumPriceActive} ${customer.premiumPriceCol}`}
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
              <div className={customer.badge}>
                <h6 className="padding-none">Most Popular</h6>
              </div>
            </div>
            <div className={`col-4 ${customer.premiumPriceCol}`}>
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
            </div>*/}
          </div>
        </div>
      )}
    </div>
  );
}
