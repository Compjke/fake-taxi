'use client'

import { UserLocationContext } from '@/app/context/ContextLocation';
import { useContext, useEffect, useRef, useState } from 'react';
import Map  from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Markers from './Markers';
import { SourceCoordiContext } from '@/app/context/SourceCoordContext';
import { DestintonCordiContext } from '@/app/context/DestintonCordiContext';
import MapBoxRoute from './MapBoxRoute';
import {DirectionDataContext} from '@/app/context/DirectionDataContext'
import DistanceTime from '../Booking/DistanceTime';


const MAPBOX_DRIVING_ENDPOINT =
  "https://api.mapbox.com/directions/v5/mapbox/driving/";

const session_token = "0012b8f4-e1ea-4c1b-82a2-ec947cb82739";

const MapBox = () => {
  const [isReadyDrive, setisReadyDrive] = useState(false);
   const mapRef = useRef<any>()
   const { userLocation } = useContext(UserLocationContext)
  
  const { sourceCordinates } =
    useContext(SourceCoordiContext);
  const { destinationCordinates } = useContext(
    DestintonCordiContext
  );

    const { directionData, setDirectionData } =
      useContext(DirectionDataContext);

    // Use to FLY to coords
   useEffect(() => {
    if(sourceCordinates){
      mapRef.current?.flyTo({
        center: [sourceCordinates.long, sourceCordinates.lat],
        duration : 2500
      });
    }
   },[sourceCordinates])

   useEffect(() => {
    setisReadyDrive(false)
       if (destinationCordinates && isReadyDrive) {
         mapRef.current?.flyTo({
           center: [destinationCordinates.long, destinationCordinates.lat],
           duration: 2500,
         });
       }

       if (sourceCordinates && destinationCordinates) {
         getDirectionRoute();
       }

   }, [destinationCordinates]);

const getDirectionRoute = async () => {
  const res = await fetch(
    MAPBOX_DRIVING_ENDPOINT +
      sourceCordinates.long +
      "," +
      sourceCordinates.lat +
      ";" +
      destinationCordinates.long +
      "," +
      destinationCordinates.lat +
      "?overview=full&geometries=geojson" +
      "&access_token=" +
      process.env.NEXT_PUBLIC_MAP_BOX_ACCES_TOKEN,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const result = await res.json();
  console.log(result);
  console.log(result.routes);
  setDirectionData(result);
  setisReadyDrive(true)
};

  return (
    <div className="p-2 relative">
      <h2 className="text-xl font-semibold mb-4">Map</h2>
      <div className="rounded-lg overflow-hidden ">
        {userLocation ? (
          <Map
            ref={mapRef}
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAP_BOX_ACCES_TOKEN}
            initialViewState={{
              longitude: userLocation?.long,
              latitude: userLocation?.lat,
              zoom: 14,
            }}
            style={{ width: "100%", height: "50vw", borderRadius: 10 }}
            mapStyle="mapbox://styles/mapbox/streets-v9"
          >
            <Markers />
            
             {directionData?.routes ? (
              <MapBoxRoute
              coordinates={directionData?.routes[0]?.geometry?.coordinates}
              />
            ) : null}
          </Map>
        ) : null}
      </div>
      <div
        className="fixed top-0
      z-20 w- right-0"
      >
        <DistanceTime />
      </div>
    </div>
  );
};

export default MapBox;
