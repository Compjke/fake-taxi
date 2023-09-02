"use client";

import AutoCompleteAdress from "./AutoCompleteAdress";
import clsx from "clsx";
import Cars from "./Cars";
import Cards from "./Cards";
import { useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import { SelectedCarAmountContext } from '@/app/context/SelectedCarAmountContext';

function Booking() {
  const screenHight = window.innerHeight * 0.72;
  const {carAmount,setCarAmount} = useContext(SelectedCarAmountContext)
  const router = useRouter();
  return (
    <div className="p-5">
      <h2 className="text-xl font-semibold mb-2">Booking</h2>
      <div
        className={clsx(`
      rounded-md 
      border p-5 
      shadow-inner
    border-yellow-100
      h-[${screenHight}px]
      overflow-y-auto
    `)}
      >
        <AutoCompleteAdress />
        <Cars />
        <Cards />
        <button
        disabled={!carAmount}
        onClick={() => router.push('/payment')}
          className={`w-full
        p-1 rounded-md
        mt-4
        hover:opacity-75
        transition-opacity
        ${!carAmount ? "bg-slate-200" : "bg-yellow-400"}
        `}
        >
          Book
        </button>
      </div>
    </div>
  );
}

export default Booking;
