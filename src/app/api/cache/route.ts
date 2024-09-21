import { NextRequest, NextResponse } from "next/server";
import redis from "@/lib/redis";

export const POST = async (request: NextRequest) => {
  try {
    const { key, value } = await request.json();
    if (!key || value === undefined) {
      return NextResponse.json(
        { error: "Key and value are required" },
        { status: 400 },
      );
    }

    await redis.set(key, value);
    return NextResponse.json({ message: "Key set successfully" });
  } catch (error) {
    console.error("Error setting key in Redis:", error);
    return NextResponse.json({ error: "Failed to set key" }, { status: 500 });
  }
};
