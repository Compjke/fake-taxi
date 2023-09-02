import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";

import { FormEvent } from "react";

const CheckOutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const { error: submitError } = await elements.submit();

    if (submitError) {
      return;
    }

    const res = await fetch("/api/create-intent", {
      method: "POST",
      body: JSON.stringify({
        amount: 532,
      }),
    });

    const secretKey = await res.json();
    console.log(secretKey);
    const {} = await stripe.confirmPayment({
      clientSecret: secretKey,
      elements,
      confirmParams: {
        return_url: "http://localhost:3000/success",
      },
    });
  };

  return (
   <div className='flex flex-col justify-center w-full items-center mt-10'>
    <form onSubmit={handleSubmit} className="max-w-md mx-auto px-2 flex flex-col items-center">
      <PaymentElement />
      <button 
      disabled={!stripe || !elements} 
      className="
      w-1/2
      px-3
      py-2
      bg-blue-600
      hover:opacity-70
      transition-opacity
      rounded-xl
      text-white
      mt-5
      ">
        Pay
      </button>
    </form>
   </div>
  );
};

export default CheckOutForm;
