import Image from "next/image";
import { PiBookBookmarkFill } from "react-icons/pi";
import { CgProfile } from "react-icons/cg";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed justify-between sm:ps-2 flex items-center top-0 min-h-20 left-0 right-0 bg-[#acffea]">
      <div className="flex">
        <Link href={"/"}>
          <PiBookBookmarkFill className="text-5xl pe-2" />
        </Link>
        <div className="ps-2">
          <h1 className="font-bold text-2xl">Sigma List</h1>
          <h4 className="text-sm">Create your list</h4>
        </div>
      </div>
      <div className="flex items-center">
        <div className="flex flex-col items-center mt-1">
          <Image
            src={"/images/profile-woman.png"}
            alt="Profile images"
            width={50}
            height={50}
          />
          {/* <CgProfile className="text-5xl" /> */}
          <p className="text-sm mt-1">User name</p>
        </div>
        <button
          type="button"
          className="sm:hidden text-[#f6fff9] bg-[#6efb6e] font-bold m-1 me-2 ms-4 px-2 rounded-xl py-2"
        >
          Log <br /> in
        </button>
        <button
          type="button"
          className="text-[#f6fff9] font-bold bg-[#6efb6e] px-4 py-1 ms-4 me-2 rounded-xl hidden sm:inline-block"
        >
          Log in
        </button>
      </div>
    </nav>
  );
}
