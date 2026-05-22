import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "anfragen.json");

export async function GET() {
  try {
    const data = await fs.readFile(DATA_FILE, "utf-8");
    const anfragen = JSON.parse(data);
    return NextResponse.json(anfragen);
  } catch {
    return NextResponse.json([]);
  }
}
