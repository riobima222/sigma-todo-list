import AddTask from "@/components/addTask";
import Navbar from "@/components/navbar";
import Navigate from "@/components/navigate";
import TaskContent from "@/components/taskContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sigma - Home",
  description: "to do list application home",
  authors: [
    { name: "patrio bimasuci", url: "https://github.com/patriobimasuci" },
  ],
};

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center px-4 pt-4 leading-none">
      <Navbar />
      <main className="flex flex-col items-center pt-24 px-4 w-full">
        <div className="flex items-center flex-col max-w-[70em] w-full md:relative">
          <AddTask />
          <Navigate />
        </div>
        <TaskContent />
      </main>
    </div>
  );
}
