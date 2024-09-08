"use server";

import csv from "csv-parser";
import { createReadStream } from "fs";
import { EXERCISE_DATA_PATH } from "@/constants";

export const getExerciseDataFromFile = async (): Promise<any[]> => {
  console.log("getting exercise data...");
  const records: any[] = [];

  return new Promise((resolve, reject) => {
    createReadStream(process.cwd() + "/" + EXERCISE_DATA_PATH)
      .pipe(csv())
      .on("data", (data) => records.push(data))
      .on("end", () => {
        console.log("Successfully got exercise data");
        resolve(records);
      })
      .on("error", (e) => {
        console.error("Error getting exercise data...");
        reject(e);
      });
  });
};
