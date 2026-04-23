import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import FormTambahProduk from "./FormTambahProduk";

export default async function TambahProdukPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    redirect("/login");
  }

  return <FormTambahProduk />;
}