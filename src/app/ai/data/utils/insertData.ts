import pool from "../config/db";
import { Exercise } from "@/types";
import { DB_NAME } from "@/constants";

const insertQuery = `INSERT INTO ${DB_NAME} (id, vector, payload) VALUES ($1, $2, $3)`;

export const insertData = async (
  id: string,
  vector: number[],
  payload: Exercise,
) => {
  try {
    await pool.query(insertQuery, [id, vector, payload]);
  } catch (e) {
    console.error("Error inserting data: ", e);
  }
};
