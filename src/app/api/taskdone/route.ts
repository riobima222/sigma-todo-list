import { taskDone } from "@/lib/firebase/services";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const data = await req.json();
  const res = await taskDone(data);
  if (!res) {
    return NextResponse.json({
      status: false,
      message: "koneksi database error",
    });
  } else {
    return NextResponse.json({
      status: true,
      message: "Task selesai !!",
    });
  }
}
