export interface Exercise {
  title: string;
  desc: string; // a concatenation of type, bodyPart, equipment, and og desc
}

export interface RetrievedExercise {
  title: string;
  mainMuscleGroup: string;
  bodyPartsWorked: string;
  amount: string;
  description: string;
  equipment: string;
}
