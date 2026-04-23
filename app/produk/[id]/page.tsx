import Transaksi from "./transaksi";
import { getProducts } from "@/lib/db";
import Image from "next/image";
import Link from "next/link";

export default async function ProdukDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {

  const { id } = await params;

  const products = await getProducts();

  const produk = products.find(
    (item: any) => item.id.toString() === id
  );

  const whatsappNumber = "6281331489188";

  const message = `Halo, saya ingin memesan produk ${
    produk?.nama ?? ""
  } dengan harga Rp ${
    produk?.harga?.toLocaleString?.() ?? "15.000"
  }`;

  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    message
  )}`;

  return (
    <main className="bg-gray-50 min-h-screen px-6 md:px-24 py-16">
      <Link
        href="/produk"
        className="inline-block mb-6 text-green-700 font-semibold hover:underline">
       Kembali ke Produk
      </Link>
      <div className="flex flex-col md:flex-row gap-10 items-start">
        {/* Gambar Produk */}
        <div className="relative w-full md:w-[450px] h-[450px] rounded-xl overflow-hidden">
          <Image
            src={produk?.gambar_url || "https://via.placeholder.com/400"}
            alt={produk?.nama || "produk"}
            fill
            className="object-contain"/>
        </div>
        {/* Detail Produk */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-green-700">
            {produk?.nama}
          </h1>
          <p className="text-xl text-green-700 font-bold mt-4">
            Rp {produk?.harga?.toLocaleString()}
          </p>
          <h2 className="mt-6 font-semibold">
            Deskripsi Produk
          </h2>
          <p className="text-gray-700 mt-2 leading-relaxed">
            {produk?.gambar_deskripsi}
          </p>
          <a
            href={whatsappLink}
            target="_blank"
            className="inline-block mt-6 px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition">
            Pesan via WhatsApp
          </a>
          <Transaksi produk={produk} />
        </div>
      </div>
    </main>
  );
}