import { pool } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      produk_id,
      nama_produk,
      jumlah,
      harga,
      metode,
    } = body;

    const total = Number(jumlah) * Number(harga);

    // ambil user
    const userResult = await pool.query("SELECT id FROM users LIMIT 1");
    const user_id = userResult.rows[0].id;

    // insert transaksi
    const transaksi = await pool.query(
      `INSERT INTO transaksi 
      (user_id, total_harga, status, metode_pembayaran)
      VALUES ($1, $2, $3, $4)
      RETURNING id`,
      [user_id, total, "pending", metode]
    );

    const transaksi_id = transaksi.rows[0].id;

    // insert detail
    await pool.query(
      `INSERT INTO detail_transaksi 
      (transaksi_id, produk_id, jumlah, harga)
      VALUES ($1, $2, $3, $4)`,
      [transaksi_id, produk_id, jumlah, total]
    );

    return NextResponse.json({
      message: "Transaksi berhasil",
      id: transaksi_id, // 🔥 TAMBAHAN SAJA
    });

  } catch (error) {
    console.error("ERROR TRANSAKSI:", error);

    return NextResponse.json(
      { message: "Gagal transaksi" },
      { status: 500 }
    );
  }
}