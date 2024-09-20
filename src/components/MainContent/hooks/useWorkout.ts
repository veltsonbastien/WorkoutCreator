import { useState } from "react";
import { RetrievedExercise } from "@/types";
import { getWorkout } from "@/utils";

export const useWorkout = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWorkout = async (
    prompt: string,
    setWorkout: (w: RetrievedExercise[] | null) => void,
  ) => {
    try {
      setLoading(true);
      setError(null);
      const fetchedWorkout = await getWorkout(prompt);
      if (!fetchedWorkout) {
        console.error("Failed to fetch workout");
        setWorkout(null)
        return;
      }

      const workout: RetrievedExercise[] = formatFetchedWorkout(fetchedWorkout);
      setWorkout(workout);
    } catch (err) {
      setError("Failed to fetch workout");
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, fetchWorkout };
};

const formatFetchedWorkout = (response: string): RetrievedExercise[] => {
  const exercises = response.split("$$$").slice(0, -1);

  return exercises
    .map((exercise) => {
      const split = exercise.split("|").map((part) => part.trim());

      return {
        title: split[0] || "unknown",
        mainMuscleGroup: split[1] || "unknown",
        bodyPartsWorked: split[2] || "unknown",
        amount: split[3] || "unknown",
        description: split[4] || "unknown",
        equipment: split[5] || "unknown",
      };
    })
    .filter((ex) => ex.title !== "unknown");
};
