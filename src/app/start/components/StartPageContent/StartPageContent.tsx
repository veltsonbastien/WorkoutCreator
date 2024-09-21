"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { CURRENT_WORKOUT_KEY } from "@/constants";
import { RetrievedExercise } from "@/types";
import styles from "./StartPageContent.module.scss";

export const StartPageContent = () => {
  const [workout, setWorkout] = useState<RetrievedExercise[] | null>(null);
  const [exerciseIndex, setExerciseIndex] = useState(0);

  const currentExercise = workout ? workout[exerciseIndex] : null;
  const setInfo = currentExercise ? currentExercise.amount.split("x") : null;
  const sets = setInfo ? Number(setInfo[0]) : null;
  const reps = setInfo ? Number(setInfo[1]) : null;

  useEffect(() => {
    const fetchWorkout = async () => {
      axios.get(`api/cache/${CURRENT_WORKOUT_KEY}`).then((res) => {
        const parsedWorkout: RetrievedExercise[] = JSON.parse(res.data.value);
        setWorkout(parsedWorkout);
      });
    };

    fetchWorkout();
  }, []);

  if (!workout) {
    //returning a loading for now, but if there's no workout we need to handle either an error with redis or see what's up
    return <div>Loading...</div>;
  }

  return (
    <div className={styles["start-page-wrapper"]}>
      <div className={styles["header"]}>
        <h1>Start your workout</h1>
      </div>
      <div className={styles["workout-content"]}>
        {workout.length > 0 ? (
          <div>
            <h2>Today&apos;s workout:</h2>
            <div className={styles["exercises"]}>
              {workout.map((exercise) => (
                <div className={styles["exercise"]} key={exercise.title}>
                  <h3>{exercise.title}</h3>
                  <p>{exercise.amount}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </div>
      {currentExercise && reps && sets ? (
        <div className={styles["current-exercise"]}>
          <h2>{currentExercise.title}</h2>
          <p>{currentExercise.mainMuscleGroup}</p>
          <p> {currentExercise.amount}</p>
          <p> {currentExercise.description}</p>
          <p>{currentExercise.bodyPartsWorked}</p>
          <hr />
          <div className={styles["edit-workout"]}>
            {Array.from({ length: sets }, (_, i) => (
              <div key={i} className={styles["set"]}>
                <h3>Set {i + 1} weight: </h3>
                <input key={i} type="number" placeholder="weight" />
              </div>
            ))}
          </div>
        </div>
      ) : null}
      <div>
        <button
          onClick={() => {
            if (exerciseIndex > 0) setExerciseIndex(exerciseIndex - 1);
          }}
        >
          Previous Exercise
        </button>
        <button
          onClick={() => {
            if (exerciseIndex < workout.length - 1)
              setExerciseIndex(exerciseIndex + 1);
          }}
        >
          Next Exercise
        </button>
      </div>
    </div>
  );
};
