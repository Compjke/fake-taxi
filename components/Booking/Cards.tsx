import CardsList from '@/constans/CardsList';
import clsx from 'clsx';
import Image from 'next/image';
import { useState } from 'react';

const Cards = () => {

   const [activeIndex, setactiveIndex] = useState<any>();

   return (
     <div className="">
       <h2 className="text-base font-semibold mt-2">Payment methods</h2>
       <div className="grid gap-y-2  grid-cols-pay mt-5 pl-2">
         {CardsList.map((item, ind) => (
           <div
             className={clsx(
               `   w-12 border 
           flex 
           items-center 
           justify-center 
           rounded-md
           hover:border-yellow-300
           cursor-pointer`,
               ind === activeIndex && "bg-slate-200 scale-105"
             )}
             key={item.id}
             onClick={() => setactiveIndex(ind)}
           >
             <Image src={item.image} alt={item.name} width={30} height={50} />
           </div>
         ))}
       </div>
     </div>
   );
}
 
export default Cards;