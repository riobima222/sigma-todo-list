import { deleteHist } from "@/lib/firebase/services";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const data = await req.json();
  const res = await deleteHist(data);
  if (!res) {
    return NextResponse.json({
      message: "Koneksi database error",
      status: false,
    });
  } else {
    return NextResponse.json({ message: "Hist terhapus", status: true });
  }
}
