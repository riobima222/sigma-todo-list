import { getHist } from "@/lib/firebase/services";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const data = await req.json();
  const res = await getHist(data);
  if (!res) {
    return NextResponse.json({
      message: "Koneksi database error",
    });
  } else if (res === "notfound") {
    return NextResponse.json({ message: res });
  } else {
    return NextResponse.json({ data: res || null });
  }
}
