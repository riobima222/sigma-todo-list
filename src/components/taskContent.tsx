"use client";

import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { FaTrashCan } from "react-icons/fa6";
import { navigatecontext } from "../context/navigate";
import { useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function TaskContent() {
  const { selectHist, selectTask }: any = useContext(navigatecontext);
  const { data: session }: any = useSession();
  const [tasks, setTasks]: any = useState([]);
  const [hist, setHist]: any = useState([]);
  useEffect(() => {
    if (session) {
      fetch("/api/gettask", {
        method: "POST",
        body: JSON.stringify({
          username: session?.user?.username || session?.user?.name,
        }),
      })
        .then((res) => res.json())
        .then((task) => {
          setTasks(task);
          console.log(task);
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
  });

  return (
    <section
      className={`flex flex-col ${
        !selectTask || tasks.length === 0 ? "justify-center items-center" : ""
      } gap-3 p-3 bg-gray-200 max-w-[25em] min-h-[9em] w-full rounded-xl leading-none mt-2 overflow-hidden`}
    >
      {selectTask ? (
        Array.isArray(tasks?.task) ? (
          tasks.task.map((task: any, i: number) => (
            <div
              key={i}
              className="flex justify-between items-center bg-white rounded-lg px-1"
            >
              <div className="flex items-center w-full">
                <button className="w-7 h-7 me-1 flex mt-1">
                  <IoIosCheckmarkCircleOutline className="text-2xl" />
                </button>
                <div className="flex flex-col justify-between w-full mt-3">
                  <h1 className="tracking-wide font-semibold pe-2 indent-2">
                    {task.title}
                  </h1>
                  <p className="text-sm text-gray-500 pt-2 pb-1">
                    {task.createdAt}
                  </p>
                </div>
              </div>
              <button className="flex justify-center items-center h-6 w-6">
                <FaTrashCan className="text-[#ed4444]" />
              </button>
            </div>
          ))
        ) : (
          <span className="inline-block ms-4 loading loading-spinner text-info"></span>
        )
      ) : (
        <span className="inline-block ms-4 loading loading-spinner text-info"></span>
      )}
    </section>
  );
}
