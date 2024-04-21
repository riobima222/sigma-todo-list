import AddTask from "@/components/addTask";
import Navbar from "@/components/navbar";
import Navigate from "@/components/navigate";
import TaskContent from "@/components/taskContent";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center p-4">
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
