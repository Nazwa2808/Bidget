"use client";

import { useState } from "react";

export default function FormTambahProduk() {
  const [nama, setNama] = useState("");
  const [harga, setHarga] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!file) return alert("Upload gambar dulu!");

    const formData = new FormData();
    formData.append("nama", nama);
    formData.append("harga", harga);
    formData.append("deskripsi", deskripsi);
    formData.append("file", file);

    const res = await fetch("/api/produk", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    alert(data.message);

    setNama("");
    setHarga("");
    setDeskripsi("");
    setFile(null);
  };

  return (
    <main className="min-h-screen bg-green-50 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-lg p-8 rounded-2xl shadow-lg">
        
        <h1 className="text-3xl font-bold text-green-700 text-center mb-6">
           Tambah Produk Daur Ulang
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Nama Produk
            </label>
            <input
              type="text"
              value={nama}
              required
              onChange={(e) => setNama(e.target.value)}
              className="w-full border rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Harga
            </label>
            <input
              type="number"
              value={harga}
              required
              onChange={(e) => setHarga(e.target.value)}
              className="w-full border rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Deskripsi
            </label>
            <textarea
              value={deskripsi}
              required
              onChange={(e) => setDeskripsi(e.target.value)}
              className="w-full border rounded-lg p-3 h-24 resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Upload Gambar
            </label>
            <input
              type="file"
              accept="image/*"
              required
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-700 text-white py-3 rounded-lg"
          >
            Simpan Produk
          </button>

        </form>
      </div>
    </main>
  );
}