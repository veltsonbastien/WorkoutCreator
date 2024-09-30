//this is a exercise that a user has done
export interface UserExercise {
  name: string;
  sets: number;
  reps: number;
  weight: number[];
}

//this is a workout that a user has done
export interface UserWorkout {
  name: string;
  exercises: UserExercise[];
}
