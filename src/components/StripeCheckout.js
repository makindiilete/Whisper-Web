import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { message } from "antd";
import { finalizeStripePayment } from "../services/App/Wallet/walletService";
import routes from "../routes";
import { useHistory } from "react-router-dom";

export default function StripeCheckout() {
  const stripe = useStripe();
  const elements = useElements();
  const history = useHistory();
  const [paymentMsg, setPaymentMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const finalizePayment = async (data) => {
    setIsLoading(true);
    const response = await finalizeStripePayment(data);
    setIsLoading(false);
    if (response.ok) {
      history.push(routes.WALLET);
    } else {
      message.error(
        response?.data?.errors[0].message || "Something went wrong"
      );
    }
  };

  useEffect(() => {
    if (!elements) {
      message.error("Something went wrong.");
      history.push(routes.WALLET);
    }
  }, [elements]);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setPaymentMsg("Payment succeeded!");
          message.success("Payment succeeded!");
          console.log("Payment succeeded = ", paymentIntent);
          finalizePayment(paymentIntent);
          break;
        case "processing":
          message.warn("Your payment is processing.");
          setPaymentMsg("Your payment is processing.");
          break;
        case "requires_payment_method":
          message.error("Your payment was not successful, please try again.");
          setPaymentMsg("Your payment was not successful, please try again.");
          break;
        default:
          message.error("Something went wrong.");
          history.goBack();
          setPaymentMsg("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: window.location.origin + "/wallet",
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setPaymentMsg(error.message);
    } else {
      setPaymentMsg("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" />
      <button
        className="btn btn-primary"
        disabled={isLoading || !stripe || !elements}
        id="submit"
      >
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
        </span>
      </button>
      {/* Show any error or success messages */}
      {paymentMsg && <div id="payment-message">{paymentMsg}</div>}
    </form>
  );
}
