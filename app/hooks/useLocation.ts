import { useState } from 'react';

const useLocation = () => {
   const [userLocation, setuserLocation] = useState();
   const getUserLocation = () => {
     navigator.geolocation.getCurrentPosition(function (positon) {
       console.log(positon);
     });
   };
   return {
      userLocation,
      setuserLocation,
      getUserLocation
   }
}

export default useLocation;