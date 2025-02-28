import { NextResponse } from "next/server";

export async function GET() {
    const response = NextResponse.json({ message: "Auth Required." }, { status: 401 });
    response.headers.set("WWW-authenticate", 'Basic realm="Secure Area"');
    return response;
}