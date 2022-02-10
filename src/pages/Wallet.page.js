import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import useMobile from "../hooks/useMobile";
import { HomeContainerPage } from "./Home/HomeContainer.page";
import LoaderComponent from "../components/LoaderComponent";
import customer from "../assets/css/customerHome.module.css";
import premiumImg from "../assets/images/homeInApp/customer/premium.svg";
import { SubscribePremium } from "../components/SubscribePremium";
import "../assets/css/wallet.css";
import moment from "moment";
import { formatCurrency } from "../components/formatCurrency";
import WalletWelcomeModal from "../components/Modals/walletWelcomeModal";
import WalletFundingModal from "../components/Modals/walletFundingModal";
import SuccessModal from "../components/Modals/successModal";
import modalImg from "../assets/images/auth/40.svg";
import WithdrawalModal from "../components/Modals/withdrawalModal";
import WalletTransactionDetails from "../components/Modals/walletTransactionDetails";
import PaymentModal from "../components/Modals/paymentModal";

const WalletPage = (props) => {
  let location = useLocation();
  const history = useHistory();
  const mobile = useMobile();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  const [isLoading, setIsLoading] = useState(false);
  const [userType, setUserType] = useState(
    JSON.parse(localStorage.getItem("user")).userType
  );
  const [showSuccess, setShowSuccess] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [showFunding, setShowFunding] = useState(false);
  const [showWithdrawal, setShowWithdrawal] = useState(false);
  const [showWithdrawalSuccess, setShowWithdrawalSuccess] = useState(false);
  const [showFundingSuccess, setShowFundingSuccess] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [premiumActive, setPremiumActive] = useState(false);
  const [showActivatePremium, setShowActivatePremium] = useState(false);
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      title: "Withdrawal",
      amount: 1000,
      date: new Date(2022, 2, 1),
      type: "Debit",
      status: "Successful",
      to: "Bank Account",
      acctNumber: "0724411724",
    },
    {
      id: 2,
      title: "Withdrawal",
      amount: 500,
      date: new Date(2022, 1, 13),
      type: "Debit",
      status: "Declined",
      to: "Bank Account",
      acctNumber: "0724411724",
    },
    {
      id: 3,
      title: "Wallet Funding",
      amount: 5000,
      date: new Date(2021, 12, 23),
      type: "Credit",
      status: "Successful",
      to: "Bank Account",
      acctNumber: "0724411724",
    },
    {
      id: 4,
      title: "Withdrawal",
      amount: 1,
      date: new Date(2021, 11, 15),
      type: "Debit",
      status: "Declined",
      to: "Bank Account",
      acctNumber: "0724411724",
    },
    {
      id: 5,
      title: "Withdrawal",
      amount: 420,
      date: new Date(2022, 1, 20),
      type: "Debit",
      status: "Successful",
      to: "Bank Account",
      acctNumber: "0724411724",
    },
  ]);
  const [transactionData, setTransactionData] = useState(transactions[0]);

  if (isLoading) {
    return (
      <HomeContainerPage>
        <LoaderComponent />
      </HomeContainerPage>
    );
  }
  return (
    <HomeContainerPage>
      <div className="row wallet">
        <SubscribePremium
          handlePremium={() => setShowPaymentModal(true)}
          visible={!premiumActive}
        />
        <div
          className={`paymentModal ${
            premiumActive ? `col-md-8 offset-md-2` : `col-md-9`
          } ${customer.rightColumn}`}
        >
          <h4>My Wallet</h4>
          <div
            className="wallet-container"
            style={!mobile ? { width: "58.8rem" } : null}
          >
            <div className="d-flex justify-content-between">
              <p className="text-white font-weight-bold">Wallet Balance</p>
              <div>
                <small className="padding-none text-white">Wallet ID</small>
                <br />
                <small className="padding-none text-white">1228928</small>
              </div>
            </div>
            <h3 className="text-white">$400</h3>
            <div className="d-flex justify-content-end">
              <div>
                <button
                  className="btn btn-outline-light mr-3 mb-2 mb-md-0"
                  onClick={() => setShowFunding(true)}
                >
                  Fund Wallet
                </button>
                {userType !== "Customer" && (
                  <button
                    className="btn btn-light"
                    onClick={() => setShowWithdrawal(true)}
                  >
                    Withdraw
                  </button>
                )}
              </div>
            </div>
            {/* /.d-flex justify-content-end */}
          </div>
          <div className="transactions">
            <h4>Transactions</h4>
            <br />
            {transactions?.map((item) => (
              <div
                key={item?.id}
                className="cursor"
                onClick={() => {
                  setTransactionData(item);
                  setShowDetails(true);
                }}
              >
                <div>
                  <div className="transactions__item">
                    <h5 className="font-weight-bold padding-none">
                      {item?.title}
                    </h5>
                    <p className="padding-none">
                      {" "}
                      ${formatCurrency(item?.amount)}{" "}
                    </p>
                  </div>
                  <div className="transactions__item">
                    <div>
                      <small className="text-muted">
                        {" "}
                        {moment(item?.date).format("L")}{" "}
                      </small>
                    </div>
                    <div>
                      <small
                        className={`${
                          item?.type === "Debit"
                            ? "text-danger"
                            : "text-success"
                        }`}
                      >
                        {item?.type}
                      </small>
                    </div>
                  </div>
                </div>
                <br />
              </div>
            ))}
          </div>
        </div>
      </div>

      <WalletWelcomeModal
        visible={showWelcome}
        onCancel={(params) => {
          if (params === "Continue") {
            setShowWelcome(false);
            setShowFunding(true);
          } else {
            setShowWelcome(false);
          }
        }}
      />

      <PaymentModal
        visible={showPaymentModal}
        onCancel={(success) => {
          if (success === "continue") {
            setShowPaymentModal(false);
            setShowSuccess(true);
          } else {
            setShowPaymentModal(false);
          }
        }}
      />

      <WalletFundingModal
        visible={showFunding}
        onCancel={(params) => {
          if (params === "Continue") {
            setShowFunding(false);
            setIsLoading(true);
            setTimeout(() => {
              setIsLoading(false);
              setShowFundingSuccess(true);
            }, 2000);
          } else {
            setShowFunding(false);
          }
        }}
      />

      <WithdrawalModal
        visible={showWithdrawal}
        onCancel={(params) => {
          if (params === "Continue") {
            setShowWithdrawal(false);
            setIsLoading(true);
            setTimeout(() => {
              setIsLoading(false);
              setShowWithdrawalSuccess(true);
            }, 2000);
          } else {
            setShowWithdrawal(false);
          }
        }}
      />

      <WalletTransactionDetails
        visible={showDetails}
        onCancel={() => setShowDetails(false)}
        data={transactionData}
      />

      <SuccessModal
        title="Funds Withdrawal Successful"
        subtitle="Your funds was successfully withdrawal to your bank account."
        visible={showWithdrawalSuccess}
        onCancel={() => setShowWithdrawalSuccess(false)}
        image={modalImg}
        showButton
        btnText="Continue"
        btnClickHandler={() => setShowWithdrawalSuccess(false)}
      />

      <SuccessModal
        title="Payment Successful"
        subtitle="Have fun on whisper"
        visible={showSuccess}
        onCancel={() => setShowSuccess(false)}
        image={modalImg}
        showButton
        btnText="Continue"
        btnClickHandler={() => setShowSuccess(false)}
      />

      <SuccessModal
        title="Wallet Funding Successful"
        subtitle="Have fun on whisper"
        visible={showFundingSuccess}
        onCancel={(params) => {
          if (params === "Continue") {
            setShowFundingSuccess(false);
            setIsLoading(true);
            setTimeout(() => {
              setIsLoading(false);
              setShowFundingSuccess(true);
            }, 2000);
          } else {
            setShowWithdrawal(false);
          }
        }}
        image={modalImg}
        showButton
        btnText="Continue"
        btnClickHandler={() => setShowFundingSuccess(false)}
      />
    </HomeContainerPage>
  );
};

export default WalletPage;
