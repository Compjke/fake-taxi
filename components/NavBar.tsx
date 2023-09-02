import { UserButton } from "@clerk/nextjs";
import Image from "next/image";

const NavBar = () => {
  return (
    <div
      className="
      flex 
      items-
      center
      justify-between
      md:px-8 
      md:py-3
      p-2
      border-b
      shadow-sm
      "
    >
      <div className="flex gap-10 items-center">
        <div className="bg-yellow-300 md:w-fit w-20 rounded-md">
          <Image src="/main-logo.png" alt="logo" width={100} height={60} />
        </div>

        <div className="hidden md:flex gap-6">
          <h2 className="navLink">Home</h2>
          <h2 className="navLink">History</h2>
          <h2 className="navLink">Help</h2>
        </div>
      </div>
      <UserButton afterSignOutUrl="/" />
    </div>
  );
};

export default NavBar;
