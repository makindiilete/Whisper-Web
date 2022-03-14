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
      message.error("Something went wrong.");
      history.push(routes.WALLET);
      return;
    }

    setIsLoading(true);

    const response = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: window.location.origin + "/checkout",
        // return_url: () => history.push("/wallet"),
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (response.error) {
      setPaymentMsg(response?.error.message);
    } else {
    }

    setIsLoading(false);
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <div
        className="container d-flex flex-column justify-content-center  "
        style={{ height: "85vh" }}
      >
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <PaymentElement id="payment-element" />
            <br />
            <button
              className="btn btn-primary btn-block"
              disabled={isLoading || !stripe || !elements}
              id="submit"
            >
              <span id="button-text">
                {isLoading || !stripe || !elements ? (
                  <div className="spinner" id="spinner" />
                ) : (
                  "Pay now"
                )}
              </span>
            </button>
            {/* Show any error or success messages */}
            {paymentMsg && <div id="payment-message">{paymentMsg}</div>}
          </div>
        </div>
      </div>
    </form>
  );
}
