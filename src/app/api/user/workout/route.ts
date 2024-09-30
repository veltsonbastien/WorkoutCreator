import { NextResponse, NextRequest } from "next/server";
import { addWorkoutToDb } from "@/utils/workout";
import { auth } from "@/auth";

export const POST = async (req: NextRequest) => {
  const { workout } = await req.json();

  if (!workout) {
    return NextResponse.json({
      status: 400,
      message: "Please include a workout.",
    });
  }

  const session = await auth();
  if (!session || !session.user) {
    return NextResponse.json({
      status: 401,
      message: "Unauthorized call to user/workout, please log in",
    });
  }

  try {
    await addWorkoutToDb(workout);
    return NextResponse.json({
      status: 200,
      message: "Successfully added workout to database",
    });
  } catch (e) {
    console.error("Error adding workout to database: ", e);
    return NextResponse.json({
      status: 500,
      message: "Error adding workout to database",
    });
  }
};
