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
import { useSelector } from "react-redux";
import { getCustomerGalleryByIdService } from "../services/Customers/Gallery/GalleryService";
import { getProviderGalleryByIdService } from "../services/Providers/Gallery/Gallery";
import { getUserWalletService } from "../services/App/Wallet/walletService";
import { fetchUserGalleryAction } from "../redux/actions/userAction";
import { message } from "antd";
import { getUserTransactionsService } from "../services/App/Transanction History/transactionHistoryService";

const WalletPage = (props) => {
  let location = useLocation();
  const history = useHistory();
  const mobile = useMobile();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  const user = useSelector((state) => state.userReducer?.data);
  const [isLoading, setIsLoading] = useState(false);
  const [wallet, setWallet] = useState({});
  const [userType, setUserType] = useState(user?.userType);
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
  const [transactions, setTransactions] = useState([]);
  const [transactionData, setTransactionData] = useState({});

  const fetchWallet = async () => {
    setIsLoading(true);
    const response = await getUserWalletService(user?._id);
    setIsLoading(false);
    if (response.ok) {
      setWallet(response?.data?.data);
    } else {
      message.error(
        response?.data?.errors[0].message || "Something went wrong"
      );
    }
  };

  const fetchTransactions = async () => {
    setIsLoading(true);
    const response = await getUserTransactionsService(user?._id);
    setIsLoading(false);
    if (response.ok) {
      setTransactions(response?.data?.data);
    } else {
      message.error(
        response?.data?.errors[0].message || "Something went wrong"
      );
    }
  };

  useEffect(() => {
    fetchWallet();
    fetchTransactions();
  }, []);

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
                <small className="padding-none text-white">{wallet?._id}</small>
              </div>
            </div>
            <h3 className="text-white">
              ${formatCurrency(wallet?.walletBalance)}
            </h3>
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
            {transactions?.length === 0 && (
              <p className="font-weight-bold primary-text">
                No transactions available at the moment.
              </p>
            )}
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
                      {item?.description}
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
                        {moment(item?.createdAt).format("L")}{" "}
                      </small>
                    </div>
                    <div>
                      <small
                        className={`${
                          item?.transactionType === "Debit" ||
                          item?.transactionType === "Debit On Card"
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
