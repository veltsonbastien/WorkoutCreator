import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { UserWorkout } from "@/types";

export const addWorkoutToDb = async (workout: UserWorkout) => {
  const session = await auth();

  if (!session || !session.user) {
    throw new Error("User is not authenticated in (addWorkoutToDb)");
  }

  try {
    const dbWorkout = await prisma.workout.create({
      data: {
        userId: Number(session.user.id!), // Consider converting the userId to string in the schema
        date: new Date(),
        name: workout.name,
      },
    });

    if (!dbWorkout) {
      throw new Error("Error creating workout in db (addWorkoutToDb)");
    }

    // Fetch all exercises from the workout in one go to check if they already exist
    const exerciseNames = workout.exercises.map((exercise) => exercise.name);
    const existingExercises = await prisma.exercise.findMany({
      where: {
        name: { in: exerciseNames },
      },
    });

    // Map existing exercises by their name for quick lookup
    const existingExerciseMap = new Map(
      existingExercises.map((exercise) => [exercise.name, exercise]),
    );

    // Collect exercises that need to be added
    const newExercises = workout.exercises
      .filter((exercise) => !existingExerciseMap.has(exercise.name))
      .map((exercise) => ({ name: exercise.name }));

    // Insert new exercises in a batch
    if (newExercises.length > 0) {
      await prisma.exercise.createMany({
        data: newExercises,
        skipDuplicates: true, // Prevent errors if duplicates occur
      });

      // Refetch all exercises including newly created ones
      const updatedExercises = await prisma.exercise.findMany({
        where: {
          name: { in: exerciseNames },
        },
      });

      updatedExercises.forEach((exercise) => {
        existingExerciseMap.set(exercise.name, exercise); // Update the map with new exercises
      });
    }

    // Now, create workout-exercise relations in a batch
    const workoutExerciseData = workout.exercises.map((exercise) => ({
      reps: exercise.reps,
      sets: exercise.sets,
      weight: exercise.weight,
      exerciseId: existingExerciseMap.get(exercise.name)!.id, // Guaranteed to be non-null here
      workoutId: dbWorkout.id,
    }));

    await prisma.workoutExercise.createMany({
      data: workoutExerciseData,
    });
  } catch (e) {
    console.error("Error adding workout to database in (addWorkoutToDb): ", e);
    throw e;
  }
};
