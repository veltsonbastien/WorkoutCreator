"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { CURRENT_WORKOUT_KEY } from "@/constants";
import { RetrievedExercise, UserWorkout } from "@/types";
import styles from "./StartPageContent.module.scss";

export const StartPageContent = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  //will eventually replace these with middlware
  useEffect(() => {
    if (status === "loading") return;

    if (!session) {
      router.push("/signup");
    }
  }, [router, session, status]);

  const [workout, setWorkout] = useState<RetrievedExercise[] | null>(null);

  const [exerciseIndex, setExerciseIndex] = useState(0);
  const currentExercise = workout ? workout[exerciseIndex] : null;
  const setInfo = currentExercise ? currentExercise.amount.split("x") : null;
  const sets = setInfo ? Number(setInfo[0]) : null;
  const reps = setInfo ? Number(setInfo[1]) : null;

  const [currentWorkout, setCurrentWorkout] = useState<UserWorkout>(
    {} as UserWorkout,
  );

  const setCurrentWorkoutName = (name: string) => {
    setCurrentWorkout({ ...currentWorkout, name });
  };

  const setWeightForSet = (
    exerciseIndex: number,
    setIndex: number,
    newWeight: number,
  ) => {
    const oldExercise = currentWorkout.exercises[exerciseIndex];
    const newWeightArray = oldExercise.weight.map((weight, i) =>
      i === setIndex ? newWeight : weight,
    );

    setCurrentWorkout({
      ...currentWorkout,
      exercises: currentWorkout.exercises.map((exercise, i) =>
        i === exerciseIndex
          ? { ...exercise, weight: newWeightArray }
          : exercise,
      ),
    });
  };

  console.log("current workout: ", currentWorkout);

  const handleSaveWorkout = async () => {
    try {
      await axios.post(`/api/user/workout`, { workout: currentWorkout });
      console.log("Workout saved to database");
      //router.push("/history");
    } catch (error) {
      console.error("Error saving workout to database:", error);
    }
  };

  useEffect(() => {
    const fetchWorkout = async () => {
      axios.get(`api/cache/${CURRENT_WORKOUT_KEY}`).then((res) => {
        const parsedWorkout: RetrievedExercise[] = JSON.parse(res.data.value);
        setWorkout(parsedWorkout);
      });
    };

    fetchWorkout();
  }, []);

  useEffect(() => {
    if (!workout) return;

    const initialWorkout: UserWorkout = {
      name: "",
      exercises: workout
        ? workout.map((exercise) => {
            const [s, r] = exercise.amount.split("x");

            return {
              name: exercise.title,
              sets: s ? Number(s) : 0,
              reps: r ? Number(r) : 0,
              weight: s ? new Array(Number(s)).fill(0) : [0], //this will eventually have to come from backend, but will be added on before the workout even gets returned to client
            };
          })
        : [],
    };

    setCurrentWorkout(initialWorkout);
  }, [workout]);

  if (!workout || !currentWorkout) {
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
      {currentExercise &&
      reps &&
      sets &&
      currentWorkout.exercises &&
      currentWorkout.exercises.length > 0 ? (
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
                <input
                  key={i}
                  type="number"
                  placeholder="weight"
                  value={currentWorkout.exercises[exerciseIndex].weight[i]}
                  onChange={(e) => {
                    setWeightForSet(exerciseIndex, i, Number(e.target.value));
                  }}
                />
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
          onClick={async () => {
            if (exerciseIndex < workout.length - 1)
              setExerciseIndex(exerciseIndex + 1);

            if (exerciseIndex === workout.length - 1) {
              await handleSaveWorkout();
            }
          }}
        >
          {exerciseIndex === workout.length - 1 ? "Done" : "Next Exercise"}
        </button>
      </div>
    </div>
  );
};
