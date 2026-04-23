"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    console.log("KLIK LOGIN");

    try {
      const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          password: password.trim(),
        }),
      });

      console.log("STATUS:", res.status);

      const data = await res.json();
      console.log("DATA LOGIN:", data);

      if (!res.ok) {
        alert(data.message || "Login gagal");
        return;
      }

      if (!data.user) {
        alert("User tidak ditemukan dari API!");
        return;
      }

      // ✅ SIMPAN USER
      localStorage.setItem("user", JSON.stringify(data.user));

      alert("Login berhasil");

      console.log("ROLE CEK:", data.user.role);

      // ✅ REDIRECT SESUAI ROLE
      if (data.user.role.trim() === "admin") {
        console.log("MASUK ADMIN");
        router.replace("/admin");
      } else {
        console.log("MASUK USER");
        router.replace("/home");
      }

    } catch (error) {
      console.error("ERROR LOGIN:", error);
      alert("Terjadi kesalahan");
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-green-50">
      <form
        onSubmit={handleLogin} // ✅ INI YANG BENAR
        className="bg-white p-8 rounded-xl shadow w-80 space-y-4"
      >
        <h1 className="text-2xl font-bold text-green-700 text-center">
          Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <button
          type="submit"
          className="w-full bg-green-700 text-white py-2 rounded"
        >
          Login
        </button>
      </form>
    </main>
  );
}