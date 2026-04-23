// test-connection.js
import 'dotenv/config'; 
import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }, // wajib untuk Neon
});

async function testConnection() {
  try {
    const res = await pool.query("SELECT NOW()");
    console.log("✅ Koneksi berhasil:", res.rows[0]);
    await pool.end();
  } catch (err) {
    console.error("❌ Koneksi gagal:", err);
  }
}

testConnection();