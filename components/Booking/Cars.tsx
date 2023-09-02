import CarsList from '@/constans/CarsList';
import clsx from 'clsx';
import Image from 'next/image';
import { useState , useContext } from 'react';
import { DirectionDataContext } from '@/app/context/DirectionDataContext';
import { SelectedCarAmountContext } from '@/app/context/SelectedCarAmountContext';


const Cars = ({}: any) => {


   const [selectedCar, setselectedCar] = useState<any>();
    const { directionData, setDirectionData } =
      useContext(DirectionDataContext);

      const {carAmount ,setCarAmount} = useContext(SelectedCarAmountContext)

       const getCost = (charges: any) => {
         return +(
           charges *
           directionData.routes[0].distance *
           0.000621371192
         ).toFixed(2);
       };
   return (
     <div className="mt-3">
       <h2 className="font-semibold ">Select a car</h2>
       <div className="grid grid-cols-cars">
         {CarsList.map((item, ind) => (
           <div
             className={clsx(`
            m-1 p-2 
           cursor-pointer
          hover:bg-slate-200
            hover:scale-105
            transition
            rounded-md
            border
           `, ind === selectedCar ? 'border-yellow-200 bg-yellow-100 border-[2px]' : '')}
             key={ind}
             onClick={() => {
              setselectedCar(ind)
              setCarAmount(getCost(item.charges))
            }}
           >
             <Image
               src={item.image}
               alt={item.name}
               width={75}
               height={90}
               className="w-full"
               quality={100}
             />
             <h2 className="text-xs text-slate-500 flex max-md:flex-col items-center gap-2">
               {item.name}
               <span 
               className="text-black font-medium">
                {directionData?.routes 
                ? getCost(item.charges)
                : 0
                }$
                </span>
             </h2>
           </div>
         ))}
       </div>
     </div>
   );
}
 
export default Cars;