import { cleanupTempImages } from "@/lib/cleanupTempImages";
import { NextResponse } from "next/server";

export async function GET() {
    console.log("Running cleanup of temp images...");
  await cleanupTempImages();
  return NextResponse.json({ success: true });
}
