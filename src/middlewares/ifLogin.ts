import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export const ifLogin = async (req: NextRequest) => {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });
  if (!token) {
    return NextResponse.next();
  } else {
    const url = new URL("/", req.url);
    return NextResponse.redirect(url);
  }
};
