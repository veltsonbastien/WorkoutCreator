import { Pool } from "pg";

const pool = new Pool({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  max: 20, // all info got from https://authjs.dev/getting-started/adapters/pg
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

export default pool;
