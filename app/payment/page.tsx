"use client";

import { useContext } from "react";
import { SelectedCarAmountContext } from "../context/SelectedCarAmountContext";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "@/components/Payment/CheckOutForm";

const Payment = () => {
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISH_KEY!);

  const options = {
    mode: "payment",
    amount: 547,
    currency: "usd",
  };
  return (
     //@ts-ignore
    <Elements stripe={stripePromise} options={options}>
      <div className="mx-auto max-w-xl">
        <CheckOutForm />
      </div>
    </Elements>
  );
};

export default Payment;
