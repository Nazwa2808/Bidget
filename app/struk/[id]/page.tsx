import { pool } from "@/lib/db";

export default async function StrukPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params; 

  // ambil transaksi
  const trx = await pool.query(
    "SELECT * FROM transaksi WHERE id = $1",
    [id]
  );

  const transaksi = trx.rows[0];

  // ambil detail transaksi
  const detail = await pool.query(
    "SELECT * FROM detail_transaksi WHERE transaksi_id = $1",
    [id]
  );

  if (!transaksi) {
    return (
      <h1 className="text-center mt-10">
        Transaksi tidak ditemukan
      </h1>
    );
  }

  return (
    <main className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow w-[400px]">

        <h1 className="text-2xl font-bold text-center mb-4">
          STRUK PEMBELIAN
        </h1>

        <p><b>ID Transaksi:</b> {transaksi.id}</p>
        <p><b>Status:</b> {transaksi.status}</p>
        <p><b>Metode:</b> {transaksi.metode_pembayaran}</p>

        <hr className="my-3" />

        {detail.rows.map((item: any, i: number) => (
          <div key={i} className="mb-3">
            <p>Produk ID: {item.produk_id}</p>
            <p>Jumlah: {item.jumlah}</p>
            <p>Harga: Rp {item.harga}</p>
          </div>
        ))}

        <hr className="my-3" />

        <p className="font-bold text-lg">
          Total: Rp {transaksi.total_harga}
        </p>

        <p className="text-sm text-gray-500 mt-4">
          {new Date(transaksi.created_at).toLocaleString()}
        </p>

      </div>
    </main>
  );
}