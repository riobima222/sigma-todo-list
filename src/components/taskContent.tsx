import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { FaTrashCan } from "react-icons/fa6";

export default function TaskContent() {
  return (
    <div className="bg-gray-200 p-2 max-w-[25em] min-h-[12em] w-full rounded-xl mt-2 overflow-hidden">
      <div className="flex justify-between items-center bg-white rounded-lg py-3 px-1">
        <div className="flex items-center">
          <button className="w-7 h-7 me-1 flex mt-1">
            <IoIosCheckmarkCircleOutline className="text-2xl" />
          </button>
          <h1 className="tracking-wide font-semibold pe-2">
            Belajar next js 2 jam Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Quia deleniti numquam quis blanditiis dicta
            dolore, iure delectus et quam sint!
          </h1>
        </div>
        <button className="flex justify-center items-center h-6 w-6">
          <FaTrashCan className="text-[#ed4444]" />
        </button>
      </div>
    </div>
  );
}
