"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // 🔥 TAMBAHAN

export default function Transaksi({ produk }: any) {
  const [jumlah, setJumlah] = useState(1);
  const [metode, setMetode] = useState("COD");
  const [loading, setLoading] = useState(false);

  const router = useRouter(); // 🔥 TAMBAHAN

  const total = jumlah * (produk?.harga || 0);

  const handleTransaksi = async () => {
    setLoading(true);

    try {
      const res = await fetch("/api/transaksi", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          produk_id: produk.id,
          nama_produk: produk.nama,
          jumlah,
          harga: produk.harga,
          metode,
          user_id: 1,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        setLoading(false);
        return;
      }

      alert("Berhasil checkout");

      // 🔥 PINDAH KE STRUK
      router.push(`/struk/${data.id}`);

    } catch (error) {
      alert("Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8 bg-white/60 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-gray-100">

      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Detail Transaksi
      </h3>

      <div className="flex items-center gap-4 mb-4">
        <label className="text-sm">Jumlah</label>
        <input
          type="number"
          min={1}
          value={jumlah}
          onChange={(e) => setJumlah(Number(e.target.value))}
          className="border px-3 py-2 rounded-lg w-20 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      <div className="mb-4">
        <label className="text-sm block mb-1">Metode Pembayaran</label>
        <select
          value={metode}
          onChange={(e) => setMetode(e.target.value)}
          className="border px-3 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="COD">COD</option>
          <option value="Transfer">Transfer</option>
        </select>
      </div>

      <div className="flex justify-between items-center mb-6">
        <span className="text-gray-600">Total</span>
        <span className="text-xl font-bold text-green-700">
          Rp {total.toLocaleString()}
        </span>
      </div>

      <button
        onClick={handleTransaksi}
        disabled={loading}
        className={`w-full py-3 rounded-xl text-white font-semibold transition ${
          loading
            ? "bg-gray-400"
            : "bg-green-600 hover:bg-green-700"
        }`}
      >
        {loading ? "Memproses..." : "Checkout Sekarang"}
      </button>
    </div>
  );
}