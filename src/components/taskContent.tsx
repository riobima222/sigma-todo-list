import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { FaTrashCan } from "react-icons/fa6";

export default function TaskContent() {
  return (
    <section className="flex flex-col gap-3 p-3 bg-gray-200 max-w-[25em] min-h-[9em] w-full rounded-xl leading-none mt-2 overflow-hidden">
      <div className="flex justify-between items-center bg-white rounded-lg py-3 px-1">
        <div className="flex items-center">
          <button className="w-7 h-7 me-1 flex mt-1">
            <IoIosCheckmarkCircleOutline className="text-2xl" />
          </button>
          <h1 className="tracking-wide font-semibold pe-2">
            Belajar next js 2 jam
          </h1>
        </div>
        <button className="flex justify-center items-center h-6 w-6">
          <FaTrashCan className="text-[#ed4444]" />
        </button>
      </div>
      <div className="flex justify-between items-center bg-white rounded-lg py-3 px-1">
        <div className="flex items-center">
          <button className="w-7 h-7 me-1 flex mt-1">
            <IoIosCheckmarkCircleOutline className="text-2xl" />
          </button>
          <h1 className="tracking-wide font-semibold pe-2">
            Mandi sebelum subuh
          </h1>
        </div>
        <button className="flex justify-center items-center h-6 w-6">
          <FaTrashCan className="text-[#ed4444]" />
        </button>
      </div>
      <div className="flex justify-between items-center bg-white rounded-lg py-3 px-1">
        <div className="flex items-center">
          <button className="w-7 h-7 me-1 flex mt-1">
            <IoIosCheckmarkCircleOutline className="text-2xl" />
          </button>
          <h1 className="tracking-wide font-semibold pe-2">
            bersih - bersih masjid kam 7
          </h1>
        </div>
        <button className="flex justify-center items-center h-6 w-6">
          <FaTrashCan className="text-[#ed4444]" />
        </button>
      </div>
    </section>
  );
}
