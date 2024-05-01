import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { FaTrashCan } from "react-icons/fa6";

export default function TaskContent() {
  return (
    <section className="flex flex-col gap-3 p-3 bg-gray-200 max-w-[25em] min-h-[9em] w-full rounded-xl leading-none mt-2 overflow-hidden">
      <div className="flex justify-between items-center bg-white rounded-lg px-1">
        <div className="flex items-center w-full">
          <button className="w-7 h-7 me-1 flex mt-1">
            <IoIosCheckmarkCircleOutline className="text-2xl" />
          </button>
          <div className="flex flex-col justify-between w-full mt-3">
            <h1 className="tracking-wide font-semibold pe-2 indent-2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum,
              esse.
            </h1>
            <p className="text-sm text-gray-500 pt-2 pb-1">24.11.2024</p>
          </div>
        </div>
        <button className="flex justify-center items-center h-6 w-6">
          <FaTrashCan className="text-[#ed4444]" />
        </button>
      </div>
    </section>
  );
}
