import { pool } from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    const { username, email, password } = await req.json();

    if (!username || !email || !password) {
      return NextResponse.json(
        { message: "Data tidak lengkap" },
        { status: 400 }
      );
    }

    // cek email sudah ada atau belum
    const existing = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (existing.rows.length > 0) {
      return NextResponse.json(
        { message: "Email sudah terdaftar" },
        { status: 400 }
      );
    }

    // hash password
    const hash = await bcrypt.hash(password, 10);

    // simpan ke database
    await pool.query(
      "INSERT INTO users (username, email, password_hash) VALUES ($1,$2,$3)",
      [username, email, hash]
    );

    return NextResponse.json({ message: "Register berhasil" });

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}