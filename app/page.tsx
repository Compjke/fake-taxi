"use client";
import { useState, useEffect } from "react";
import Booking from "@/components/Booking/Booking";
import MapBox from "@/components/Map/Map";
import { UserLocationContext } from "./context/ContextLocation";
import { SourceCoordiContext } from "./context/SourceCoordContext";
import { DestintonCordiContext } from "./context/DestintonCordiContext";
import { DirectionDataContext } from "./context/DirectionDataContext";
import Image from "next/image";
import { SelectedCarAmountContext } from './context/SelectedCarAmountContext';

export default function Home() {
  const [userLocation, setuserLocation] = useState<any>();
  const [sourceCordinates, setSourceCordinates] = useState<any>([]);
  const [destinationCordinates, setDestinationCordinates] = useState<any>([]);
  const [directionData, setDirectionData] = useState<any>([]);
  const [carAmount, setCarAmount] = useState<any>(0);
  useEffect(() => {
    getUserLocation();
  }, []);

  console.log(carAmount)

  const getUserLocation = () => {
    navigator.geolocation.getCurrentPosition(function (positon) {
      console.log(positon);
      setuserLocation({
        lat: positon.coords.latitude,
        long: positon.coords.longitude,
      });
    });
  };

  return (
    <div>
      <UserLocationContext.Provider value={{ userLocation, setuserLocation }}>
        <SourceCoordiContext.Provider
          value={{ sourceCordinates, setSourceCordinates }}
        >
          <DestintonCordiContext.Provider
            value={{ destinationCordinates, setDestinationCordinates }}
          >
            <DirectionDataContext.Provider value={{directionData , setDirectionData}}>
              <SelectedCarAmountContext.Provider
              value={{carAmount,setCarAmount}}
              >

              <div className="grid grid-cols-1 md:grid-cols-3">
                <div>
                  <Booking />
                </div>
                <div className="text-center col-span-2 bg-yellow-100 md:order-last order-first">
                  <MapBox />
                </div>
              </div>
              </SelectedCarAmountContext.Provider>
            </DirectionDataContext.Provider>
          </DestintonCordiContext.Provider>
        </SourceCoordiContext.Provider>
      </UserLocationContext.Provider>
    </div>
  );
}
