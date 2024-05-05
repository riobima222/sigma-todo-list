"use client";

import { alertcontext } from "@/context/alert";
import { useSession } from "next-auth/react";
import { useContext, useState } from "react";
import { CgAddR } from "react-icons/cg";
export default function AddTask() {
  const { data: session }: any = useSession();
  const { alert, setAlert }: any = useContext(alertcontext);
  const [isLoading, setIsLoading] = useState(false);
  const handleAddTask = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    const res = await fetch("/api/addtask", {
      method: "POST",
      body: JSON.stringify({
        username: session?.user?.username || session?.user?.name,
        task: [
          {
            title: e.target.task.value,
            isDone: false,
            createdAt: new Date(),
          },
        ],
      }),
    });
    if (res.ok) {
      setIsLoading(false);
      e.target.task.value = "";
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
      }, 2000);
    }
  };
  return (
    <div className="max-w-[37em] w-full">
      <div
        role="alert"
        className={`alert alert-success bg-[#4bf19e] ${
          alert ? "flex" : "hidden"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="stroke-current shrink-0 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span className="text-sm">Task berhasil di tambahkan!</span>
      </div>
      <div className="flex justify-center">
        {isLoading && (
          <span className="inline-block ms-4 loading loading-spinner text-info loading-xs"></span>
        )}
      </div>
      <form
        onSubmit={(e) => handleAddTask(e)}
        className="rounded-lg border-2 py-2 ps-5 pe-3 flex justify-between max-w-[37em] w-full items-center mt-2"
      >
        <input
          className="focus:outline-none w-full"
          name="task"
          type="text"
          placeholder="Enter your task.."
          maxLength={50}
          minLength={10}
        />
        <button
          disabled={isLoading || !session}
          type="submit"
          className="h-7 w-7 ms-2"
        >
          <CgAddR className="text-gray-400 text-xl" />
        </button>
      </form>
    </div>
  );
}
