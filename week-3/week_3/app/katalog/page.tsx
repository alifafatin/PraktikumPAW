import type { Metadata } from "next";
import Bagian from "@/components/Bagian";
import DaftarItem from "@/components/DaftarItem";
import { daftarItem } from "@/lib/data";

export const metadata: Metadata = { title: "Katalog | Nama Produk" };

export default function HalamanKatalog() {
  return (
    <main className="container mx-auto px-4 py-8">
      {/* Tambahkan id="katalog" dan ubah item menjadi items */}
      <Bagian id="katalog" judul="Katalog">
        <DaftarItem items={daftarItem} />
      </Bagian>
    </main>
  );
}