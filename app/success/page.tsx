import Link from 'next/link'
const SuccessPay = () => {
   return ( 
      <div className='flex flex-col w-full justify-center items-center h-[70vh]'>
         <p className='font-bold text-xl'>Success 💚 </p>
         <Link 
         className='text-xs underline opacity-50 text-sky-500 hover:opacity-100'
         href={'/'}>
            back to application
         </Link>
         </div>
    );
}
 
export default SuccessPay;