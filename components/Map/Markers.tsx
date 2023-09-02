/* eslint-disable @next/next/no-img-element */
import { UserLocationContext } from "@/app/context/ContextLocation";
import { DestintonCordiContext } from "@/app/context/DestintonCordiContext";
import { SourceCoordiContext } from "@/app/context/SourceCoordContext";
import { useContext } from "react";
import { Marker } from "react-map-gl";

const Markers = () => {
  const { userLocation, setuserLocation } = useContext(UserLocationContext);
  const { sourceCordinates, setSourceCordinates } =
    useContext(SourceCoordiContext);
  const { destinationCordinates, setDestinationCordinates } = useContext(
    DestintonCordiContext
  );
  return (
    <div>
      <Marker
        longitude={userLocation?.long}
        latitude={userLocation?.lat}
        anchor="bottom"
      >
        <img src="/marker.png" alt="marker" className="w-10 h-10" />
      </Marker>
      {/* source marker */}

      {sourceCordinates?.length !== 0 ? (
        <Marker
          longitude={sourceCordinates?.long}
          latitude={sourceCordinates?.lat}
          anchor="bottom"
        >
          <img src="/marker.png" alt="marker" className="w-10 h-10" />
        </Marker>
      ) : null}
      {/* destination */}
      {destinationCordinates?.length !== 0 ? (
        <Marker
          longitude={destinationCordinates?.long}
          latitude={destinationCordinates?.lat}
          anchor="bottom"
        >
          <img src="/marker.png" alt="marker" className="w-10 h-10" />
        </Marker>
      ) : null}
    </div>
  );
};

export default Markers;
