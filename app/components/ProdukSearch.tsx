"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

type Produk = {
  id: number;
  nama: string;
  harga: number;
  gambar_url: string;
};

type Props = {
  products: Produk[];
};

export default function ProdukSearch({ products }: Props) {
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState<Produk[]>(products);

  useEffect(() => {
    if (search === "") {
      setFiltered(products);
    } else {
      const result = products.filter((item) =>
        item.nama.toLowerCase().includes(search.toLowerCase())
      );
      setFiltered(result);
    }
  }, [search, products]);

  return (
    <main className="min-h-screen px-6 md:px-28 py-20">

      <h1 className="text-4xl font-semibold text-center text-green-700 mb-14 tracking-wide">
        Produk Daur Ulang
      </h1>

      <div className="flex justify-center mb-16">
        <input
          type="text"
          placeholder="Cari produk..."
          className="border px-5 py-3 rounded-full w-full md:w-[420px] focus:outline-none focus:ring-2 focus:ring-green-600"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-20">

        {filtered.length === 0 ? (
          <p className="text-center col-span-full">Produk tidak ditemukan</p>
        ) : (
          filtered.map((item) => (
            <div
              key={item.id}
              className="text-center group transition-transform duration-500 hover:-translate-y-3"
            >

              {/* FOTO PRODUK */}
              <div className="relative w-full h-80 rounded-[40px] overflow-hidden">
                <Image
                  src={item.gambar_url}
                  alt={item.nama}
                  fill
                  className="object-contain p-8 transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              {/* NAMA */}
              <h2 className="text-xl font-medium mt-6 tracking-wide">
                {item.nama}
              </h2>

              {/* HARGA */}
              <p className="text-green-700 font-semibold mt-1 text-lg">
                Rp {item.harga}
              </p>

              {/* BUTTON */}
              <Link href={`/produk/${item.id}`}>
                <button className="mt-5 px-7 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition">
                  Lihat Detail
                </button>
              </Link>

            </div>
          ))
        )}

      </div>
    </main>
  );
}