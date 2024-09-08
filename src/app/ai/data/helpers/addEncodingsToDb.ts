import { Exercise } from "@/types";
import { insertData } from "@/app/ai/data/utils";

export const addEncodingsToDb = async (
  encodings: number[][],
  exerciseData: Exercise[],
) => {
  try {
    for (let i = 0; i < encodings.length; i++) {
      await insertData(i.toString(), encodings[i], exerciseData[i]);
    }
  } catch (e) {
    console.log("Error inserting encodings");
  }
};
