import { getTask } from "@/lib/firebase/services";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const res = await req.json();
  const tasks = await getTask(res);
  return NextResponse.json(tasks);
}
