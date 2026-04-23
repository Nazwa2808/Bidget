"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AdminPage() {
  const router = useRouter();
  const [activeMenu, setActiveMenu] = useState("dashboard");

  const [products, setProducts] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState({
    name: "",
    price: "",
    image: "",
  });

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const dayName = currentTime.toLocaleDateString("en-US", {
    weekday: "long",
  });

  const fullDate = currentTime.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const timeString = currentTime.toLocaleTimeString("en-US");

  const greeting =
    currentTime.getHours() < 12
      ? "Good Morning"
      : currentTime.getHours() < 18
      ? "Good Afternoon"
      : "Good Evening";

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (!user || user.role !== "admin") {
      router.replace("/home");
    }
  }, []);

  const fetchProducts = async () => {
    const res = await fetch("/api/produk");
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (editId) {
      await fetch("/api/produk", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editId,
          nama: form.name,
          harga: Number(form.price),
          gambar_url: form.image,
        }),
      });
    } else {
      await fetch("/api/produk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nama: form.name,
          harga: Number(form.price),
          gambar_url: form.image,
        }),
      });
    }

    setForm({ name: "", price: "", image: "" });
    setEditId(null);
    setShowModal(false);
    fetchProducts();
  };

  const handleDelete = async (id: number) => {
    await fetch("/api/produk", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    fetchProducts();
  };

  const handleEdit = (item: any) => {
    setForm({
      name: item.nama,
      price: item.harga,
      image: item.gambar_url || "",
    });
    setEditId(item.id);
    setShowModal(true);
  };

  const handleImageUpload = (e: any) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () =>
      setForm({ ...form, image: reader.result as string });
    reader.readAsDataURL(file);
  };

  const totalRevenue = products.reduce(
    (acc, item) => acc + Number(item.harga || 0),
    0
  );

  return (
    <div className="flex min-h-screen bg-emerald-50">

      {/* ✅ SIDEBAR */}
      <aside className="w-64 bg-gradient-to-b from-emerald-700 to-emerald-900 text-white p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-10">BidgetAdmin</h2>
          <ul className="space-y-3">
            {["dashboard", "products"].map((menu) => (
              <li
                key={menu}
                onClick={() => setActiveMenu(menu)}
                className={`p-3 rounded-xl cursor-pointer capitalize ${
                  activeMenu === menu
                    ? "bg-white/20"
                    : "hover:bg-white/10"
                }`}
              >
                {menu}
              </li>
            ))}
          </ul>
        </div>

        <button
          onClick={() => {
            localStorage.removeItem("user");
            router.push("/");
          }}
          className="bg-red-500 py-2 rounded-xl"
        >
          Logout
        </button>
      </aside>

      {/* ✅ MAIN */}
      <main className="flex-1 p-10">

        {/* ✅ TOPBAR */}
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-bold text-emerald-800 capitalize">
            {activeMenu}
          </h1>

          <div className="w-12 h-12 relative rounded-full overflow-hidden border-2 border-emerald-600">
            <Image
              src="/Bidget.jpg"
              alt="profile"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* ✅ DASHBOARD */}
        {activeMenu === "dashboard" && (
          <>
            <div className="bg-white p-8 rounded-3xl shadow mb-10">
              <h2 className="text-gray-500">
                {dayName}, {fullDate}
              </h2>
              <h1 className="text-4xl font-bold text-emerald-700 mt-2">
                {greeting}, Admin
              </h1>
              <p className="text-gray-400 mt-2">
                Current time: {timeString}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-3xl shadow">
                <p>Total Products</p>
                <h2 className="text-3xl font-bold text-emerald-600">
                  {products.length}
                </h2>
              </div>

              <div className="bg-white p-6 rounded-3xl shadow">
                <p>Total Revenue</p>
                <h2 className="text-3xl font-bold text-emerald-600">
                  Rp {totalRevenue}
                </h2>
              </div>
            </div>
          </>
        )}

        {/* ✅ PRODUCTS */}
        {activeMenu === "products" && (
          <>
            <button
              onClick={() => {
                setShowModal(true);
                setEditId(null);
                setForm({ name: "", price: "", image: "" });
              }}
              className="bg-emerald-600 text-white px-6 py-2 rounded-xl mb-6"
            >
              + Add Product
            </button>

            <div className="bg-white rounded-3xl shadow overflow-hidden">
              <table className="w-full">
                <thead className="bg-emerald-100">
                  <tr>
                    <th className="p-4 text-left">Image</th>
                    <th className="p-4 text-left">Name</th>
                    <th className="p-4 text-left">Price</th>
                    <th className="p-4 text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((item) => (
                    <tr key={item.id} className="border-t hover:bg-emerald-50">
                      <td className="p-4">
                        <div className="w-14 h-14 relative rounded overflow-hidden">
                          <Image
                            src={item.gambar_url || "https://via.placeholder.com/400"}
                            alt={item.nama || "product"}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </td>
                      <td className="p-4">{item.nama}</td>
                      <td className="p-4">Rp {item.harga}</td>
                      <td className="p-4 space-x-2">
                        <button
                          onClick={() => handleEdit(item)}
                          className="bg-blue-500 text-white px-3 py-1 rounded"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="bg-red-500 text-white px-3 py-1 rounded"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </main>

      {/* ✅ MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-8 rounded-3xl w-96 shadow-2xl">
            <h2 className="text-xl font-bold mb-6 text-emerald-700">
              {editId ? "Edit Product" : "Add Product"}
            </h2>

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Product Name"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
                className="border p-3 w-full mb-4 rounded-xl"
                required
              />

              <input
                type="number"
                placeholder="Price"
                value={form.price}
                onChange={(e) =>
                  setForm({ ...form, price: e.target.value })
                }
                className="border p-3 w-full mb-4 rounded-xl"
                required
              />

              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="mb-4"
              />

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-200 rounded-xl"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 text-white rounded-xl"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}