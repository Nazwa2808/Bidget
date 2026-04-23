import { pool } from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const result = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { message: "Email tidak ditemukan" },
        { status: 404 }
      );
    }

    const user = result.rows[0];

    const isValid = await bcrypt.compare(
      password,
      user.password_hash
    );

    if (!isValid) {
      return NextResponse.json(
        { message: "Password salah" },
        { status: 401 }
      );
    }

  
    console.log("LOGIN SUCCESS:", {
      id: user.id,
      email: user.email,
      role: user.role,
    });

    return NextResponse.json({
      message: "Login berhasil",
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    console.error("ERROR LOGIN:", error);
    return NextResponse.json(
      { message: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}