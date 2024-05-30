import { addTask } from "@/lib/firebase/services";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data: any = await req.json();
  const response = await addTask(data);
  return NextResponse.json(response);
}
