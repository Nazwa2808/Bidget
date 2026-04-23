// app/layanan/page.tsx
import Image from "next/image";

export default function LayananPage() {
  const keunggulan = [
    { title: "Ramah Lingkungan", desc: "Produk dibuat dari bahan bekas pilihan, ramah lingkungan." },
    { title: "Produk Unik & Handmade", desc: "Setiap pot tanaman dibuat secara manual dengan desain unik." },
    { title: "Harga Terjangkau", desc: "Kualitas tinggi dengan harga yang bersahabat." },
    { title: "Pengiriman Cepat", desc: "Produk dikirim dengan cepat sampai ke tangan konsumen." },
    { title: "Memanfaatkan Bahan Bekas", desc: "Setiap produk memanfaatkan barang bekas menjadi bernilai." },
    { title: "Cocok untuk Hadiah", desc: "Ideal sebagai dekorasi atau hadiah ramah lingkungan." },
  ];

  return (
    <main className="min-h-screen bg-gray-50 px-6 md:px-24 py-16">

      {/* JUDUL */}
      <h1 className="text-4xl font-bold text-green-700 mb-12 text-center">
        Promo & Keunggulan Produk Daur Ulang
      </h1>

      {/* CARD INFORMASI */}
      <div className="bg-white rounded-xl shadow p-10 mb-16 max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row gap-10 items-center">
          <Image
            src="/informasi.jpg"
            alt="Informasi Layanan"
            width={300}
            height={220}
            className="rounded-lg object-cover"
          />

          <div>
            <h2 className="text-2xl font-semibold mb-4 text-center md:text-left">
              Informasi Layanan Penjualan Produk Daur Ulang
            </h2>

            <p className="text-gray-700 leading-relaxed mb-4">
              Layanan ini menyediakan penjualan produk pot tanaman hasil daur ulang
              yang dibuat dari bahan bekas pilihan dengan proses pengolahan yang
              ramah lingkungan. Produk yang dihasilkan tidak hanya memiliki nilai
              estetika, tetapi juga berkontribusi dalam upaya pengurangan limbah
              plastik dan peningkatan kesadaran masyarakat terhadap pentingnya
              menjaga lingkungan.
            </p>

            <p className="text-gray-700 leading-relaxed mb-6">
              Melalui layanan ini, konsumen dapat memperoleh produk pot tanaman
              dengan harga terjangkau serta turut berpartisipasi dalam mendukung
              gerakan daur ulang. Setiap pembelian produk merupakan bentuk dukungan
              nyata terhadap pemanfaatan kembali barang bekas menjadi produk
              bernilai guna.
            </p>
          </div>
        </div>
      </div>

      {/* KEUNGGULAN CARD */}
      <h2 className="text-3xl font-bold text-center mb-10">Keunggulan Layanan</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
        {keunggulan.map((item, idx) => (
          <div key={idx} className="bg-white rounded-xl shadow p-6 flex flex-col items-center text-center hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
            <p className="text-gray-700">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* JUDUL PROMO */}
      <h2 className="text-3xl font-bold text-center mb-10">
        Promo Paket Pembelian
      </h2>

      {/* PROMO CARD */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto mb-16">

        {/* Paket 1 */}
        <div className="bg-white rounded-xl shadow p-6 text-center flex flex-col justify-between h-full">
          <div>
            <h3 className="text-xl font-semibold mb-3">Paket 1 Produk</h3>
            <p className="text-gray-600 mb-4">
              Pembelian 1 pcs produk pot tanaman daur ulang berkualitas tinggi, cocok
              untuk mempercantik ruangan atau sebagai hadiah ramah lingkungan.
            </p>
            <p className="text-green-700 font-bold text-lg mb-4">
              Rp 15.000
            </p>
          </div>
        </div>

        {/* Paket 2 */}
        <div className="bg-white rounded-xl shadow p-6 text-center border-2 border-green-600 flex flex-col justify-between h-full">
          <div>
            <h3 className="text-xl font-semibold mb-3">Paket 2 Produk</h3>
            <p className="text-gray-600 mb-1">
              Pembelian 2 pcs produk pot tanaman daur ulang berkualitas tinggi, 
              siap mempercantik ruangan atau dijadikan hadiah ramah lingkungan.
            </p>
            <p className="text-sm text-green-700 font-bold mb-4 flex items-center justify-center gap-2">
              Gratis botol kecil daur ulang
            </p>
            <p className="text-green-700 font-bold text-lg mb-6">Rp 30.000</p>
          </div>
        </div>
      </div>
    </main>
  );
}