import pool from "../config/db";
import { DB_NAME } from "@/constants";

export const searchTable = async (
  encodedPrompt: number[],
  searchLimit: number,
) => {
  const searchQuery = `SELECT (id, payload) FROM ${DB_NAME} 
                            ORDER BY vector <=> ARRAY[${encodedPrompt.toString()}]
                            LIMIT ${searchLimit}`;

  try {
    const res = await pool.query(searchQuery);
    const rows = res.rows;
    //console.log("Rows: ", rows);
    return rows;
  } catch (e) {
    console.error("Error searching table: ", e);
    return null;
  }
};
