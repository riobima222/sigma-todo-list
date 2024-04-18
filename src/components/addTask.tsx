import { CgAddR } from "react-icons/cg";

export default function AddTask() {
  return (
    <form className="rounded-lg border-2 py-2 ps-5 pe-3 flex justify-between max-w-[37em] w-full items-center">
      <input
        className="focus:outline-none"
        type="text"
        placeholder="Enter your task.."
      />
      <button type="submit" className="h-7 w-7">
        <CgAddR className="text-gray-400 text-xl md:hover:text-base duration-200" />
      </button>
    </form>
  );
}
