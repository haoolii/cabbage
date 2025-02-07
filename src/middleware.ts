import { NextResponse } from "next/server";

export async function middleware(request: Request) {
  const response = NextResponse.next();

  console.log('middleware', request.url)

  response.cookies.set("TEST", "TEST");

  return response;
}

// 設定匹配的路徑
export const config = {
  matcher: ["/:uniqueId"],
};
