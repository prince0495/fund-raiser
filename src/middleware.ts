import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from 'jsonwebtoken';

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
      console.log('not found token');;
    return NextResponse.redirect(new URL("/auth/signin", req.url))
  }

  try {
    jwt.verify(token, "james")
  
    return NextResponse.next();
  } catch (error) {
    console.log(error);
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }
}
export const config = {
  matcher: [
    "/((?!api|_next|.*\\..*|auth/signup|auth/signin).*)",
  ],
  runtime: "nodejs"
};
