import { getTask } from "@/lib/firebase/services";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const res = await req.json();
  const tasks = await getTask(res);
  if (!tasks) {
    return NextResponse.json({
      status: 500,
      message: "Internal server error !!",
    });
  } else {
    return NextResponse.json(tasks);
  }
}
