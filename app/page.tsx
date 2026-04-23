"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const [isRegister, setIsRegister] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const payload = {
      username: formData.get("username"),
      email: formData.get("email"),
      password: formData.get("password"),
    };

    const endpoint = isRegister
      ? "/api/auth/register"
      : "/api/auth/login";

    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message);
      return;
    }

    if (isRegister) {
      alert("Register berhasil");
      setIsRegister(false);
    } else {
      // ✅ SIMPAN USER KE LOCALSTORAGE
      localStorage.setItem("user", JSON.stringify(data.user));

      alert("Login berhasil");

      // ✅ REDIRECT BERDASARKAN ROLE
      if (data.user.role === "admin") {
        router.push("/admin");
      } else {
        router.push("/home");
      }
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow w-96"
      >
        <h2 className="text-2xl font-bold text-center mb-6">
          {isRegister ? "Daftar Akun" : "Masuk Akun"}
        </h2>

        {isRegister && (
          <input
            name="username"
            placeholder="Nama"
            className="w-full p-2 border rounded mb-3"
            required
          />
        )}

        <input
          name="email"
          placeholder="Email"
          className="w-full p-2 border rounded mb-3"
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded mb-4"
          required
        />

        <button className="w-full bg-green-700 text-white py-2 rounded">
          {isRegister ? "Daftar" : "Masuk"}
        </button>

        <p className="text-sm text-center mt-4">
          {isRegister ? "Sudah punya akun?" : "Belum punya akun?"}{" "}
          <button
            type="button"
            onClick={() => setIsRegister(!isRegister)}
            className="text-green-700 font-semibold"
          >
            {isRegister ? "Masuk" : "Daftar"}
          </button>
        </p>
      </form>
    </main>
  );
}