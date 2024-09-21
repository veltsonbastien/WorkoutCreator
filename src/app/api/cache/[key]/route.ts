import { NextRequest, NextResponse } from "next/server";
import redis from "@/lib/redis";

export async function GET(
  request: NextRequest,
  { params }: { params: { key: string } },
) {
  try {
    const { key } = params;
    const value = await redis.get(key);
    return NextResponse.json({ key, value });
  } catch (error) {
    console.error("Error fetching key from Redis:", error);
    return NextResponse.json({ error: "Failed to fetch key" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { key: string } },
) {
  try {
    const { key } = params;
    await redis.del(key);
    return NextResponse.json({ message: "Key deleted successfully" });
  } catch (error) {
    console.error("Error deleting key from Redis:", error);
    return NextResponse.json(
      { error: "Failed to delete key" },
      { status: 500 },
    );
  }
}
