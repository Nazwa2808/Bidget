import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

// ======================
// ✅ GET - Ambil Semua Produk
// ======================
export async function GET() {
  try {
    const result = await pool.query(
      "SELECT * FROM produk ORDER BY id DESC"
    );

    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("GET ERROR:", error);
    return NextResponse.json(
      { message: "Gagal mengambil data produk" },
      { status: 500 }
    );
  }
}

// ======================
// ✅ POST - Tambah Produk
// ======================
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { nama, harga, gambar_url } = body;

    if (!nama || !harga) {
      return NextResponse.json(
        { message: "Nama dan harga wajib diisi" },
        { status: 400 }
      );
    }

    await pool.query(
      "INSERT INTO produk (nama, harga, gambar_url) VALUES ($1, $2, $3)",
      [nama, harga, gambar_url || null]
    );

    return NextResponse.json({
      message: "Produk berhasil ditambahkan",
    });

  } catch (error) {
    console.error("POST ERROR:", error);
    return NextResponse.json(
      { message: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}

// ======================
// ✅ DELETE - Hapus Produk
// ======================
export async function DELETE(req: Request) {
  try {
    const body = await req.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json(
        { message: "ID produk tidak ditemukan" },
        { status: 400 }
      );
    }

    await pool.query(
      "DELETE FROM produk WHERE id = $1",
      [Number(id)]
    );

    return NextResponse.json({
      message: "Produk berhasil dihapus",
    });

  } catch (error) {
    console.error("DELETE ERROR:", error);
    return NextResponse.json(
      { message: "Gagal menghapus produk" },
      { status: 500 }
    );
  }
}

// ======================
// ✅ PUT - Update Produk
// ======================
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, nama, harga, gambar_url } = body;

    if (!id || !nama || !harga) {
      return NextResponse.json(
        { message: "Data tidak lengkap" },
        { status: 400 }
      );
    }

    await pool.query(
      "UPDATE produk SET nama=$1, harga=$2, gambar_url=$3 WHERE id=$4",
      [nama, harga, gambar_url || null, id]
    );

    return NextResponse.json({
      message: "Produk berhasil diupdate",
    });

  } catch (error) {
    console.error("PUT ERROR:", error);
    return NextResponse.json(
      { message: "Gagal mengupdate produk" },
      { status: 500 }
    );
  }
}