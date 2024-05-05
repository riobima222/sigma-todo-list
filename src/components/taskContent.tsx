"use client";

// REACT ICONS
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { FaTrashCan } from "react-icons/fa6";
import { ImFilesEmpty } from "react-icons/im";

import { navigatecontext } from "../context/navigate";
import { useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { alertcontext } from "@/context/alert";

export default function TaskContent() {
  const { selectHist, selectTask }: any = useContext(navigatecontext);
  const { data: session }: any = useSession();
  const [tasks, setTasks]: any = useState("loading");
  const { alert }: any = useContext(alertcontext);
  const [trash, setTrash] = useState(false);
  const [hist, setHist]: any = useState([]);
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [deleteRes, setDeleteRes] = useState(false);
  const [tickAlert, setTickAlert] = useState(false);
  const [tick, setTick] = useState(false);
  const [tickRes, setTickRes] = useState(false);
  const [tickColor, setTickColor] = useState(false);

  useEffect(() => {
    if (session) {
      fetch("/api/gettask", {
        method: "POST",
        body: JSON.stringify({
          username: session?.user?.username || session?.user?.name,
        }),
        cache: "no-store",
      })
        .then((res) => res.json())
        .then((task) => {
          setTasks(task);
        });
    }
  }, [session]);

  useEffect(() => {
    if (session) {
      if (selectTask) {
        fetch("/api/gettask", {
          method: "POST",
          body: JSON.stringify({
            username: session?.user?.username || session?.user?.name,
          }),
          cache: "no-store",
        })
          .then((res) => res.json())
          .then((task) => {
            setTasks(task);
          });
      } else {
        // fetch("/api/getHist")
        //   .then((res) => res.json())
        //   .then((hist) => {
        //     setHist(hist);
        //     console.log(hist);
        //   });
      }
    }
  }, [selectTask, selectHist, alert, trash, tick]);

  const handleTick = async (title: string) => {
    setTick(true);
    const res = await fetch("/api/taskdone", {
      method: "POST",
      body: JSON.stringify({
        username: session?.user?.username || session?.user?.name,
        title,
      }),
    });
    if (res.ok) {
      setTick(false);
      const data = await res.json();
      setTickAlert(true);
      setTickRes(data.message);
      setTimeout(() => {
        setTickAlert(false);
        setTickRes(false);
      }, 3000);
    }
  };
  const handleDelete = async (title: string) => {
    setTrash(true);
    const res = await fetch("/api/deletetask", {
      method: "POST",
      body: JSON.stringify({
        username: session?.user?.username || session?.user?.name,
        title,
      }),
    });
    if (res.ok) {
      const data = await res.json();
      setTrash(false);
      setDeleteRes(data.message);
      setDeleteAlert(true);
      setTimeout(() => {
        setDeleteAlert(false);
        setDeleteRes(false);
      }, 3000);
    }
  };

  return (
    <div className="mt-2 max-w-[25em] min-h-[9em] w-full">
      <div className="flex justify-center">
        {trash || tick ? (
          <span className="loading loading-dots loading-md text-gray-400"></span>
        ) : (
          <></>
        )}
      </div>
      <div
        role="alert"
        className={`alert alert-success ${
          deleteAlert ? "bg-red-400" : "bg-[#4bf19e]"
        } ${deleteAlert || tickAlert ? "flex" : "hidden"}`}
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
        <span className="text-sm">{deleteRes || tickRes}</span>
      </div>
      <section
        className={`flex flex-col ${
          tasks?.length === 0 ||
          tasks == false ||
          !selectTask ||
          tasks == "loading"
            ? "justify-center items-center"
            : ""
        } gap-3 p-3 bg-gray-200 max-w-[25em] min-h-[9em] w-full rounded-xl leading-none overflow-hidden`}
      >
        {selectTask ? (
          Array.isArray(tasks) && tasks?.length > 0 ? (
            tasks.map((task: any, i: number) => (
              <div
                key={i}
                className="flex justify-between items-center bg-white rounded-lg px-1"
              >
                <div className="flex items-center w-full">
                  <button
                    disabled={tick}
                    onClick={() => handleTick(task.title)}
                    className="w-7 h-7 me-1 flex mt-1"
                  >
                    <IoIosCheckmarkCircleOutline className={`text-2xl`} />
                  </button>
                  <div className="flex flex-col justify-between w-full mt-3">
                    <h1 className="tracking-wide font-semibold pe-2">
                      {task.title}
                    </h1>
                    <p className="text-sm text-gray-500 pt-2 pb-1">
                      {task.createdAt}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(task.title)}
                  disabled={trash}
                  className="flex justify-center items-center h-6 w-6"
                >
                  <FaTrashCan className="text-[#ed4444]" />
                </button>
              </div>
            ))
          ) : tasks == false ? (
            <div className="flex">
              <ImFilesEmpty className="text-gray-500" />
              <span className="text-gray-500 text-sm ms-2">
                Task Masih Kosong
              </span>
            </div>
          ) : (
            tasks === "loading" && (
              <span className="loading loading-spinner loading-xs text-info"></span>
            )
          )
        ) : (
          <span className="loading loading-xs loading-spinner text-info"></span>
        )}
      </section>
    </div>
  );
}
