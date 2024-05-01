"use client";
import { MdHistory } from "react-icons/md";
import { FaTasks } from "react-icons/fa";
import { useContext } from "react";
import { navigatecontext } from "@/context/navigate";

export default function Navigate() {
  const { selectHist, selectTask, handleSelectHist, handleSelectTask }: any =
    useContext(navigatecontext);
  return (
    <section className="md:absolute md:top-0 md:left-0 md:mt-0 md:ms-0 md:max-w-none md:w-[10em] md:flex-col md:gap-3 flex mt-4 mb-3 ms-5 max-w-[25rem] w-full">
      <button type="button" onClick={handleSelectTask} className="me-3">
        <div className="flex items-center">
          <div className="h-7 w-7 flex justify-center items-center mb-3">
            <FaTasks className="text-pink-400 text-[1.3rem]" />
          </div>
          <div
            className={`after:animate-bounce after:mt-1 after:m-auto after:content-['Your content here'] after:block after:w-[50%] after:h-2 ${
              selectTask && "after:bg-green-400"
            }`}
          >
            <span className="font-bold ms-2">Task</span>
          </div>
        </div>
      </button>
      <button
        type="button"
        onClick={handleSelectHist}
        className="h-11 items-center"
      >
        <div className="flex items-center">
          <div className="h-7 w-7 flex justify-center items-center mb-3">
            <MdHistory className="text-pink-400 text-2xl" />
          </div>
          <div
            className={`after:animate-bounce after:mt-1 after:m-auto after:content-['Your content here'] after:block after:w-[50%] after:h-2 ${
              selectHist && "after:bg-green-400"
            } `}
          >
            <span className="font-bold ms-2">History</span>
          </div>
        </div>
      </button>
    </section>
  );
}
