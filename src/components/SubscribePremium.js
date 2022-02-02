import React, { useEffect, useState } from "react";
import customer from "../assets/css/customerHome.module.css";
import premiumImg from "../assets/images/homeInApp/customer/premium.svg";

export function SubscribePremium({ handlePremium, visible }) {
  if (visible) {
    return (
      <div
        onClick={handlePremium}
        className={`col-md-3 ${customer.leftColumn}`}
      >
        <div className="w-100 d-flex justify-content-center">
          <div className={customer.premiumBoxImgParentWrapper}>
            <div className={customer.premiumBoxImgWrapper}>
              <img src={premiumImg} alt="" />
            </div>
          </div>
        </div>
        <div className={customer.premiumBox}>
          <div>
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
        <div className={customer.premiumPrices}>
          <div className="row">
            <div className={`col-4 ${customer.premiumPriceCol}`}>
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
            </div>
            {/* /.col-md-4 */}
          </div>
        </div>
      </div>
    );
  }
}
