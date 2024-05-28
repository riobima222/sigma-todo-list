"use client";

import Image from "next/image";
import { PiBookBookmarkFill } from "react-icons/pi";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const { data: session }: any = useSession();
  return (
    <nav className="flex fixed z-10 justify-between sm:ps-2  items-center top-0 min-h-20 left-0 right-0 bg-[#acffea]">
      <div className="flex">
        <Link href={"/"}>
          <PiBookBookmarkFill className="text-5xl sm:pe-2" />
        </Link>
        <div className="ps-2">
          <h1 className="font-bold text-base sm:text-2xl">
            Sigma <br className="block sm:hidden" /> List
          </h1>
          <h4 className="text-xs sm:text-sm">
            Create <span className="hidden sm:inline">your</span> list
          </h4>
        </div>
      </div>
      <div className="flex items-center">
        <div className="flex flex-col items-center mt-1">
          {session ? (
            <>
              {session.user?.login == "google" ? (
                <Image
                  className="rounded-full"
                  src={session.user?.image || "/images/profile-man.png"}
                  alt="Profile images"
                  width={50}
                  height={50}
                />
              ) : (
                <Image
                  className="rounded-full"
                  src={`${
                    session.user?.gender == "man"
                      ? "/images/profile-man.png"
                      : "/images/profile-woman.png"
                  }`}
                  alt="Profile images"
                  width={50}
                  height={50}
                />
              )}
              <p className="flex justify-center text-sm mt-1 mb-1 tracking-widest">
                {session.user?.username || session.user?.name}
              </p>
            </>
          ) : (
            <span className="inline-block ms-4 loading loading-spinner text-info loading-sm"></span>
          )}
        </div>
        {session ? (
          <>
            <button
              onClick={() => signOut()}
              type="button"
              className="sm:hidden text-[#f6fff9] bg-[#ed4444] font-bold m-1 me-2 ms-4 px-2 rounded-xl py-2"
            >
              Log <br /> Out
            </button>
            <button
              onClick={() => signOut()}
              type="button"
              className="text-[#f6fff9] font-bold bg-[#ed4444] px-4 py-1 ms-4 me-2 rounded-xl hidden sm:inline-block"
            >
              Log Out
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => signIn()}
              type="button"
              className="sm:hidden text-[#f6fff9] bg-[#6efb6e] font-bold m-1 me-2 ms-4 px-2 rounded-xl py-2"
            >
              Log <br /> in
            </button>
            <button
              onClick={() => signIn()}
              type="button"
              className="text-[#f6fff9] font-bold bg-[#6efb6e] px-4 py-1 ms-4 me-2 rounded-xl hidden sm:inline-block"
            >
              Log in
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
