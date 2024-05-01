import { registerUser } from "@/lib/firebase/services";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const user = await req.json();
  const response = await registerUser(user);
  if (!response) {
    return NextResponse.json({
      status: false,
      message: "Email atau Username sudah ada",
    });
  } else {
    return NextResponse.json({
      status: true,
      message: "Kamu berhasil mendaftar",
    });
  }
}
