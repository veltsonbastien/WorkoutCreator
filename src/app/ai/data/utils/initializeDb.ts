import pool from "../config/db";
import { DB_NAME } from "@/constants";
import { createIndex, createTable } from "../utils";
import {
  addEncodingsToDb,
  formatData,
  generateEncodings,
  getExerciseDataFromFile,
} from "../helpers";

const getCountQuery = `SELECT COUNT(*) FROM ${DB_NAME}`;

export const initializeDb = async () => {
  console.log("Initializing database...");
  try {
    await createTable();
    await createIndex();

    const countQuery = await pool.query(getCountQuery);
    const count = Number(countQuery.rows[0].count);

    if (count === 0) {
      console.log("Table is empty, inserting data.");

      const exerciseDataFromCSV = await getExerciseDataFromFile();
      const formattedExerciseData = formatData(exerciseDataFromCSV);

      const encodings = await generateEncodings(
        formattedExerciseData.map((ex) => ex.desc),
      );

      if (encodings) {
        console.log("Adding encodings to db...");
        await addEncodingsToDb(encodings, formattedExerciseData);
        console.log("Finished adding encodings...");
      } else {
        console.error("No encodings found, double check generateEncodings");
      }
    } else {
      console.log("Data already added!");
    }

    console.log("Properly initialized db, ready to go!");
  } catch (e) {
    console.error("Error initializing db: ", e);
  }
};
