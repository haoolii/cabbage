import { NextRequest, NextResponse } from "next/server";
import { getRecordDetail } from "./request/requests";

function checkIsUniqueID(uniqueId: string) {
  return /^[a-zA-Z0-9]+$/.test(uniqueId);
}

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // const uniqueId = request.nextUrl.pathname.slice(1);

  // if (checkIsUniqueID(uniqueId) && uniqueId.length === 5) {
  //     const getRecordDetailJson = await getRecordDetail(uniqueId);
  //     const token = getRecordDetailJson.data.token;
  //     response.cookies.set("Authorization", `Bearer ${token}`);
  // }

  return response;
}

// 設定匹配的路徑
export const config = {
  matcher: ["/:uniqueId([a-zA-Z0-9]+)"], // 只允許英文字母和數字
};
