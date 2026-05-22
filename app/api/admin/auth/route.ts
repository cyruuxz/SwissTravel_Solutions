import { NextResponse } from "next/server";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "swisstravel2026";

export async function POST(request: Request) {
  const { password } = await request.json();

  if (password === ADMIN_PASSWORD) {
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}
