import { getProducts } from "@/lib/db";
import ProdukSearch from "../components/ProdukSearch";

export default async function ProdukPage() {
  const products = await getProducts();

  return <ProdukSearch products={products} />;
}