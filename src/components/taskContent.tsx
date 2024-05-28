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
  const [hist, setHist]: any = useState("loading");
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [deleteWarning, setDeleteWarning] = useState(false);
  const [deleteRes, setDeleteRes] = useState(false);
  const [tickAlert, setTickAlert] = useState(false);
  const [tick, setTick] = useState(false);
  const [tickRes, setTickRes] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState("");
  const [confirmAppear, setConfirmAppear] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [trashButton, setTrashButton] = useState(false);

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
        fetch("/api/gethist", {
          method: "POST",
          body: JSON.stringify({
            username: session?.user?.username || session?.user?.name,
          }),
          cache: "no-store",
        })
          .then((res) => res.json())
          .then((res) => {
            setHist(res);
          });
      }
    }
  }, [selectTask, selectHist, alert, trash, tick]);

  const handleTick = async (title: string) => {
    setTick(true);
    setTrash(true);
    setConfirmAppear(true);
    setConfirmMessage("is the task finished ?");
    setTaskTitle(title);
  };
  const handleDelete = async (title: string) => {
    setTrash(true);
    setTick(true);
    setConfirmAppear(true);
    setTrashButton(true);
    setTaskTitle(title);
    if (selectTask) {
      setConfirmMessage("Delete this task ?");
    } else {
      setConfirmMessage("Delete this history ?");
    }
  };

  const handleAccept = async () => {
    setConfirmAppear(false);
    if (selectTask) {
      if (!trashButton) {
        const res = await fetch("/api/taskdone", {
          method: "POST",
          body: JSON.stringify({
            username: session?.user?.username || session?.user?.name,
            title: taskTitle,
          }),
        });
        if (res.ok) {
          setTick(false);
          setTrash(false);
          const data = await res.json();
          setTickAlert(true);
          setTickRes(data.message);
          setTimeout(() => {
            setTickAlert(false);
            setTickRes(false);
          }, 3000);
        }
      } else {
        const res = await fetch("/api/deletetask", {
          method: "POST",
          body: JSON.stringify({
            username: session?.user?.username || session?.user?.name,
            title: taskTitle,
          }),
        });
        if (res.ok) {
          const data = await res.json();
          setTrashButton(false);
          setTrash(false);
          setTick(false);
          setDeleteRes(data.message);
          setDeleteAlert(true);
          setTimeout(() => {
            setDeleteAlert(false);
            setDeleteRes(false);
          }, 3000);
        }
      }
    } else {
      const res = await fetch("/api/deletehist", {
        method: "POST",
        body: JSON.stringify({
          username: session?.user?.username || session?.user?.name,
          title: taskTitle,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setTrash(false);
        setTick(false);
        setDeleteRes(data.message);
        if (data.status === true) {
          setDeleteAlert(true);
        } else {
          setDeleteWarning(true);
        }
        setTimeout(() => {
          setDeleteAlert(false);
          setDeleteWarning(false);
          setDeleteRes(false);
        }, 3000);
      }
    }
  };
  const handleDeny = () => {
    setTrash(false);
    setTick(false);
    setConfirmAppear(false);
    setConfirmMessage("");
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
      <div
        role="alert"
        className={`alert alert-warning ${!deleteWarning ? "hidden" : "flex"}`}
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
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
        <span>{deleteRes}</span>
      </div>
      <section
        className={`${
          tasks?.length === 0 || tasks == false || tasks == "loading"
            ? "justify-center items-center"
            : ""
        } ${
          hist?.data?.length == 1 && selectHist
            ? "items-stretch justify-start"
            : ""
        } ${
          selectHist && "justify-center items-center"
        } flex flex-col gap-3 p-3 bg-gray-200 max-w-[25em] w-full min-h-[9em] rounded-xl leading-none overflow-hidden`}
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
                    <h1 className="tracking-wide font-semibold pe-2 text-sm sm:text-base">
                      {task.title}
                    </h1>
                    <p className="text-xs sm:text-sm text-gray-500 pt-2 pb-1">
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
              <>
                <span className="loading loading-spinner loading-xs text-info"></span>
                <span className="text-xs text-gray-500">Loading...</span>
              </>
            )
          )
        ) : hist?.data?.length > 0 ? (
          <div className={`flex flex-col gap-3 w-full min-h-[7em]`}>
            {hist.data.map((task: any, i: number) => (
              <div
                key={i}
                className="flex justify-between items-center bg-white rounded-lg px-1"
              >
                <div className="flex items-center w-full">
                  <button
                    disabled={tick}
                    onClick={() => {}}
                    className="w-7 h-7 me-1 flex mt-1"
                  >
                    <IoIosCheckmarkCircleOutline
                      className={`text-2xl text-[#4bf19e]`}
                    />
                  </button>
                  <div className="flex flex-col justify-between w-full mt-3">
                    <h1 className="tracking-wide font-semibold pe-2 text-sm sm:text-base">
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
            ))}
          </div>
        ) : hist.message ? (
          <div className="flex justify-center items-center min-h-[7.5em]">
            <ImFilesEmpty className="text-gray-500" />
            <span className="text-gray-500 text-sm ms-2">
              History Masih Kosong
            </span>
          </div>
        ) : (
          <div
            className={`flex gap-3 flex-col justify-center items-center min-h-[7.5em]`}
          >
            <span className="loading loading-spinner loading-xs text-info"></span>
            <span className="text-xs text-gray-500">Loading...</span>
          </div>
        )}
      </section>
      <div
        role="alert"
        className={`${
          confirmAppear ? "flex" : "hidden"
        } alert absolute bottom-0 right-0 w-[100%] flex sm:w-[59%] justify-between`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="stroke-info shrink-0 w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        <span className="text-sm">{confirmMessage}</span>
        <div className="flex">
          <button className="btn btn-sm" onClick={handleDeny}>
            No
          </button>
          <button
            className="btn btn-sm btn-primary ms-2"
            onClick={handleAccept}
          >
            yes
          </button>
        </div>
      </div>
    </div>
  );
}
