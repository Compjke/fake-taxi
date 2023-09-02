'use client'

import { useContext } from 'react';
import { SelectedCarAmountContext } from '../context/SelectedCarAmountContext';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckOutForm from '@/components/Payment/CheckOutForm';

const Payment = () => {
  
   
   const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISH_KEY!);
   
   const option = {
     mode: "payment",
     amount: 547,
     currency: "usd",
   };
   return (
     <Elements stripe={stripePromise} options={option}>
       <div className="mx-auto max-w-xl">
         <CheckOutForm />
       </div>
     </Elements>
   );
}
 
export default Payment;