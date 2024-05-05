import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const res = await req.json();
  return NextResponse.json(
    "Ya allah semoga saya bisa segera menikah dengan wanita yang solehah, yang faham agama yang menyenangkan jika di pandang"
  );
}
