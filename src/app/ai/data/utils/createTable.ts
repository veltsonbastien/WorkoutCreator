import pool from "../config/db";
import { DB_NAME, MODEL_EMBEDDING_SIZE } from "@/constants";

const createTableQuery = `CREATE TABLE IF NOT EXISTS ${DB_NAME} (id integer, vector real[${MODEL_EMBEDDING_SIZE}], payload json)`;

export const createTable = async () => {
  try {
    await pool.query(createTableQuery);
  } catch (e) {
    console.error(`Error creating table: `, e);
  }
};
