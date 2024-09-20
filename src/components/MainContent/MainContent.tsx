"use client";

import { useState } from "react";
import { RetrievedExercise } from "@/types";
import { useWorkout } from "./hooks";
import styles from "./MainContent.module.scss";

export const MainContent = () => {
  const testPrompt = "Could you build me a workout for back and biceps?";

  const [prompt, setPrompt] = useState("");
  const [workout, setWorkout] = useState<RetrievedExercise[] | null>(null);
  console.log("workout: ", workout)

  const { loading, error, fetchWorkout } = useWorkout();

  const handleCreateWorkout = async () => {
    await fetchWorkout(prompt, setWorkout);
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
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
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
        ) : (
          workout && workout.map((exercise, idx) => (
            <div key={idx} className={styles["exercise"]}>
              <h2>{exercise.title}</h2>
              <p>
                {exercise.mainMuscleGroup}
              </p>
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
          ))
        )}
      </div>
    </div>
  );
};
