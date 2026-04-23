import type { Metadata } from "next";
import React from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "BidgetRecycle",
  description: "Platform budget recycle ramah lingkungan",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="bg-[#f6faf7] text-slate-800 min-h-screen">
        {children}
      </body>
    </html>
  );
}