// lib/db.ts
import pkg from "pg";
const { Pool } = pkg;

export const pool = new Pool({           // <-- export pool
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },    // wajib untuk Neon
});

export async function getProducts() {
  const result = await pool.query("SELECT * FROM produk ORDER BY id DESC");
  return result.rows;
}