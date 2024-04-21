import { MdHistory } from "react-icons/md";
import { FaTasks } from "react-icons/fa";

export default function Navigate() {
  return (
    <section className="flex mt-4 mb-3 ms-5 max-w-[25rem] w-full">
      <div className="me-3 after:animate-bounce h-11 after:mt-1 after:m-auto after:content-['Your content here'] after:block after:w-[50%] after:h-2 after:bg-green-400">
        <div className="flex items-center">
          <div className="h-7 w-7 flex justify-center items-center">
            <FaTasks className="text-pink-400 text-[1.3rem]" />
          </div>
          <span className="font-bold ms-2">Task</span>
        </div>
      </div>
      <div className="h-11 items-center after:animate-bounce after:mt-1 after:m-auto after:content-['Your content here'] after:block after:w-[50%] after:h-2 after:bg-transparent">
        <div className="flex items-center">
          <div className="h-7 w-7 flex justify-center items-center">
            <MdHistory className="text-pink-400 text-2xl" />
          </div>
          <span className="font-bold ms-2">History</span>
        </div>
      </div>
    </section>
  );
}
