"use client";

import { DestintonCordiContext } from '@/app/context/DestintonCordiContext';
import { SourceCoordiContext } from '@/app/context/SourceCoordContext';
import { useCallback, useContext, useEffect, useState } from "react";

const session_token = "0012b8f4-e1ea-4c1b-82a2-ec947cb82739";
const MAPBOX_RETRIVE_URL =
  "https://api.mapbox.com/search/searchbox/v1/retrieve/";
  
const AutoCompleteAdress = () => {
  const [source, setsource] = useState<any>();
  const [sourceChange, setSourceChange] = useState<any>(false);
  const [destinationChange, setDestinationChange] = useState<any>(false);
  
  
  const [addressList, setaddressList] = useState<any[]>([]);
  const [destination, setDistination] = useState<any>();
  
  const {sourceCordinates, setSourceCordinates} = useContext(SourceCoordiContext);
  const {destinationCordinates, setDestinationCordinates} = useContext(DestintonCordiContext);
  
  const getAddressList = useCallback(async () => {
    const query = sourceChange ? source : destination;
    const res = await fetch(`/api/search-adress?q=${query}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    setaddressList(data);
  }, [sourceChange, source, destination]);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      getAddressList();
    }, 1000);

    return () => {
      clearTimeout(delayDebounce);
      setaddressList([]);
    };
  }, [source,destination]);

   const onSourceAddressClick = async (item: any) => {
     setsource(item.full_address);
     setaddressList([]);
     setSourceChange(false);
     const res = await fetch(
       MAPBOX_RETRIVE_URL +
         item.mapbox_id +
         "?session_token=" +
         session_token +
         "&access_token=" +
         process.env.NEXT_PUBLIC_MAP_BOX_ACCES_TOKEN
     );

     const result = await res.json();

     setSourceCordinates({
       long: result.features[0].geometry.coordinates[0],
       lat: result.features[0].geometry.coordinates[1],
     });
     console.log(result);
   };

   const onDestinationAddressClick = async (item: any) => {
     setDistination(item.full_address);
     setaddressList([]);
     setDestinationChange(false);
     const res = await fetch(
       MAPBOX_RETRIVE_URL +
         item.mapbox_id +
         "?session_token=" +
         session_token +
         "&access_token=" +
         process.env.NEXT_PUBLIC_MAP_BOX_ACCES_TOKEN
     );

     const result = await res.json();

     setDestinationCordinates({
       long: result.features[0].geometry.coordinates[0],
       lat: result.features[0].geometry.coordinates[1],
     });
     console.log(result);
   };

  return (
    <div className="mt-5">
      <div className="relative">
        <label className="mb-2 text-sm text-slate-400 font-semibold block">
          From?
        </label>
        <input
          value={source}
          onChange={(e) => {
            setsource(e.target.value);
            setSourceChange(true);
          }}
          type="text"
          className="
            text-sm
            bg-slate-100 
            p-2 
            border
             w-full 
             rounded-md 
             focus:ring 
             outline-none
             focus:ring-yellow-300
             focus:bg-yellow-100
             "
          placeholder="Type your start position..."
        />
        {addressList?.suggestions && sourceChange ? (
          <div className="z-20 shadow-sm p-1 rounded-md absolute w-full bg-white">
            {addressList?.suggestions.map((item: any, ind: number) => {
              if (!item.full_address) return <h2>{item.name}</h2>;
              return (
                <h2
                  key={ind}
                  className="p-3 hover:bg-slate-200 cursor-pointer"
                  onClick={() => {
                    onSourceAddressClick(item);
                  }}
                >
                  {item.full_address}
                </h2>
              );
            })}
          </div>
        ) : null}
      </div>
      <div className="mt-5 relative">
        <label className="mb-2 text-sm text-slate-400 font-semibold block">
          Where?
        </label>
        <input
          value={destination}
          type="text"
          className="
            text-sm
            bg-slate-100 
            p-2 
            border
             w-full 
             rounded-md 
             focus:ring 
             outline-none
             focus:ring-yellow-300
             focus:bg-yellow-100
             "
          placeholder="Type where you want to go..."
          onChange={(e) => {
            setDistination(e.target.value);
            setDestinationChange(true);
          }}
        />
        {addressList?.suggestions && destinationChange ? (
          <div
           className="z-20 shadow-sm p-1 rounded-md absolute w-full bg-white"
          >
            {addressList?.suggestions.map((item: any, index: number) => (
              <h2
                key={index}
                className="p-3 hover:bg-gray-100
                cursor-pointer"
                onClick={() => {
                  onDestinationAddressClick(item);
                }}
              >
                {item.full_address}
              </h2>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default AutoCompleteAdress;
