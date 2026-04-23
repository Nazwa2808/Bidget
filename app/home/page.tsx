"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Page() {
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    const yakin = confirm("Apakah anda pengen keluar?");
    if (yakin) {
      router.push("/");
    }
  };

  return (
    <main className="bg-gray-50 text-gray-900">

      {/* ================= NAVBAR ================= */}
      <nav className="sticky top-0 z-50 bg-green-700">
        <div className="flex items-center justify-between px-14 py-4 text-white">
          <h1 className="text-2xl font-bold">
            Bidget<span className="text-yellow-400">Recycle</span>
          </h1>

          <div className="hidden md:block w-[420px]">
            <input
              type="text"
              placeholder="Cari produk daur ulang..."
              className="w-full px-5 py-2 rounded-md text-base text-gray-700 focus:outline-none"
            />
          </div>

          <ul className="hidden md:flex gap-8 text-base font-semibold">
            <li>
              <Link href="/home" className="hover:underline cursor-pointer">Beranda</Link>
            </li>
            <li>
              <Link href="/produk" className="hover:underline cursor-pointer">Product</Link>
            </li>
            <li>
              <Link href="/layanan" className="hover:underline cursor-pointer">Keunggulan Produk</Link>
            </li>
             <li>
              <Link href="/contact" className="hover:underline cursor-pointer">Contact</Link>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="hover:underline cursor-pointer bg-transparent border-none text-white font-semibold">
                Logout</button>
            </li>
          </ul>
        </div>
      </nav>

      {/* ================= HERO ================= */}
      <section className="bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center px-14 md:px-24 py-24 gap-16">
          <div>
            <span className="text-green-800 font-extrabold uppercase tracking-wider">
              Marketplace Daur Ulang
            </span>
            <h2 className="mt-4 text-5xl font-bold leading-tight">
              Portal BidgetRecycle
            </h2>
            <p className="mt-6 text-lg text-gray-600">
              Marketplace daur ulang yang transparan, terbuka untuk umum, memudahkan
              proses jual beli barang daur ulang secara aman, serta mendukung
              pertumbuhan ekonomi hijau yang berkelanjutan demi masa depan lingkungan
              yang lebih baik.
            </p>
            <Link
              href="/produk"
              className="inline-block mt-8 bg-green-700 text-white px-8 py-4 rounded-md text-lg font-semibold shadow hover:bg-green-600 transition"
            >
              Jelajahi Produk
            </Link>
          </div>
          <div className="flex justify-center md:justify-center md:-ml-8">
            <Image
              src="/recycle.jpg"
              alt="Recycle Activity"
              width={520}
              height={400}
              className="rounded-xl shadow-lg"
              priority
            />
          </div>
        </div>
      </section>
      {/* ================= KATALOG BARANG ================= */}
      <section className="px-14 md:px-24 py-24 bg-gray-50">
        <h3 className="text-4xl font-bold mb-12 text-green-700 text-center">
          Katalog Barang
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto items-start">
          {[
            { img: "/Pot Fairy House Pot.jpeg", name: "Pot Fairy House" },
            { img: "/Pot Chibi.jpg", name: "Pot Chibi" },
            { img: "/MooMoo Cow.jpg", name: "Pot MooMoo Cow" },
            { img: "/Pot Animal Friends Planter.jpeg", name: "Pot Animal Friends Planter" },
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="rounded-xl shadow overflow-hidden">
                <Image src={item.img} alt={item.name} width={300} height={300} className="object-contain w-full" />
              </div>
              <h4 className="mt-2 text-lg font-semibold text-gray-800 text-center">{item.name}</h4>
              <p className="text-green-700 font-bold text-center">Rp 15.000</p>
            </div>
          ))}
        </div>
      </section>
      {/* ================= CARA PENAWARAN BARANG LELANG ================= */}
      <section className="px-14 md:px-24 py-24 bg-white">
       <h3 className="text-4xl font-bold mb-12 text-green-700 text-center">
          Cara Penawaran Barang Lelang
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            {
              img: "/lelang1.png",
              title: "Pilih Barang",
              desc: "Jelajahi berbagai pilihan barang daur ulang yang tersedia di marketplace, periksa foto, deskripsi, dan harga awal sebelum menawar."
            },
            {
              img: "/lelang2.png",
              title: "Ajukan Penawaran",
              desc: "Ajukan penawaran sesuai budget, pantau harga secara real-time, dan naikkan penawaran selama lelang berlangsung."
            },
            {
              img: "/lelang3.png",
              title: "Selesaikan Transaksi",
              desc: "Jika menang, lanjutkan pembayaran dan atur pengiriman agar transaksi aman dan transparan."
            }
          ].map((step, i) => (
            <div key={i} className="bg-gray-50 rounded-xl shadow hover:shadow-xl transition overflow-hidden">
              <div className="relative w-full h-56">
                <Image src={step.img} alt={step.title} fill className="object-contain p-6" />
              </div>
              <div className="p-6">
                <h4 className="font-semibold text-xl mb-2">{step.title}</h4>
                <p className="text-gray-600 text-justify leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* ================= FOOTER ================= */}
      <footer className="bg-white text-gray-500 text-center py-6 border-t">
        © 2026 BidgetRecycle — Marketplace Daur Ulang Indonesia
      </footer>
    </main>
  );
}