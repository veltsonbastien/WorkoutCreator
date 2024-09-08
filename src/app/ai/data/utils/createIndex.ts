import pool from "../config/db";
import { DB_NAME, MODEL_EMBEDDING_SIZE } from "@/constants";

const createIndexQuery = `CREATE INDEX IF NOT EXISTS ${DB_NAME}_idx_vec_cos ON ${DB_NAME} 
                            USING lantern_hnsw(vector dist_cos_ops) 
                            WITH (dim = ${MODEL_EMBEDDING_SIZE})`;

export const createIndex = async () => {
  try {
    await pool.query(createIndexQuery);
  } catch (e) {
    console.error(`Error creating index: `, e);
  }
};
