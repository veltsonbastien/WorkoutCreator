"use client";

import axios from "axios";
import { useState, ChangeEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { CURRENT_WORKOUT_KEY } from "@/constants";
import { RetrievedExercise } from "@/types";
import { useWorkout } from "./hooks";
import styles from "./BuildWorkoutPageContent.module.scss";

export const BuildWorkoutPageContent = () => {
  const { data: session, status } = useSession();
  const [prompt, setPrompt] = useState<string[]>([""]);
  const [workout, setWorkout] = useState<RetrievedExercise[] | null>(null);

  const router = useRouter();

  //will eventually replace these with middlware
  useEffect(() => {
    if (status === "loading") return;

    if (!session) {
      router.push("/signup");
    }
  }, [router, session, status]);

  const { loading, error, fetchWorkout } = useWorkout();

  const handleCreateWorkout = async () => {
    const workoutsAlreadyGenerated =
      workout && workout.length > 0
        ? `Please try to include these exercises ${workout.map((w) => w.title).join(", ")} but do not exceed any previously mentioned exercise, duration, or max amount limits.`
        : "";

    const combinedPrompt = prompt.join(". ");
    await fetchWorkout(combinedPrompt + workoutsAlreadyGenerated, setWorkout);
    if (prompt[prompt.length - 1].trim() !== "") {
      setPrompt([...prompt, ""]);
    }
  };

  const handlePromptChange = (e: ChangeEvent<HTMLInputElement>) => {
    const updatedPrompt = [...prompt];
    updatedPrompt[updatedPrompt.length - 1] = e.target.value;
    setPrompt(updatedPrompt);
  };

  const handleStartWorkout = async () => {
    if (workout && workout.length > 0) {
      try {
        await axios.post(`/api/cache`, {
          key: CURRENT_WORKOUT_KEY,
          value: JSON.stringify(workout),
        });
        console.log("Workout saved to Redis");
        router.push("/start");
      } catch (error) {
        console.error("Error saving workout to Redis:", error);
      }
    }
  };

  return (
    <div className={styles["wrapper"]}>
      <div className={styles["header"]}>
        <h1> Build me a Workout </h1>
        <p>
          <b>RM</b> = Repetition Maximum. For a given exercise, find your max
          weight and calculate it based on the given percentage.
        </p>
      </div>
      <div className={styles["input-wrapper"]}>
        <input
          type="text"
          placeholder="Include muscles that you want to work out, workout intensity, length of workout, etc..."
          value={prompt[prompt.length - 1]}
          onChange={(e) => handlePromptChange(e)}
        />
        <button onClick={handleCreateWorkout} className={styles["button"]}>
          Create workout!
        </button>
      </div>
      <hr />
      <div className={styles["workout-wrapper"]}>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : workout && workout.length === 0 ? (
          <p> Error generating workouts, please try again...</p>
        ) : workout && workout.length > 0 ? (
          <div className={styles["workout"]}>
            <div className={styles["exercises"]}>
              {workout.map((exercise, idx) => (
                <div key={idx} className={styles["exercise"]}>
                  <h2>{exercise.title}</h2>
                  <p>{exercise.mainMuscleGroup}</p>
                  <p>
                    <b>Amount:</b> {exercise.amount}
                  </p>
                  {/* <p>
                  <b>Body Parts Worked:</b> {exercise.bodyPartsWorked}
                </p> */}

                  {/* <p>
                  <b>Description:</b> {exercise.description}
                </p>
                <p>
                  <b>Equipment:</b> {exercise.equipment}
                </p> */}
                </div>
              ))}
            </div>
            <div className={styles["workout-info"]}>
              <button onClick={handleStartWorkout}>Start Workout</button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};
