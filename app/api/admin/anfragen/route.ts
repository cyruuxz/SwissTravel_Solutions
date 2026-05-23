import { NextResponse } from "next/server";
import { getAnfragen } from "@/lib/storage";

export async function GET() {
  try {
    const anfragen = await getAnfragen();
    return NextResponse.json(anfragen);
  } catch {
    return NextResponse.json([]);
  }
}
