import AddTask from "@/components/addTask";
import Navbar from "@/components/navbar";
import TaskContent from "@/components/taskContent";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center p-4">
      <Navbar />
      <main className="flex flex-col items-center pt-24 px-4 w-full">
        <AddTask />
        <TaskContent />
      </main>
    </div>
  );
}
