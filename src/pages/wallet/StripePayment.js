import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import StripeCheckout from "../../components/StripeCheckout";
import { initStripePayment } from "../../services/App/Wallet/walletService";
import { message } from "antd";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

export default function StripePayment() {
  const history = useHistory();
  const user = useSelector((state) => state.userReducer?.data);
  const [clientSecret, setClientSecret] = useState("");

  const handleStripePaymentInit = async () => {
    // setIsLoading(true);
    const response = await initStripePayment({
      userId: user?._id,
      walletId: localStorage.getItem("walletId"),
      amount: localStorage.getItem("fundingAmount"),
      currency: "usd",
    });
    // setIsLoading(false);
    if (response.ok) {
      setClientSecret(response?.data?.data?.transactionReference);
    } else {
      history.goBack();
      message.error(
        response?.data?.errors[0].message || "Something went wrong"
      );
    }
  };

  useEffect(() => {
    handleStripePaymentInit();
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="App">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <StripeCheckout />
        </Elements>
      )}
    </div>
  );
}
