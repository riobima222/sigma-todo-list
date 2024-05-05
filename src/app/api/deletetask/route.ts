import { deleteTask } from "@/lib/firebase/services";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const data = await req.json();
  const res = await deleteTask(data);
  if (!res) {
    return NextResponse.json({ status: true, message: "Ada error" });
  } else {
    return NextResponse.json({ status: false, message: "Task terhapus" });
  }
}
