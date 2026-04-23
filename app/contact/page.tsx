"use client";
import Image from "next/image";

export default function ContactPage() {
  const kontak = [
    { type: "WhatsApp", value: "+62 813-3148-9188", link: "https://wa.me/6281331489188", icon: "/icons/whatsapp.png" },
    { type: "WhatsApp", value: "+62 878-6425-7870", link: "https://wa.me/6287864257870", icon: "/icons/whatsapp.png" },
    { type: "WhatsApp", value: "+62 858-5647-0956", link: "https://wa.me/6285856470956", icon: "/icons/whatsapp.png" },
    { type: "Instagram", value: "@bidgetrecycle", link: "https://www.instagram.com/bidgetrecycle?igsh=MXU5NWgwbWh3cnFtbQ%3D%3D&utm_source=qr", icon: "/icons/instagram.png" },
  ];
  
  const leftItems = kontak.slice(0, 2);
  const rightItems = kontak.slice(2, 4);

  return (
    <>
      <main className="min-h-screen bg-gray-50 px-6 md:px-24 py-16">
        {/* Judul */}
        <h1 className="text-4xl font-bold text-green-700 mb-12 text-center">
          Hubungi Kami
        </h1>

        {/* Card Selamat Datang */}
        <div className="bg-white rounded-xl shadow-xl p-8 md:p-12 max-w-3xl mx-auto mb-12">
          <p className="text-gray-700 text-lg leading-relaxed text-center">
            Selamat datang di halaman kontak <span className="font-semibold text-green-700">BidgetRecycle</span>. 
            Di sini, Anda dapat menghubungi tim kami untuk pertanyaan seputar produk daur ulang, promo, atau kerja sama. 
            Tim kami siap memberikan informasi cepat dan akurat agar pengalaman Anda lebih menyenangkan. 
            Pastikan mengikuti akun Instagram kami untuk update terbaru dan jangan ragu menghubungi via WhatsApp jika ada pertanyaan.
          </p>
        </div>

        {/* Grid kontak */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto px-6 md:px-12">
          {/* Kolom Kiri */}
          <div className="space-y-6">
            {leftItems.map((item, idx) => (
              <a
                key={idx}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-xl shadow p-6 flex items-center gap-4 hover:shadow-lg transition"
              >
                <div className="w-12 h-12">
                  <Image src={item.icon} alt={item.type} width={48} height={48} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{item.type}</h3>
                  <p className="text-green-700 font-bold">{item.value}</p>
                  <p className="text-gray-500 text-sm mt-1">
                    {item.type === "WhatsApp"
                      ? "Klik untuk mengirim pesan langsung via WhatsApp."
                      : "Kunjungi akun resmi kami."}
                  </p>
                </div>
              </a>
            ))}
          </div>

          {/* Kolom Kanan */}
          <div className="space-y-6">
            {rightItems.map((item, idx) => (
              <a
                key={idx}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-xl shadow p-6 flex items-center gap-4 hover:shadow-lg transition"
              >
                <div className="w-12 h-12">
                  <Image src={item.icon} alt={item.type} width={48} height={48} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{item.type}</h3>
                  <p className="text-green-700 font-bold">{item.value}</p>
                  <p className="text-gray-500 text-sm mt-1">
                    {item.type === "WhatsApp"
                      ? "Klik untuk mengirim pesan langsung via WhatsApp."
                      : "Kunjungi akun resmi kami."}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center text-gray-500 py-6 border-t">
        © 2026 BidgetRecycle — Marketplace Daur Ulang Indonesia
      </footer>
    </>
  );
}